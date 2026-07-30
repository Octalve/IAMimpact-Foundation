import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { getEvent } from "@/content/events";
import { adminRecipient, sendMail } from "@/lib/email";
import {
  eventRegistrationAdminNotification,
  eventRegistrationConfirmation,
} from "@/lib/email-templates";
import { checkRateLimit, verifyHuman } from "@/lib/anti-abuse";
import {
  cleanText,
  isHoneypotClean,
  makeRegistrationCode,
  validateEmail,
} from "@/lib/validation";

export async function POST(request: NextRequest) {
  const prisma = getPrisma();
  if (!prisma) {
    return NextResponse.json(
      { message: "Registration is temporarily unavailable." },
      { status: 503 },
    );
  }

  const ip =
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  if (!(await checkRateLimit(`event:${ip}`, 4))) {
    return NextResponse.json(
      { message: "Too many attempts. Please wait and try again." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { message: "The request could not be read." },
      { status: 400 },
    );
  }

  if (!isHoneypotClean(body.website)) {
    return NextResponse.json(
      { message: "Registration rejected." },
      { status: 400 },
    );
  }
  const human = await verifyHuman(
    cleanText(body.turnstileToken, 2048) || null,
    ip,
  );
  if (!human.ok) {
    return NextResponse.json({ message: human.reason }, { status: 400 });
  }

  const eventSlug = cleanText(body.eventSlug, 120);
  const selectedEvent = getEvent(eventSlug);
  const fullName = cleanText(body.fullName, 120);
  const email = validateEmail(body.email);
  const phone = cleanText(body.phone, 40);
  const organisation = cleanText(body.organisation, 160);
  const accessibilityNeeds = cleanText(body.accessibilityNeeds, 1200);

  if (
    !selectedEvent?.registrationOpen ||
    !fullName ||
    !email ||
    body.consent !== "yes"
  ) {
    return NextResponse.json(
      {
        message:
          "Please complete all required fields and confirm consent.",
      },
      { status: 400 },
    );
  }

  const duplicate = await prisma.eventRegistration.findUnique({
    where: { eventSlug_email: { eventSlug, email } },
    select: { registrationCode: true },
  });
  if (duplicate) {
    return NextResponse.json({
      registrationCode: duplicate.registrationCode,
      message: "Your existing registration was found.",
    });
  }

  let registrationCode = makeRegistrationCode();
  let created = false;
  try {
    await prisma.eventRegistration.create({
      data: {
        eventSlug,
        registrationCode,
        fullName,
        email,
        phone: phone || null,
        organisation: organisation || null,
        accessibilityNeeds: accessibilityNeeds || null,
        consent: true,
      },
    });
    created = true;
  } catch (error) {
    if (isPrismaErrorCode(error, "P2002")) {
      const existing = await prisma.eventRegistration.findUnique({
        where: { eventSlug_email: { eventSlug, email } },
        select: { registrationCode: true },
      });
      if (existing) registrationCode = existing.registrationCode;
      else {
        return NextResponse.json(
          { message: "Registration could not be completed." },
          { status: 409 },
        );
      }
    } else {
      return NextResponse.json(
        { message: "Registration could not be completed." },
        { status: 500 },
      );
    }
  }

  if (created) {
    const eventDate = new Date(selectedEvent.startAt).toLocaleString("en-NG", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Africa/Lagos",
    });
    const participantTemplate = eventRegistrationConfirmation({
      fullName,
      eventTitle: selectedEvent.title,
      eventDate,
      registrationCode,
    });
    const adminTemplate = eventRegistrationAdminNotification({
      fullName,
      email,
      phone,
      organisation,
      eventTitle: selectedEvent.title,
      registrationCode,
    });
    const admin = adminRecipient();

    await Promise.allSettled([
      sendMail({
        to: email,
        ...participantTemplate,
        tags: [
          { name: "category", value: "event_registration" },
          { name: "audience", value: "participant" },
        ],
      }),
      ...(admin
        ? [
            sendMail({
              to: admin,
              replyTo: email,
              ...adminTemplate,
              tags: [
                { name: "category", value: "event_registration" },
                { name: "audience", value: "admin" },
              ],
            }),
          ]
        : []),
    ]);
  }

  return NextResponse.json({ registrationCode });
}

function isPrismaErrorCode(
  error: unknown,
  code: string,
): error is { code: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string" &&
    error.code === code
  );
}
