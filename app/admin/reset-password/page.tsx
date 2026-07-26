import type { Metadata } from "next";
import { InvalidResetLink, ResetPasswordForm } from "@/features/admin/ResetPasswordForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Choose a new admin password", robots: { index: false, follow: false } };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const value = (await searchParams).token;
  const token = typeof value === "string" ? value : "";

  return (
    <main id="main-content" className="bg-slate-50 px-4 py-20">
      <section className="mx-auto max-w-md rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-200 sm:p-10">
        <p className="eyebrow">Staff access</p>
        <h1 className="mt-4 text-3xl font-black text-slate-950">Choose a new password</h1>
        <p className="mt-3 leading-7 text-slate-600">
          Use a strong password that you do not use for another service.
        </p>
        {token ? <ResetPasswordForm token={token} /> : <InvalidResetLink />}
      </section>
    </main>
  );
}
