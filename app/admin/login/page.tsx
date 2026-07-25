import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/features/admin/LoginForm";
import { currentStaff } from "@/lib/auth/authorization";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  const staff = await currentStaff();
  if (staff) redirect("/admin");

  return (
    <main id="main-content" className="bg-slate-50 px-4 py-20">
      <section className="mx-auto max-w-md rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-200 sm:p-10">
        <p className="eyebrow">Staff access</p>
        <h1 className="mt-4 text-3xl font-black text-slate-950">IAMimpact Admin</h1>
        <p className="mt-3 leading-7 text-slate-600">
          Sign in with an approved Neon Auth staff account. Access is invite-only.
        </p>
        <LoginForm />
      </section>
    </main>
  );
}
