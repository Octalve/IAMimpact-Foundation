import Link from "next/link";
import { CalendarCheck2, Clock3, UserCheck, Users } from "lucide-react";
import { events, getEvent } from "@/content/events";
import { adminDb } from "@/lib/admin/db";
import { requireStaff } from "@/lib/auth/authorization";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  await requireStaff();
  const prisma = adminDb();
  const [total, checkedIn, today, recent, grouped] = await Promise.all([
    prisma.eventRegistration.count({ where: { status: "CONFIRMED" } }),
    prisma.eventRegistration.count({ where: { status: "CONFIRMED", checkedInAt: { not: null } } }),
    prisma.eventRegistration.count({
      where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
    }),
    prisma.eventRegistration.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.eventRegistration.groupBy({ by: ["eventSlug"], _count: { _all: true } }),
  ]);

  const cards = [
    { label: "Confirmed registrations", value: total, icon: Users },
    { label: "Checked in", value: checkedIn, icon: UserCheck },
    { label: "Pending check-in", value: Math.max(0, total - checkedIn), icon: Clock3 },
    { label: "Registered today", value: today, icon: CalendarCheck2 },
  ];

  return (
    <div className="container-shell py-10">
      <p className="eyebrow">Operations</p>
      <h1 className="mt-4 text-4xl font-black text-slate-950">Event overview</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <article key={label} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <Icon className="h-6 w-6 text-[var(--brand-green)]" />
            <p className="mt-5 text-3xl font-black text-slate-950">{value}</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">{label}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <h2 className="text-xl font-black">Registrations by event</h2>
          <div className="mt-5 space-y-4">
            {events.map((event) => {
              const count = grouped.find((row) => row.eventSlug === event.slug)?._count._all || 0;
              return (
                <div key={event.slug} className="flex items-center justify-between gap-4">
                  <div><p className="font-bold text-slate-800">{event.title}</p><p className="text-sm text-slate-500">Capacity {event.capacity}</p></div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-black text-[var(--brand-deep-blue)]">{count}</span>
                </div>
              );
            })}
          </div>
        </section>
        <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-black">Recent registrations</h2>
            <Link href="/admin/registrations" className="text-sm font-bold text-[var(--brand-deep-blue)]">View all →</Link>
          </div>
          <div className="mt-5 divide-y divide-slate-100">
            {recent.map((registration) => (
              <Link key={registration.id} href={`/admin/registrations/${registration.id}`} className="block py-3">
                <p className="font-bold text-slate-800">{registration.fullName}</p>
                <p className="text-sm text-slate-500">{getEvent(registration.eventSlug)?.title || registration.eventSlug}</p>
              </Link>
            ))}
            {!recent.length ? <p className="py-5 text-slate-500">No registrations yet.</p> : null}
          </div>
        </section>
      </div>
    </div>
  );
}
