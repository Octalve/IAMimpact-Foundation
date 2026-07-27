"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, Mail } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";

export function ForgotPasswordForm() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim();
    const redirectTo = `${window.location.origin}/admin/reset-password`;
    const result = await authClient.requestPasswordReset({ email, redirectTo });

    setPending(false);
    if (result.error) {
      setError("We could not send the reset email. Please try again shortly.");
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="mt-8 space-y-5">
        <p
          role="status"
          className="rounded-xl bg-emerald-50 p-4 text-sm font-semibold leading-6 text-emerald-900"
        >
          If that email belongs to an account, password-reset instructions have
          been sent. Check the inbox and spam folder.
        </p>
        <Link
          href="/admin/login"
          className="block text-center font-bold text-[var(--brand-deep-blue)] hover:underline"
        >
          Return to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-5">
      <label className="block">
        <span className="text-sm font-bold text-slate-700">Email address</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </label>
      {error ? (
        <p role="alert" className="text-sm font-semibold text-red-700">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand-deep-blue)] px-5 py-3.5 font-black text-white disabled:opacity-60"
      >
        {pending ? (
          <LoaderCircle className="h-5 w-5 animate-spin" />
        ) : (
          <Mail className="h-5 w-5" />
        )}
        {pending ? "Sending…" : "Send reset email"}
      </button>
      <Link
        href="/admin/login"
        className="block text-center font-bold text-[var(--brand-deep-blue)] hover:underline"
      >
        Return to sign in
      </Link>
    </form>
  );
}
