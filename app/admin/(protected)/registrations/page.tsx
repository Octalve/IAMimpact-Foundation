import Link from "next/link";
import { events, getEvent } from "@/content/events";
import { adminDb } from "@/lib/admin/db";
import { registrationQuerySchema } from "@/lib/admin/validation";
import { can, requireStaff } from "@/lib/auth/authorization";

export const dynamic = "force-dynamic";
const PAGE_SIZE = 25;

export default async function RegistrationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const staff = await requireStaff();
  const raw = await searchParams;
  const filters = registrationQuerySchema.parse({
    q: typeof raw.q === "string" ? raw.q : "",
    event: typeof raw.event === "string" ? raw.event : "",
    attendance: typeof raw.attendance === "string" ? raw.attendance : "all",
    page: typeof raw.page === "string" ? raw.page : 1,
  });
  const prisma = adminDb();
  const where = {
    ...(filters.event ? { eventSlug: filters.event } : {}),
    ...(filters.attendance === "checked-in"
      ? { checkedInAt: { not: null } }
      : filters.attendance === "pending"
        ? { checkedInAt: null }
        : {}),
    ...(filters.q
      ? {
          OR: [
            { fullName: { contains: filters.q, mode: "insensitive" as const } },
            { email: { contains: filters.q, mode: "insensitive" as const } },
            { phone: { contains: filters.q, mode: "insensitive" as const } },
            { registrationCode: { contains: filters.q.toUpperCase(), mode: "insensitive" as const } },
          ],
        }
      : {}),
  };
  const [registrations, total] = await Promise.all([
    prisma.eventRegistration.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (filters.page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.eventRegistration.count({ where }),
  ]);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const exportQuery = new URLSearchParams({
    ...(filters.q ? { q: filters.q } : {}),
    ...(filters.event ? { event: filters.event } : {}),
    attendance: filters.attendance,
  });

  return (
    <div className="container-shell py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="eyebrow">Participants</p><h1 className="mt-4 text-4xl font-black">Registrations</h1></div>
        {can(staff.role, "exportRegistrations") ? (
          <a href={`/api/admin/registrations/export?${exportQuery}`} className="rounded-xl bg-[var(--brand-green)] px-5 py-3 font-black text-white">Export CSV</a>
        ) : null}
      </div>
      <form className="mt-8 grid gap-3 rounded-2xl bg-white p-5 ring-1 ring-slate-200 md:grid-cols-[2fr_1fr_1fr_auto]">
        <input name="q" defaultValue={filters.q} maxLength={120} placeholder="Name, email, phone or code" className="rounded-xl border border-slate-300 px-4 py-3" />
        <select name="event" defaultValue={filters.event} className="rounded-xl border border-slate-300 px-4 py-3">
          <option value="">All events</option>
          {events.map((event) => <option key={event.slug} value={event.slug}>{event.title}</option>)}
        </select>
        <select name="attendance" defaultValue={filters.attendance} className="rounded-xl border border-slate-300 px-4 py-3">
          <option value="all">All attendance</option><option value="pending">Pending</option><option value="checked-in">Checked in</option>
        </select>
        <button className="rounded-xl bg-[var(--brand-deep-blue)] px-5 py-3 font-black text-white">Filter</button>
      </form>
      <p className="mt-5 text-sm font-semibold text-slate-500">{total} result{total === 1 ? "" : "s"}</p>
      <div className="mt-4 overflow-x-auto rounded-2xl bg-white ring-1 ring-slate-200">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="p-4">Participant</th><th className="p-4">Event</th><th className="p-4">Code</th><th className="p-4">Attendance</th><th className="p-4">Registered</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {registrations.map((item) => (
              <tr key={item.id}>
                <td className="p-4"><Link href={`/admin/registrations/${item.id}`} className="font-black text-[var(--brand-deep-blue)]">{item.fullName}</Link><p className="mt-1 text-sm text-slate-500">{item.email}</p></td>
                <td className="p-4 text-sm font-semibold text-slate-700">{getEvent(item.eventSlug)?.title || item.eventSlug}</td>
                <td className="p-4 font-mono text-sm font-bold">{item.registrationCode}</td>
                <td className="p-4"><span className={`rounded-full px-3 py-1 text-xs font-black ${item.checkedInAt ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>{item.checkedInAt ? "Checked in" : "Pending"}</span></td>
                <td className="p-4 text-sm text-slate-500">{item.createdAt.toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!registrations.length ? <p className="p-8 text-center text-slate-500">No registrations match these filters.</p> : null}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <PageLink page={Math.max(1, filters.page - 1)} disabled={filters.page <= 1} filters={filters}>← Previous</PageLink>
        <p className="text-sm font-bold text-slate-500">Page {Math.min(filters.page, pages)} of {pages}</p>
        <PageLink page={Math.min(pages, filters.page + 1)} disabled={filters.page >= pages} filters={filters}>Next →</PageLink>
      </div>
    </div>
  );
}

function PageLink({ page, disabled, filters, children }: { page: number; disabled: boolean; filters: { q: string; event: string; attendance: string }; children: React.ReactNode }) {
  const query = new URLSearchParams({ q: filters.q, event: filters.event, attendance: filters.attendance, page: String(page) });
  return disabled ? <span className="rounded-xl border px-4 py-2 text-sm font-bold text-slate-300">{children}</span> : <Link href={`/admin/registrations?${query}`} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold">{children}</Link>;
}
