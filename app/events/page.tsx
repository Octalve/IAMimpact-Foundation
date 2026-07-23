import type { Metadata } from "next";
import { CalendarDays, CircleCheck, MapPin, Users } from "lucide-react";
import { PageHero } from "@/features/shared/PageHero";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage(){
  return <main id="main-content"><PageHero eyebrow="Events" title="Gather. Learn. Act." description="Future events will show verified dates, locations, capacity, eligibility and registration status here." tone="red" />
    <section className="py-24"><div className="container-shell">
      <article className="grid gap-10 rounded-[2.5rem] bg-[#f5f7f8] p-8 lg:grid-cols-[1fr_.8fr] lg:p-12">
        <div><p className="text-sm font-black uppercase tracking-[.16em] text-[var(--brand-red)]">Registration system preview</p><h2 className="mt-5 text-4xl font-bold tracking-tight">No public event is currently open.</h2><p className="body-copy mt-5">When an event is approved, this page will display all information needed to make a responsible registration decision.</p></div>
        <div className="grid grid-cols-2 gap-3">{[[CalendarDays,"Date & time"],[MapPin,"Location"],[Users,"Capacity"],[CircleCheck,"Availability"]].map(([Icon,label])=><div key={String(label)} className="rounded-2xl bg-white p-5"><Icon className="h-5 w-5 text-[var(--brand-green)]" /><p className="mt-5 font-bold">{String(label)}</p></div>)}</div>
      </article>
    </div></section>
  </main>;
}
