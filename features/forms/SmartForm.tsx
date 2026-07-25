"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { TurnstileWidget } from "./TurnstileWidget";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
};

export function SmartForm({
  kind,
  title,
  introduction,
  fields,
  submitLabel = "Submit securely",
}: {
  kind: string;
  title: string;
  introduction: string;
  fields: Field[];
  submitLabel?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, ...payload }),
    });
    const result = (await response.json()) as { message?: string };
    if (!response.ok) {
      setState("error");
      setMessage(
        result.message ||
          "We could not submit your form. Please review your details and try again.",
      );
      return;
    }
    setState("success");
    setMessage(
      result.message || "Thank you. Your submission has been received.",
    );
    event.currentTarget.reset();
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[2rem] border border-[var(--brand-line)] bg-white p-7 shadow-sm sm:p-10"
    >
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600">{introduction}</p>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px]"
        aria-hidden="true"
      />
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <label
            key={field.name}
            className={`grid gap-2 text-sm font-bold ${field.type === "textarea" ? "sm:col-span-2" : ""}`}
          >
            {field.label}
            {field.required && <span className="sr-only"> (required)</span>}
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                required={field.required}
                rows={5}
                placeholder={field.placeholder}
                className="rounded-xl border border-slate-300 p-3 font-normal outline-none focus:border-[var(--brand-blue)] focus:ring-2 focus:ring-blue-100"
              />
            ) : field.type === "select" ? (
              <select
                name={field.name}
                required={field.required}
                defaultValue=""
                className="rounded-xl border border-slate-300 p-3 font-normal outline-none focus:border-[var(--brand-blue)] focus:ring-2 focus:ring-blue-100"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {field.options?.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                name={field.name}
                type={field.type || "text"}
                required={field.required}
                placeholder={field.placeholder}
                className="rounded-xl border border-slate-300 p-3 font-normal outline-none focus:border-[var(--brand-blue)] focus:ring-2 focus:ring-blue-100"
              />
            )}
          </label>
        ))}
      </div>
      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-slate-600">
        <input
          type="checkbox"
          name="consent"
          value="yes"
          required
          className="mt-1 h-4 w-4 accent-[var(--brand-blue)]"
        />
        <span>
          I consent to IAMimpact using this information to respond to this
          request, in line with the Privacy Notice.
        </span>
      </label>
      <TurnstileWidget />
      <p className="mt-4 text-xs leading-5 text-slate-500">
        Protected and secured
      </p>
      <button
        disabled={state === "sending"}
        type="submit"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--brand-red)] px-6 py-3 font-bold text-white transition hover:bg-[#c90b14] disabled:cursor-wait disabled:opacity-70"
      >
        {state === "sending" && (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        )}
        {state === "sending" ? "Submitting…" : submitLabel}
      </button>
      <div className="mt-5 min-h-6" aria-live="polite">
        {state === "success" && (
          <p className="flex items-center gap-2 font-semibold text-green-700">
            <CheckCircle2 className="h-5 w-5" />
            {message}
          </p>
        )}
        {state === "error" && (
          <p className="font-semibold text-red-700">{message}</p>
        )}
      </div>
    </form>
  );
}
