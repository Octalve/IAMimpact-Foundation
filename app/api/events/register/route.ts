import { NextRequest, NextResponse } from "next/server";
import { getRuntimeEnv } from "@/lib/runtime-env";
import { getEvent } from "@/content/events";
import { adminRecipient, sendMail } from "@/lib/email";
import { checkRateLimit, verifyHuman } from "@/lib/anti-abuse";
import { cleanText, isHoneypotClean, makeRegistrationCode, validateEmail } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const env = await getRuntimeEnv();
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  if (!(await checkRateLimit(`event:${ip}`, 4))) return NextResponse.json({ message: "Too many attempts. Please wait and try again." }, { status: 429 });
  const body = (await request.json()) as Record<string, unknown>;
  if (!isHoneypotClean(body.website)) return NextResponse.json({ message: "Registration rejected." }, { status: 400 });
  const human = await verifyHuman(cleanText(body.turnstileToken, 2048) || null, ip);
  if (!human.ok) return NextResponse.json({ message: human.reason }, { status: 400 });

  const eventSlug = cleanText(body.eventSlug, 120);
  const selectedEvent = getEvent(eventSlug);
  const fullName = cleanText(body.fullName, 120);
  const email = validateEmail(body.email);
  if (!selectedEvent?.registrationOpen || !fullName || !email || body.consent !== "yes") {
    return NextResponse.json({ message: "Please complete all required fields and confirm consent." }, { status: 400 });
  }
  const registrationCode = makeRegistrationCode();
  if (env.DB) {
    await env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS event_registrations (
        id TEXT PRIMARY KEY, event_slug TEXT NOT NULL, registration_code TEXT NOT NULL UNIQUE,
        full_name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, organisation TEXT,
        accessibility_needs TEXT, consent INTEGER NOT NULL, created_at INTEGER NOT NULL
      )`
    ).run();
    const duplicate = await env.DB.prepare("SELECT registration_code FROM event_registrations WHERE event_slug = ? AND email = ?").bind(eventSlug, email).first<{ registration_code: string }>();
    if (duplicate) return NextResponse.json({ registrationCode: duplicate.registration_code, message: "Your existing registration was found." });
    await env.DB.prepare(
      "INSERT INTO event_registrations (id, event_slug, registration_code, full_name, email, phone, organisation, accessibility_needs, consent, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)"
    ).bind(crypto.randomUUID(), eventSlug, registrationCode, fullName, email, cleanText(body.phone, 40), cleanText(body.organisation, 160), cleanText(body.accessibilityNeeds, 1200), Date.now()).run();
  }
  await sendMail({
    to: email,
    subject: `Registration confirmed: ${selectedEvent.title}`,
    html: `<h1>You are registered.</h1><p>Thank you, ${fullName}. Your code is <strong>${registrationCode}</strong>.</p><p>${new Date(selectedEvent.startAt).toLocaleString("en-NG", { dateStyle: "full", timeStyle: "short" })}</p>`,
  });
  const admin = await adminRecipient();
  if (admin) await sendMail({ to: admin, replyTo: email, subject: `New event registration: ${selectedEvent.title}`, html: `<p>${fullName} (${email}) registered. Code: ${registrationCode}</p>` });
  return NextResponse.json({ registrationCode });
}
