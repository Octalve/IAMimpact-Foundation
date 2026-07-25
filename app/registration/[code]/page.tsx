import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default async function RegistrationPass({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const validShape = /^IAM-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/.test(code);
  return <main id="main-content" className="bg-[#f4f7f8] py-24"><div className="container-shell max-w-2xl"><article className="rounded-[2.5rem] bg-white p-8 text-center shadow-sm sm:p-12"><ShieldCheck className="mx-auto h-14 w-14 text-[var(--brand-green)]" /><p className="eyebrow mt-7">IAMimpact event pass</p><h1 className="mt-4 text-4xl font-bold">Registration confirmation</h1>{validShape ? <><p className="mt-6 text-slate-600">Present this unique code at event check-in. A confirmation email is also sent when the mail provider is configured.</p><p className="mt-7 rounded-2xl bg-[var(--brand-deep-blue)] p-5 font-mono text-2xl font-black text-white">{code}</p></> : <p className="mt-6 font-semibold text-red-700">This registration code format is not valid.</p>}<Link href="/events" className="mt-8 inline-block font-bold text-[var(--brand-blue)]">Back to events</Link></article></div></main>;
}

