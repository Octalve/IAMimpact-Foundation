import Link from "next/link";
import { CheckCircle2, Search, TriangleAlert } from "lucide-react";
import { getEvent } from "@/content/events";
import { adminDb } from "@/lib/admin/db";
import { registrationCodeSchema } from "@/lib/admin/validation";
import { requireStaff } from "@/lib/auth/authorization";
import { checkInRegistration } from "../actions";

export const dynamic = "force-dynamic";

export default async function CheckInPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireStaff("checkIn");
  const raw = await searchParams;
  const result = typeof raw.result === "string" ? raw.result : "";
  const parsedCode = registrationCodeSchema.safeParse(typeof raw.code === "string" ? raw.code : "");
  const registration = parsedCode.success
    ? await adminDb().eventRegistration.findUnique({ where: { registrationCode: parsedCode.data } })
    : null;

  const messages: Record<string, { tone: string; text: string }> = {
    success: { tone: "bg-green-50 text-green-800", text: "Participant checked in successfully." },
    already: { tone: "bg-amber-50 text-amber-800", text: "This participant was already checked in." },
    "not-found": { tone: "bg-red-50 text-red-800", text: "No active registration matches that code." },
    invalid: { tone: "bg-red-50 text-red-800", text: "Enter a valid registration code." },
  };
  const message = messages[result];

  return (
    <div className="container-shell py-10">
      <p className="eyebrow">Attendance</p>
      <h1 className="mt-4 text-4xl font-black">Participant check-in</h1>
      <p className="mt-3 max-w-2xl text-slate-600">Enter the code printed below the QR code on the participant’s event pass.</p>
      <section className="mt-8 max-w-2xl rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        {message ? <div role="status" className={`mb-5 flex gap-3 rounded-xl p-4 font-bold ${message.tone}`}>{result === "success" ? <CheckCircle2 className="h-5 w-5" /> : <TriangleAlert className="h-5 w-5" />}{message.text}</div> : null}
        <form action={checkInRegistration} className="flex flex-col gap-3 sm:flex-row">
          <input name="registrationCode" defaultValue={parsedCode.success ? parsedCode.data : ""} required maxLength={80} autoFocus placeholder="IAM-XXXX-XXXX" className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 font-mono uppercase" />
          <button className="flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-green)] px-5 py-3 font-black text-white"><Search className="h-5 w-5" />Check in</button>
        </form>
        {registration ? (
          <div className="mt-6 rounded-xl bg-slate-50 p-5">
            <p className="text-xl font-black">{registration.fullName}</p>
            <p className="mt-1 text-slate-600">{getEvent(registration.eventSlug)?.title || registration.eventSlug}</p>
            <Link href={`/admin/registrations/${registration.id}`} className="mt-3 inline-block font-bold text-[var(--brand-deep-blue)]">Open full record →</Link>
          </div>
        ) : null}
      </section>
    </div>
  );
}
