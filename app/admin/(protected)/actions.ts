"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminDb } from "@/lib/admin/db";
import { registrationCodeSchema, staffInputSchema } from "@/lib/admin/validation";
import { recordAudit, requireStaff } from "@/lib/auth/authorization";

export async function checkInRegistration(formData: FormData) {
  const actor = await requireStaff("checkIn");
  const parsed = registrationCodeSchema.safeParse(formData.get("registrationCode"));
  if (!parsed.success) redirect("/admin/check-in?result=invalid");

  const prisma = adminDb();
  const registration = await prisma.eventRegistration.findUnique({
    where: { registrationCode: parsed.data },
  });
  if (!registration || registration.status !== "CONFIRMED") redirect("/admin/check-in?result=not-found");
  if (registration.checkedInAt) redirect(`/admin/check-in?result=already&code=${encodeURIComponent(parsed.data)}`);

  const result = await prisma.eventRegistration.updateMany({
    where: { id: registration.id, checkedInAt: null, status: "CONFIRMED" },
    data: { checkedInAt: new Date(), checkedInBy: actor.authUserId },
  });
  if (!result.count) redirect(`/admin/check-in?result=already&code=${encodeURIComponent(parsed.data)}`);

  await recordAudit({
    actor,
    action: "REGISTRATION_CHECKED_IN",
    targetType: "EventRegistration",
    targetId: registration.id,
    metadata: { registrationCode: registration.registrationCode, eventSlug: registration.eventSlug },
  });
  revalidatePath("/admin");
  revalidatePath("/admin/registrations");
  redirect(`/admin/check-in?result=success&code=${encodeURIComponent(parsed.data)}`);
}

export async function undoCheckIn(formData: FormData) {
  const actor = await requireStaff("undoCheckIn");
  const id = String(formData.get("registrationId") || "");
  if (!/^[0-9a-f-]{36}$/i.test(id)) redirect("/admin/registrations");
  const prisma = adminDb();
  const registration = await prisma.eventRegistration.findUnique({ where: { id } });
  if (!registration?.checkedInAt) redirect(`/admin/registrations/${id}`);

  await prisma.eventRegistration.update({
    where: { id },
    data: { checkedInAt: null, checkedInBy: null },
  });
  await recordAudit({
    actor,
    action: "REGISTRATION_CHECK_IN_REVERSED",
    targetType: "EventRegistration",
    targetId: id,
    metadata: { registrationCode: registration.registrationCode, eventSlug: registration.eventSlug },
  });
  revalidatePath("/admin");
  revalidatePath(`/admin/registrations/${id}`);
  redirect(`/admin/registrations/${id}?result=reversed`);
}

export async function addStaffAccount(formData: FormData) {
  const actor = await requireStaff("manageStaff");
  const parsed = staffInputSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name") || undefined,
    role: formData.get("role"),
  });
  if (!parsed.success) redirect("/admin/staff?result=invalid");
  if (parsed.data.email === actor.email && parsed.data.role !== "SUPER_ADMIN") {
    redirect("/admin/staff?result=self-role");
  }
  const prisma = adminDb();
  const staff = await prisma.staffAccount.upsert({
    where: { email: parsed.data.email },
    create: parsed.data,
    update: { name: parsed.data.name || undefined, role: parsed.data.role, active: true },
  });
  await recordAudit({
    actor,
    action: "STAFF_AUTHORIZED",
    targetType: "StaffAccount",
    targetId: staff.id,
    metadata: { email: staff.email, role: staff.role },
  });
  revalidatePath("/admin/staff");
  redirect("/admin/staff?result=saved");
}

export async function setStaffActive(formData: FormData) {
  const actor = await requireStaff("manageStaff");
  const id = String(formData.get("staffId") || "");
  const active = formData.get("active") === "true";
  const prisma = adminDb();
  const target = await prisma.staffAccount.findUnique({ where: { id } });
  if (!target || target.id === actor.id) redirect("/admin/staff?result=self-disable");

  const superAdmins = target.role === "SUPER_ADMIN" && !active
    ? await prisma.staffAccount.count({ where: { role: "SUPER_ADMIN", active: true } })
    : 2;
  if (superAdmins <= 1) redirect("/admin/staff?result=last-super-admin");

  await prisma.staffAccount.update({ where: { id }, data: { active } });
  await recordAudit({
    actor,
    action: active ? "STAFF_REACTIVATED" : "STAFF_DEACTIVATED",
    targetType: "StaffAccount",
    targetId: id,
    metadata: { email: target.email, role: target.role },
  });
  revalidatePath("/admin/staff");
}
