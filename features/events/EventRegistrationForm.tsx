"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { TurnstileWidget } from "@/features/forms/TurnstileWidget";

export function EventRegistrationForm({ eventSlug, eventTitle }: { eventSlug: string; eventTitle: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    const response = await fetch("/api/events/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, eventSlug }),
    });
    const result = (await response.json()) as { message?: string; registrationCode?: string };
    if (!response.ok) {
      setStatus("error");
      setMessage(result.message || "Registration could not be completed.");
      return;
    }
    setCode(result.registrationCode || "");
    setStatus("done");
  }
  if (status === "done") {
    return <div className="rounded-[2rem] bg-[#eef8eb] p-8"><p className="eyebrow">Registration confirmed</p><h2 className="mt-4 text-3xl font-bold">You’re registered for {eventTitle}.</h2><p className="mt-4 text-slate-700">Your unique registration code is:</p><p className="mt-3 font-mono text-2xl font-black text-[var(--brand-deep-blue)]">{code}</p><Link href={`/registration/${code}`} className="mt-6 inline-block rounded-full bg-[var(--brand-deep-blue)] px-6 py-3 font-bold text-white">Open confirmation pass</Link></div>;
  }
  return <form onSubmit={submit} className="rounded-[2rem] border border-[var(--brand-line)] p-7 sm:p-9">
    <h2 className="text-3xl font-bold">Register for this event</h2>
    <p className="mt-3 text-slate-600">Places are confirmed in order of complete registration, subject to eligibility and capacity.</p>
    <input name="website" tabIndex={-1} className="absolute left-[-9999px]" aria-hidden />
    <div className="mt-7 grid gap-4 sm:grid-cols-2">
      <label className="grid gap-2 text-sm font-bold">Full name<input name="fullName" required className="rounded-xl border border-slate-300 p-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-bold">Email<input name="email" type="email" required className="rounded-xl border border-slate-300 p-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-bold">Phone<input name="phone" type="tel" className="rounded-xl border border-slate-300 p-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-bold">School or organisation<input name="organisation" className="rounded-xl border border-slate-300 p-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-bold sm:col-span-2">Accessibility or participation needs<textarea name="accessibilityNeeds" rows={3} className="rounded-xl border border-slate-300 p-3 font-normal" /></label>
    </div>
    <label className="mt-5 flex gap-3 text-sm text-slate-600"><input type="checkbox" name="consent" value="yes" required className="mt-1" />I consent to the use of my details for event administration and related safety communication.</label>
    <TurnstileWidget />
    <button disabled={status === "sending"} className="mt-6 rounded-full bg-[var(--brand-red)] px-6 py-3 font-bold text-white disabled:opacity-60">{status === "sending" ? "Registering…" : "Complete registration"}</button>
    <p className="mt-4 min-h-6 text-sm font-semibold text-red-700" aria-live="polite">{message}</p>
  </form>;
}
