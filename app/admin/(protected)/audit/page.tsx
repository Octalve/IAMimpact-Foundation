import { adminDb } from "@/lib/admin/db";
import { requireStaff } from "@/lib/auth/authorization";

export const dynamic = "force-dynamic";

export default async function AuditPage() {
  await requireStaff("viewAudit");
  const logs = await adminDb().auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  return (
    <div className="container-shell py-10">
      <p className="eyebrow">Accountability</p>
      <h1 className="mt-4 text-4xl font-black">Audit log</h1>
      <p className="mt-3 text-slate-600">The 200 most recent sensitive administrative actions.</p>
      <div className="mt-8 overflow-x-auto rounded-2xl bg-white ring-1 ring-slate-200">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="p-4">Time</th><th className="p-4">Action</th><th className="p-4">Actor</th><th className="p-4">Target</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {logs.map((log) => <tr key={log.id}><td className="p-4 text-sm text-slate-500">{log.createdAt.toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}</td><td className="p-4 font-black">{log.action.replaceAll("_", " ")}</td><td className="p-4 text-sm">{log.actorEmail}</td><td className="p-4 font-mono text-xs">{log.targetType}{log.targetId ? ` · ${log.targetId}` : ""}</td></tr>)}
          </tbody>
        </table>
        {!logs.length ? <p className="p-8 text-center text-slate-500">No administrative actions have been recorded yet.</p> : null}
      </div>
    </div>
  );
}
