import Link from "next/link";
import { ROLE_LABELS, can, requireStaff } from "@/lib/auth/authorization";
import { SignOutButton } from "@/features/admin/SignOutButton";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const staff = await requireStaff();

  return (
    <main id="main-content" className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="container-shell flex flex-wrap items-center justify-between gap-4 py-5">
          <div>
            <p className="font-black text-[var(--brand-deep-blue)]">IAMimpact Admin</p>
            <p className="mt-1 text-xs text-slate-500">{staff.email} · {ROLE_LABELS[staff.role]}</p>
          </div>
          <SignOutButton />
        </div>
        <nav aria-label="Admin navigation" className="container-shell flex gap-2 overflow-x-auto pb-4">
          <Link className="admin-nav-link" href="/admin">Overview</Link>
          <Link className="admin-nav-link" href="/admin/registrations">Registrations</Link>
          {can(staff.role, "checkIn") ? <Link className="admin-nav-link" href="/admin/check-in">Check in</Link> : null}
          {can(staff.role, "manageStaff") ? <Link className="admin-nav-link" href="/admin/staff">Staff</Link> : null}
          {can(staff.role, "viewAudit") ? <Link className="admin-nav-link" href="/admin/audit">Audit log</Link> : null}
        </nav>
      </div>
      {children}
    </main>
  );
}
