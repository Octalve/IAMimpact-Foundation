import { NextRequest, NextResponse } from "next/server";
import { getRuntimeEnv } from "@/lib/runtime-env";
import { adminRecipient, sendMail } from "@/lib/email";
import { checkRateLimit, verifyHuman } from "@/lib/anti-abuse";
import { cleanText, isHoneypotClean, validateEmail } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const env = await getRuntimeEnv();
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  if (!(await checkRateLimit(`submission:${ip}`))) {
    return NextResponse.json({ message: "Too many submissions. Please wait 15 minutes and try again." }, { status: 429 });
  }
  const body = (await request.json()) as Record<string, unknown>;
  if (!isHoneypotClean(body.website)) return NextResponse.json({ message: "Submission rejected." }, { status: 400 });
  const human = await verifyHuman(cleanText(body.turnstileToken, 2048) || null, ip);
  if (!human.ok) return NextResponse.json({ message: human.reason }, { status: 400 });

  const kind = cleanText(body.kind, 80);
  const fullName = cleanText(body.fullName, 120);
  const email = validateEmail(body.email);
  if (!kind || !fullName || !email || body.consent !== "yes") {
    return NextResponse.json({ message: "Please complete all required fields and confirm consent." }, { status: 400 });
  }
  const id = crypto.randomUUID();
  const safePayload = Object.fromEntries(
    Object.entries(body)
      .filter(([key]) => !["website", "turnstileToken"].includes(key))
      .map(([key, value]) => [cleanText(key, 60), cleanText(value, 4000)])
  );
  if (env.DB) {
    await env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS submissions (
        id TEXT PRIMARY KEY, kind TEXT NOT NULL, full_name TEXT NOT NULL, email TEXT NOT NULL,
        phone TEXT, organisation TEXT, payload TEXT NOT NULL, status TEXT NOT NULL, created_at INTEGER NOT NULL
      )`
    ).run();
    await env.DB.prepare(
      "INSERT INTO submissions (id, kind, full_name, email, phone, organisation, payload, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?)"
    ).bind(id, kind, fullName, email, cleanText(body.phone, 40), cleanText(body.organisation, 160), JSON.stringify(safePayload), Date.now()).run();
  }

  const recipient = await adminRecipient();
  if (recipient) {
    await sendMail({
      to: recipient,
      replyTo: email,
      subject: `New IAMimpact submission: ${kind}`,
      html: `<h1>${kind}</h1><p><strong>From:</strong> ${fullName} (${email})</p><pre>${escapeHtml(JSON.stringify(safePayload, null, 2))}</pre>`,
    });
  }
  await sendMail({
    to: email,
    subject: "We received your IAMimpact submission",
    html: `<h1>Thank you, ${escapeHtml(fullName)}.</h1><p>Your ${escapeHtml(kind.toLowerCase())} has been received. Our team will review it and contact you if further information is needed.</p><p>Reference: ${id.slice(0, 8).toUpperCase()}</p>`,
  });
  return NextResponse.json({ message: "Thank you. Your submission has been received and a confirmation email will be sent when email delivery is configured." });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] || character);
}
