import "server-only";
import { Prisma, type StaffAccount, type StaffRole } from "@prisma/client";
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

async function linkAuthorizedStaff(
  staff: StaffAccount,
  user: { id: string; name?: string | null },
): Promise<AuthorizedStaff | null> {
  if (!staff.active) return null;
  if (staff.authUserId) {
    return staff.authUserId === user.id ? (staff as AuthorizedStaff) : null;
  }

  const prisma = getPrisma();
  if (!prisma) throw new Error("Database configuration is unavailable.");

  // Claim an unlinked invitation only once. The conditional update prevents two
  // different authenticated users from racing to bind the same email address.
  await prisma.staffAccount.updateMany({
    where: { id: staff.id, authUserId: null, active: true },
    data: { authUserId: user.id, name: user.name || staff.name },
  });

  const linked = await prisma.staffAccount.findUnique({ where: { id: staff.id } });

  if (!linked?.active || linked.authUserId !== user.id) return null;
  return linked as AuthorizedStaff;
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

  // Once an identity has been linked, its immutable provider ID is authoritative.
  // Still require the authorized email to match so an identity email change does
  // not silently inherit access intended for another address.
  const identityStaff = await prisma.staffAccount.findUnique({
    where: { authUserId: user.id },
  });
  if (identityStaff) {
    if (identityStaff.email !== email) return null;
    return linkAuthorizedStaff(identityStaff, user);
  }

  const emailStaff = await prisma.staffAccount.findUnique({ where: { email } });

  if (bootstrapEmail && email === bootstrapEmail) {
    // Bootstrap may create the initial account, but it must never reactivate,
    // promote, or rebind an account that has subsequently been managed.
    if (emailStaff) {
      if (emailStaff.role !== "SUPER_ADMIN") return null;
      return linkAuthorizedStaff(emailStaff, user);
    }

    try {
      const staff = await prisma.staffAccount.create({
        data: {
          authUserId: user.id,
          email,
          name: user.name || null,
          role: "SUPER_ADMIN",
        },
      });
      return staff as AuthorizedStaff;
    } catch (error) {
      if (
        !(error instanceof Prisma.PrismaClientKnownRequestError) ||
        error.code !== "P2002"
      ) {
        throw error;
      }

      // A concurrent request may have created the bootstrap row. Resolve it
      // through the same immutable binding checks instead of overwriting it.
      const concurrentStaff = await prisma.staffAccount.findUnique({
        where: { email },
      });
      if (!concurrentStaff || concurrentStaff.role !== "SUPER_ADMIN") return null;
      return linkAuthorizedStaff(concurrentStaff, user);
    }
  }

  if (!emailStaff) return null;
  return linkAuthorizedStaff(emailStaff, user);
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
