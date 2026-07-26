import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/features/admin/ForgotPasswordForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Reset admin password", robots: { index: false, follow: false } };

export default function ForgotPasswordPage() {
  return (
    <main id="main-content" className="bg-slate-50 px-4 py-20">
      <section className="mx-auto max-w-md rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-200 sm:p-10">
        <p className="eyebrow">Staff access</p>
        <h1 className="mt-4 text-3xl font-black text-slate-950">Reset your password</h1>
        <p className="mt-3 leading-7 text-slate-600">
          Enter your approved staff email. Neon Auth will send a time-limited reset link if the account exists.
        </p>
        <ForgotPasswordForm />
      </section>
    </main>
  );
}
