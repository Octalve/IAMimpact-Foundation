import Link from "next/link";
import { ShieldX } from "lucide-react";
import { getEvent } from "@/content/events";
import { EventPass } from "@/features/events/EventPass";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    code: string;
  }>;
};

export default async function RegistrationPass({ params }: PageProps) {
  const { code } = await params;

  let registrationCode = "";

  try {
    registrationCode = decodeURIComponent(code).trim().toUpperCase();
  } catch {
    registrationCode = "";
  }

  const validShape =
    /^IAM-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/.test(
      registrationCode,
    );

  const prisma = getPrisma();

  const registration =
    validShape && prisma
      ? await prisma.eventRegistration.findUnique({
          where: {
            registrationCode,
          },
          select: {
            fullName: true,
            registrationCode: true,
            eventSlug: true,
          },
        })
      : null;

  const event = registration ? getEvent(registration.eventSlug) : null;

  if (!registration || !event) {
    return (
      <main id="main-content" className="bg-[#f4f7f8] py-24">
        <div className="container-shell max-w-2xl">
          <article className="rounded-[2.5rem] bg-white p-8 text-center shadow-sm sm:p-12">
            <ShieldX className="mx-auto h-14 w-14 text-red-600" />

            <p className="eyebrow mt-7">Pass verification</p>

            <h1 className="mt-4 text-4xl font-bold text-slate-950">
              Event pass not found
            </h1>

            <p className="mt-6 text-slate-600">
              We could not verify this registration pass. Please check the
              link or contact IAMimpact Foundation for assistance.
            </p>

            <Link
              href="/events"
              className="mt-8 inline-block font-bold text-[var(--brand-blue)]"
            >
              View upcoming events
            </Link>
          </article>
        </div>
      </main>
    );
  }

  const start = new Date(event.startAt);
  const end = new Date(event.endAt);

  const dateFormatter = new Intl.DateTimeFormat("en-NG", {
    dateStyle: "long",
    timeZone: "Africa/Lagos",
  });

  const timeFormatter = new Intl.DateTimeFormat("en-NG", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
  });

  const formattedEvent = {
    title: event.title,
    date: dateFormatter.format(start),
    time: `${timeFormatter.format(start)} – ${timeFormatter.format(end)}`,
    location: event.location,
  };

  return (
    <main id="main-content" className="bg-[#f4f7f8] py-16 sm:py-24">
      <div className="container-shell">
        <EventPass
          registration={{
            fullName: registration.fullName,
            registrationCode: registration.registrationCode,
          }}
          event={formattedEvent}
        />

        <div className="mt-8 text-center">
          <Link
            href={`/events/${registration.eventSlug}`}
            className="font-bold text-[var(--brand-blue)]"
          >
            Register another participant
          </Link>
        </div>
      </div>
    </main>
  );
}