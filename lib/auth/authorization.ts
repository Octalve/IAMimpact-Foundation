import "server-only";
import type { StaffAccount, StaffRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { getPrisma } from "@/lib/prisma";

export const ROLE_LABELS: Record<StaffRole, string> = {
  SUPER_ADMIN: "Super administrator",
  ADMIN: "Administrator",
  CHECK_IN_STAFF: "Check-in staff",
  VIEWER: "Viewer",
};

export const ROLE_PERMISSIONS = {
  viewRegistrations: ["SUPER_ADMIN", "ADMIN", "CHECK_IN_STAFF", "VIEWER"],
  viewSensitiveDetails: ["SUPER_ADMIN", "ADMIN"],
  checkIn: ["SUPER_ADMIN", "ADMIN", "CHECK_IN_STAFF"],
  undoCheckIn: ["SUPER_ADMIN", "ADMIN"],
  exportRegistrations: ["SUPER_ADMIN", "ADMIN"],
  manageStaff: ["SUPER_ADMIN"],
  viewAudit: ["SUPER_ADMIN", "ADMIN"],
} as const satisfies Record<string, readonly StaffRole[]>;

export type Permission = keyof typeof ROLE_PERMISSIONS;

export type AuthorizedStaff = StaffAccount & {
  authUserId: string;
};

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function can(role: StaffRole, permission: Permission) {
  return (ROLE_PERMISSIONS[permission] as readonly StaffRole[]).includes(role);
}

export async function currentStaff(): Promise<AuthorizedStaff | null> {
  const prisma = getPrisma();
  if (!prisma) throw new Error("Database configuration is unavailable.");

  const { data } = await auth.getSession();
  const user = data?.user;
  if (!user?.id || !user.email) return null;

  const email = normalizeEmail(user.email);
  const bootstrapEmail = process.env.ADMIN_BOOTSTRAP_EMAIL
    ? normalizeEmail(process.env.ADMIN_BOOTSTRAP_EMAIL)
    : null;

  if (bootstrapEmail && email === bootstrapEmail) {
    const staff = await prisma.staffAccount.upsert({
      where: { email },
      create: {
        authUserId: user.id,
        email,
        name: user.name || null,
        role: "SUPER_ADMIN",
      },
      update: {
        authUserId: user.id,
        name: user.name || undefined,
      },
    });
    return staff as AuthorizedStaff;
  }

  const staff = await prisma.staffAccount.findUnique({ where: { email } });
  if (!staff?.active) return null;

  if (staff.authUserId && staff.authUserId !== user.id) return null;
  if (!staff.authUserId) {
    return (await prisma.staffAccount.update({
      where: { id: staff.id },
      data: { authUserId: user.id, name: user.name || staff.name },
    })) as AuthorizedStaff;
  }

  return staff as AuthorizedStaff;
}

export async function requireStaff(permission: Permission = "viewRegistrations") {
  const staff = await currentStaff();
  if (!staff) redirect("/admin/login?reason=unauthorized");
  if (!can(staff.role, permission)) redirect("/admin?reason=forbidden");
  return staff;
}

export async function recordAudit(input: {
  actor: AuthorizedStaff;
  action: string;
  targetType: string;
  targetId?: string | null;
  metadata?: Record<string, string | number | boolean | null>;
}) {
  const prisma = getPrisma();
  if (!prisma) throw new Error("Database configuration is unavailable.");

  await prisma.auditLog.create({
    data: {
      actorUserId: input.actor.authUserId,
      actorEmail: input.actor.email,
      action: input.action,
      targetType: input.targetType,
      targetId: input.targetId,
      metadata: input.metadata,
    },
  });
}
