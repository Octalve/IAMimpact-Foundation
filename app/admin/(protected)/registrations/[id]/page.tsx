import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvent } from "@/content/events";
import { adminDb } from "@/lib/admin/db";
import { can, requireStaff } from "@/lib/auth/authorization";
import { undoCheckIn } from "../../actions";

export const dynamic = "force-dynamic";

export default async function RegistrationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const staff = await requireStaff();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const registration = await adminDb().eventRegistration.findUnique({ where: { id } });
  if (!registration) notFound();
  const event = getEvent(registration.eventSlug);
  const sensitive = can(staff.role, "viewSensitiveDetails");

  const details = [
    ["Registration code", registration.registrationCode],
    ["Event", event?.title || registration.eventSlug],
    ["Email", registration.email],
    ["Phone", sensitive ? registration.phone || "Not supplied" : "Restricted"],
    ["Organisation", registration.organisation || "Not supplied"],
    ["Accessibility needs", sensitive ? registration.accessibilityNeeds || "None supplied" : "Restricted"],
    ["Consent", registration.consent ? "Confirmed" : "Not confirmed"],
    ["Registered", registration.createdAt.toLocaleString("en-NG", { dateStyle: "full", timeStyle: "short" })],
    ["Attendance", registration.checkedInAt ? `Checked in ${registration.checkedInAt.toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}` : "Pending"],
  ];

  return (
    <div className="container-shell py-10">
      <Link href="/admin/registrations" className="font-bold text-[var(--brand-deep-blue)]">← Registrations</Link>
      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div><p className="eyebrow">Participant record</p><h1 className="mt-4 text-4xl font-black">{registration.fullName}</h1></div>
        <a href={`/registration/${encodeURIComponent(registration.registrationCode)}`} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-black">Open event pass</a>
      </div>
      <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-slate-200 ring-1 ring-slate-200 sm:grid-cols-2">
        {details.map(([label, value]) => <div key={label} className="bg-white p-5"><dt className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-2 break-words font-semibold text-slate-800">{value}</dd></div>)}
      </dl>
      {registration.checkedInAt && can(staff.role, "undoCheckIn") ? (
        <form action={undoCheckIn} className="mt-6">
          <input type="hidden" name="registrationId" value={registration.id} />
          <button className="rounded-xl border border-red-300 bg-white px-5 py-3 font-black text-red-700">Reverse check-in</button>
        </form>
      ) : null}
    </div>
  );
}
