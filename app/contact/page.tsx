import type { Metadata } from "next";
import { Mail, MapPin, MessagesSquare } from "lucide-react";
import { PageHero } from "@/features/shared/PageHero";

export const metadata: Metadata = { title: "Contact" };
export default function ContactPage(){
  return <main id="main-content"><PageHero eyebrow="Contact" title="Start the right conversation." description="Choose the purpose of your enquiry so it can reach the appropriate team when Foundation operations begin." />
    <section className="py-24"><div className="container-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
      <div className="space-y-4">{[[Mail,"General enquiries","Official email will be published after confirmation."],[MessagesSquare,"Programmes & partnerships","Use the enquiry form once submissions open."],[MapPin,"Operational location","Abuja, Nigeria — full office details to be confirmed."]].map(([Icon,title,text])=><article key={String(title)} className="rounded-2xl bg-[#f5f7f8] p-6"><Icon className="h-5 w-5 text-[var(--brand-blue)]" /><h2 className="mt-5 font-bold">{String(title)}</h2><p className="mt-2 text-sm text-slate-600">{String(text)}</p></article>)}</div>
      <form className="rounded-[2rem] border border-[var(--brand-line)] p-7 sm:p-10" aria-describedby="form-status">
        <h2 className="text-3xl font-bold">Enquiry form</h2><p id="form-status" className="mt-3 text-sm text-[var(--brand-red)]">Preview only. Submission is disabled until a secure backend is connected.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-bold">Full name<input disabled className="rounded-xl border border-slate-300 bg-slate-50 p-3" /></label><label className="grid gap-2 text-sm font-bold">Email<input disabled type="email" className="rounded-xl border border-slate-300 bg-slate-50 p-3" /></label></div>
        <label className="mt-5 grid gap-2 text-sm font-bold">Enquiry type<select disabled className="rounded-xl border border-slate-300 bg-slate-50 p-3"><option>Select purpose</option></select></label>
        <label className="mt-5 grid gap-2 text-sm font-bold">Message<textarea disabled rows={6} className="rounded-xl border border-slate-300 bg-slate-50 p-3" /></label>
        <button disabled type="submit" className="mt-6 cursor-not-allowed rounded-full bg-slate-300 px-6 py-3 font-bold text-slate-500">Form opening soon</button>
      </form>
    </div></section>
  </main>;
}
