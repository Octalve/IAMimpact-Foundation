import { ROLE_LABELS, can, requireStaff } from "@/lib/auth/authorization";
import { AdminShell } from "@/features/admin/AdminShell";
import {
  adminNavigation,
  type AdminNavigationItem,
} from "@/features/admin/admin-navigation";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const staff = await requireStaff();

  const navigation: AdminNavigationItem[] = [
    adminNavigation.overview,
    adminNavigation.registrations,
    ...(can(staff.role, "checkIn") ? [adminNavigation.checkIn] : []),
    ...(can(staff.role, "manageStaff") ? [adminNavigation.staff] : []),
    ...(can(staff.role, "viewAudit") ? [adminNavigation.audit] : []),
  ];

  return (
    <AdminShell
      email={staff.email}
      roleLabel={ROLE_LABELS[staff.role]}
      navigation={navigation}
    >
      {children}
    </AdminShell>
  );
}
