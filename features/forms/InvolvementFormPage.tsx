import Link from "next/link";
import { PageHero } from "@/features/shared/PageHero";
import { SmartForm } from "@/features/forms/SmartForm";

export type InvolvementField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
};

export const commonInvolvementFields: InvolvementField[] = [
  { name: "fullName", label: "Full name", required: true },
  { name: "email", label: "Email address", type: "email", required: true },
  { name: "phone", label: "Phone number", type: "tel" },
  { name: "organisation", label: "Organisation, school or community" },
];

export function InvolvementFormPage({
  eyebrow,
  title,
  description,
  kind,
  fields,
}: {
  eyebrow: string;
  title: string;
  description: string;
  kind: string;
  fields: InvolvementField[];
}) {
  return (
    <main id="main-content">
      <PageHero eyebrow={eyebrow} title={title} description={description} tone="green" />
      <section className="py-20">
        <div className="container-shell">
          <Link href="/get-involved" className="inline-block font-bold text-[var(--brand-deep-blue)]">← View all ways to get involved</Link>
          <div className="mt-10 max-w-4xl">
            <SmartForm
              kind={kind}
              title={`${eyebrow} form`}
              introduction="Complete the form below. Your submission is an expression of interest and does not guarantee placement or programme approval."
              fields={fields}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
