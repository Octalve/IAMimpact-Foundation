"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    const data = new FormData(event.currentTarget);
    const newPassword = String(data.get("password") || "");
    const confirmation = String(data.get("confirmation") || "");

    if (newPassword !== confirmation) {
      setError("The passwords do not match.");
      setPending(false);
      return;
    }

    const result = await authClient.resetPassword({ newPassword, token });
    if (result.error) {
      setError("This reset link is invalid or has expired. Request a new reset email.");
      setPending(false);
      return;
    }

    router.replace("/admin/login?reset=success");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-5">
      <label className="block">
        <span className="text-sm font-bold text-slate-700">New password</span>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </label>
      <label className="block">
        <span className="text-sm font-bold text-slate-700">Confirm new password</span>
        <input
          name="confirmation"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </label>
      {error ? <p role="alert" className="text-sm font-semibold text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand-deep-blue)] px-5 py-3.5 font-black text-white disabled:opacity-60"
      >
        {pending ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <LockKeyhole className="h-5 w-5" />}
        {pending ? "Updating…" : "Set new password"}
      </button>
    </form>
  );
}

export function InvalidResetLink() {
  return (
    <div className="mt-8 space-y-5">
      <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold leading-6 text-red-800">
        This password-reset link is invalid or incomplete. Request a new reset email.
      </p>
      <Link href="/admin/forgot-password" className="block text-center font-bold text-[var(--brand-deep-blue)] hover:underline">
        Request a new reset link
      </Link>
    </div>
  );
}
