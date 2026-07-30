import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { adminRecipient, sendMail } from "@/lib/email";
import {
  submissionAdminNotification,
  submissionConfirmation,
} from "@/lib/email-templates";
import { checkRateLimit, verifyHuman } from "@/lib/anti-abuse";
import {
  cleanText,
  isHoneypotClean,
  validateEmail,
} from "@/lib/validation";

const ALLOWED_KINDS = new Set([
  "Contact enquiry",
  "Partnership",
  "Volunteer",
]);

const ALLOWED_FIELDS = new Set([
  "fullName",
  "email",
  "phone",
  "organisation",
  "skills",
  "availability",
  "motivation",
  "role",
  "studentGroup",
  "needs",
  "location",
  "challenge",
  "partnershipType",
  "proposal",
  "consent",
]);

const FIELD_LABELS: Record<string, string> = {
  skills: "Skills or contribution areas",
  availability: "Availability",
  motivation: "Motivation",
  role: "Preferred role",
  studentGroup: "Student group",
  needs: "Support needed",
  location: "Location",
  challenge: "Challenge",
  partnershipType: "Partnership area",
  proposal: "Proposed collaboration",
};

export async function POST(request: NextRequest) {
  const prisma = getPrisma();
  if (!prisma) {
    return NextResponse.json(
      { message: "Submissions are temporarily unavailable." },
      { status: 503 },
    );
  }

  const ip =
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  if (!(await checkRateLimit(`submission:${ip}`))) {
    return NextResponse.json(
      {
        message:
          "Too many submissions. Please wait 15 minutes and try again.",
      },
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
      { message: "Submission rejected." },
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

  const kind = cleanText(body.kind, 80);
  const fullName = cleanText(body.fullName, 120);
  const email = validateEmail(body.email);
  const phone = cleanText(body.phone, 40);
  const organisation = cleanText(body.organisation, 160);

  if (
    !ALLOWED_KINDS.has(kind) ||
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

  const safePayload = Object.fromEntries(
    Object.entries(body)
      .filter(([key]) => ALLOWED_FIELDS.has(key))
      .map(([key, value]) => [
        cleanText(key, 60),
        cleanText(value, 4000),
      ]),
  );

  const submission = await prisma.submission.create({
    data: {
      kind,
      fullName,
      email,
      phone: phone || null,
      organisation: organisation || null,
      payload: safePayload,
    },
    select: { id: true },
  });
  const reference = submission.id.slice(0, 8).toUpperCase();

  const participantTemplate = submissionConfirmation({
    fullName,
    kind,
    reference,
  });
  const adminTemplate = submissionAdminNotification({
    fullName,
    email,
    phone,
    organisation,
    kind,
    reference,
    fields: Object.entries(safePayload)
      .filter(
        ([key, value]) =>
          key in FIELD_LABELS && typeof value === "string" && value,
      )
      .map(([key, value]) => ({
        label: FIELD_LABELS[key],
        value: String(value),
      })),
  });
  const recipient = adminRecipient();

  await Promise.allSettled([
    sendMail({
      to: email,
      ...participantTemplate,
      tags: [
        { name: "category", value: kind.toLowerCase().replace(/\s+/g, "_") },
        { name: "audience", value: "applicant" },
      ],
    }),
    ...(recipient
      ? [
          sendMail({
            to: recipient,
            replyTo: email,
            ...adminTemplate,
            tags: [
              {
                name: "category",
                value: kind.toLowerCase().replace(/\s+/g, "_"),
              },
              { name: "audience", value: "admin" },
            ],
          }),
        ]
      : []),
  ]);

  return NextResponse.json({
    message:
      "Thank you. Your submission has been received successfully.",
    reference,
  });
}
