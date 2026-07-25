import type { Metadata } from "next";
import { CalendarDays, Clock3, MapPin, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { events, getEvent } from "@/content/events";
import { EventCountdown } from "@/features/events/EventCountdown";
import { EventRegistrationForm } from "@/features/events/EventRegistrationForm";

export function generateStaticParams() {
  return events.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  return event ? { title: event.title, description: event.summary } : { title: "Event not found" };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const start = new Date(event.startAt);
  const end = new Date(event.endAt);

  return (
    <main id="main-content">
      <section className="bg-[var(--brand-deep-blue)] py-20 text-white">
        <div className="container-shell">
          <p className="text-sm font-black uppercase tracking-[.16em] text-[#a9e39d]">IAMimpact event</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[.95] tracking-[-.05em] sm:text-7xl">{event.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-blue-100">{event.summary}</p>
          <div className="mt-9 max-w-3xl"><EventCountdown startAt={event.startAt} /></div>
        </div>
      </section>
      <section className="py-20">
        <div className="container-shell grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Event details</p>
            <dl className="mt-8 space-y-6 rounded-[2rem] bg-[#f4f7f8] p-8">
              <div className="flex gap-4"><CalendarDays className="mt-1 h-5 w-5 text-[var(--brand-blue)]" /><div><dt className="font-bold">Date</dt><dd className="mt-1 text-slate-600">{start.toLocaleDateString("en-NG", { dateStyle: "full" })}</dd></div></div>
              <div className="flex gap-4"><Clock3 className="mt-1 h-5 w-5 text-[var(--brand-blue)]" /><div><dt className="font-bold">Time</dt><dd className="mt-1 text-slate-600">{start.toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" })} – {end.toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" })}</dd></div></div>
              <div className="flex gap-4"><MapPin className="mt-1 h-5 w-5 text-[var(--brand-blue)]" /><div><dt className="font-bold">Location</dt><dd className="mt-1 text-slate-600">{event.location}</dd></div></div>
              <div className="flex gap-4"><Users className="mt-1 h-5 w-5 text-[var(--brand-blue)]" /><div><dt className="font-bold">Audience and capacity</dt><dd className="mt-1 text-slate-600">{event.audience} · {event.capacity} places · {event.format}</dd></div></div>
            </dl>
            <h2 className="mt-12 text-3xl font-bold">About this event</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">{event.description}</p>
          </div>
          <div>{event.registrationOpen ? <EventRegistrationForm eventSlug={event.slug} eventTitle={event.title} /> : <div className="rounded-[2rem] bg-slate-100 p-8"><h2 className="text-3xl font-bold">Registration is closed</h2><p className="mt-4 text-slate-600">Please check the events page for other opportunities.</p></div>}</div>
        </div>
      </section>
    </main>
  );
}
