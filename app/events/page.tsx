import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { PageHero } from "@/features/shared/PageHero";
import { EventCountdown } from "@/features/events/EventCountdown";
import { events } from "@/content/events";

export const metadata: Metadata = { title: "Events" };
export default function EventsPage() {
  const featured = events.find((event) => event.featured) || events[0];
  return <main id="main-content"><PageHero eyebrow="Events" title="Gather. Learn. Act." description="Join practical learning experiences, community conversations and action-focused programmes." tone="red" />
    {featured && <section className="py-24"><div className="container-shell"><article className="grid overflow-hidden rounded-[2.5rem] bg-[var(--brand-deep-blue)] text-white lg:grid-cols-[1.2fr_.8fr]">
      <div className="p-8 sm:p-12"><p className="text-sm font-black uppercase tracking-[.16em] text-[#a9e39d]">Featured event</p><h2 className="mt-5 text-4xl font-bold sm:text-6xl">{featured.title}</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">{featured.summary}</p><div className="mt-8 flex flex-wrap gap-5 text-sm"><span className="flex items-center gap-2"><CalendarDays className="h-5 w-5" />{new Date(featured.startAt).toLocaleDateString("en-NG", { dateStyle: "long" })}</span><span className="flex items-center gap-2"><MapPin className="h-5 w-5" />{featured.location}</span></div><Link href={`/events/${featured.slug}`} className="mt-8 inline-block rounded-full bg-[var(--brand-red)] px-6 py-3 font-bold text-white">View event and register</Link></div>
      <div className="bg-white/5 p-8 sm:p-12"><p className="mb-5 text-sm font-bold uppercase tracking-wider text-blue-100">Starts in</p><EventCountdown startAt={featured.startAt} /></div>
    </article></div></section>}
    <section className="bg-[#f4f7f8] py-24"><div className="container-shell"><p className="eyebrow">Upcoming events</p><div className="mt-9 grid gap-5 md:grid-cols-2">{events.map((event) => <article key={event.slug} className="rounded-[2rem] bg-white p-8"><p className="text-sm font-black text-[var(--brand-red)]">{new Date(event.startAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}</p><h2 className="mt-4 text-3xl font-bold">{event.title}</h2><p className="mt-4 leading-7 text-slate-600">{event.summary}</p><p className="mt-6 flex items-center gap-2 text-sm font-semibold"><Users className="h-4 w-4 text-[var(--brand-green)]" />Capacity: {event.capacity} · {event.format}</p><Link href={`/events/${event.slug}`} className="mt-7 inline-block font-bold text-[var(--brand-deep-blue)]">Event details →</Link></article>)}</div></div></section>
  </main>;
}
