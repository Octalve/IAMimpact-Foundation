import { NextRequest, NextResponse } from "next/server";
import { getEvent } from "@/content/events";
import { adminDb } from "@/lib/admin/db";
import { toCsv } from "@/lib/admin/csv";
import { registrationQuerySchema } from "@/lib/admin/validation";
import { recordAudit, requireStaff } from "@/lib/auth/authorization";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const actor = await requireStaff("exportRegistrations");
  const filters = registrationQuerySchema.parse({
    q: request.nextUrl.searchParams.get("q") || "",
    event: request.nextUrl.searchParams.get("event") || "",
    attendance: request.nextUrl.searchParams.get("attendance") || "all",
    page: 1,
  });
  const where = {
    ...(filters.event ? { eventSlug: filters.event } : {}),
    ...(filters.attendance === "checked-in" ? { checkedInAt: { not: null } } : filters.attendance === "pending" ? { checkedInAt: null } : {}),
    ...(filters.q ? { OR: [
      { fullName: { contains: filters.q, mode: "insensitive" as const } },
      { email: { contains: filters.q, mode: "insensitive" as const } },
      { phone: { contains: filters.q, mode: "insensitive" as const } },
      { registrationCode: { contains: filters.q.toUpperCase(), mode: "insensitive" as const } },
    ] } : {}),
  };
  const registrations = await adminDb().eventRegistration.findMany({ where, orderBy: { createdAt: "desc" }, take: 10_000 });
  const csv = toCsv([
    ["Full name", "Email", "Phone", "Organisation", "Event", "Registration code", "Status", "Checked in at", "Registered at"],
    ...registrations.map((item) => [
      item.fullName, item.email, item.phone, item.organisation, getEvent(item.eventSlug)?.title || item.eventSlug,
      item.registrationCode, item.status, item.checkedInAt?.toISOString() || "", item.createdAt.toISOString(),
    ]),
  ]);
  await recordAudit({
    actor,
    action: "REGISTRATIONS_EXPORTED",
    targetType: "EventRegistration",
    metadata: { count: registrations.length, event: filters.event || null, attendance: filters.attendance },
  });
  return new NextResponse(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="iamimpact-registrations-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
