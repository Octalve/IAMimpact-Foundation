import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { adminRecipient, sendMail } from "@/lib/email";
import { checkRateLimit, verifyHuman } from "@/lib/anti-abuse";
import { cleanText, isHoneypotClean, validateEmail } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ message: "Submissions are temporarily unavailable." }, { status: 503 });
  const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!(await checkRateLimit(`submission:${ip}`))) {
    return NextResponse.json({ message: "Too many submissions. Please wait 15 minutes and try again." }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "The request could not be read." }, { status: 400 });
  }
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
  const allowedFields = new Set(["fullName", "email", "phone", "organisation", "skills", "availability", "motivation", "role", "studentGroup", "needs", "location", "challenge", "partnershipType", "proposal", "consent"]);
  const safePayload = Object.fromEntries(
    Object.entries(body)
      .filter(([key]) => allowedFields.has(key))
      .map(([key, value]) => [cleanText(key, 60), cleanText(value, 4000)])
  );
  await prisma.submission.create({
    data: {
      id,
      kind,
      fullName,
      email,
      phone: cleanText(body.phone, 40) || null,
      organisation: cleanText(body.organisation, 160) || null,
      payload: safePayload,
    },
  });

  try {
    const recipient = adminRecipient();
    if (recipient) {
      await sendMail({
        to: recipient,
        replyTo: email,
        subject: `New IAMimpact submission: ${kind}`,
        html: `<h1>${escapeHtml(kind)}</h1><p><strong>From:</strong> ${escapeHtml(fullName)} (${escapeHtml(email)})</p><pre>${escapeHtml(JSON.stringify(safePayload, null, 2))}</pre>`,
      });
    }
    await sendMail({
      to: email,
      subject: "We received your IAMimpact submission",
      html: `<h1>Thank you, ${escapeHtml(fullName)}.</h1><p>Your ${escapeHtml(kind.toLowerCase())} has been received. Our team will review it and contact you if further information is needed.</p><p>Reference: ${id.slice(0, 8).toUpperCase()}</p>`,
    });
  } catch {
    // The submission is already stored. Do not expose provider details.
  }
  return NextResponse.json({ message: "Thank you. Your submission has been received and a confirmation email will be sent when email delivery is configured." });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] || character);
}
