"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    const data = new FormData(event.currentTarget);
    const result = await authClient.signIn.email({
      email: String(data.get("email") || "").trim(),
      password: String(data.get("password") || ""),
    });

    if (result.error) {
      setError("Sign-in failed. Check your details or contact the super administrator.");
      setPending(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-5">
      <label className="block">
        <span className="text-sm font-bold text-slate-700">Email address</span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          maxLength={254}
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </label>
      <label className="block">
        <span className="flex items-center justify-between gap-3 text-sm">
          <span className="font-bold text-slate-700">Password</span>
          <Link
            href="/admin/forgot-password"
            className="font-bold text-[var(--brand-deep-blue)] hover:underline"
          >
            Forgot password?
          </Link>
        </span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
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
        {pending ? "Signing in…" : "Secure sign in"}
      </button>
    </form>
  );
}
