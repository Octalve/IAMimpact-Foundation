import { ROLE_LABELS, requireStaff } from "@/lib/auth/authorization";
import { adminDb } from "@/lib/admin/db";
import { addStaffAccount, setStaffActive } from "../actions";

export const dynamic = "force-dynamic";

export default async function StaffPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireStaff("manageStaff");
  const result = (await searchParams).result;
  const staff = await adminDb().staffAccount.findMany({ orderBy: [{ active: "desc" }, { createdAt: "asc" }] });
  const messages: Record<string, string> = {
    saved: "Staff access saved.",
    invalid: "Check the staff details and try again.",
    "self-role": "You cannot lower your own super-administrator role.",
    "self-disable": "You cannot deactivate your own account.",
    "last-super-admin": "The final active super administrator cannot be deactivated.",
  };

  return (
    <div className="container-shell py-10">
      <p className="eyebrow">Access control</p>
      <h1 className="mt-4 text-4xl font-black">Staff accounts</h1>
      <p className="mt-3 max-w-3xl text-slate-600">Authorize an email here after creating that user in Neon Auth. A user must pass both Neon authentication and this IAMimpact authorization check.</p>
      {typeof result === "string" && messages[result] ? <p role="status" className="mt-5 rounded-xl bg-blue-50 p-4 font-bold text-[var(--brand-deep-blue)]">{messages[result]}</p> : null}
      <form action={addStaffAccount} className="mt-8 grid gap-3 rounded-2xl bg-white p-5 ring-1 ring-slate-200 md:grid-cols-2 lg:grid-cols-[1.2fr_1.5fr_1fr_auto]">
        <input name="name" maxLength={120} placeholder="Name (optional)" className="rounded-xl border border-slate-300 px-4 py-3" />
        <input name="email" type="email" required maxLength={254} placeholder="Staff email" className="rounded-xl border border-slate-300 px-4 py-3" />
        <select name="role" defaultValue="VIEWER" className="rounded-xl border border-slate-300 px-4 py-3">
          {Object.entries(ROLE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <button className="rounded-xl bg-[var(--brand-deep-blue)] px-5 py-3 font-black text-white">Save access</button>
      </form>
      <div className="mt-6 overflow-x-auto rounded-2xl bg-white ring-1 ring-slate-200">
        <table className="w-full min-w-[700px] text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="p-4">Staff</th><th className="p-4">Role</th><th className="p-4">Neon linked</th><th className="p-4">Status</th><th className="p-4">Action</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {staff.map((item) => (
              <tr key={item.id}>
                <td className="p-4"><p className="font-black">{item.name || "Unnamed staff"}</p><p className="text-sm text-slate-500">{item.email}</p></td>
                <td className="p-4 font-semibold">{ROLE_LABELS[item.role]}</td>
                <td className="p-4 text-sm">{item.authUserId ? "Linked" : "Pending first sign-in"}</td>
                <td className="p-4"><span className={`rounded-full px-3 py-1 text-xs font-black ${item.active ? "bg-green-100 text-green-800" : "bg-slate-200 text-slate-600"}`}>{item.active ? "Active" : "Inactive"}</span></td>
                <td className="p-4">
                  <form action={setStaffActive}>
                    <input type="hidden" name="staffId" value={item.id} /><input type="hidden" name="active" value={String(!item.active)} />
                    <button className="font-bold text-[var(--brand-deep-blue)]">{item.active ? "Deactivate" : "Reactivate"}</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
