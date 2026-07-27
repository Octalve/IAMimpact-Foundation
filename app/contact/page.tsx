import type { Metadata } from "next";
import { Mail, MapPin, ShieldCheck } from "lucide-react";
import { PageHero } from "@/features/shared/PageHero";
import { SmartForm } from "@/features/forms/SmartForm";
import { engagementTypes, siteConfig } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };
export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Contact"
        title="Start the right conversation."
        description="Tell us what you need so your enquiry can reach the appropriate team."
      />
      <section className="py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div className="space-y-4">
            <article className="rounded-2xl bg-[#f5f7f8] p-6">
              <Mail className="h-5 w-5 text-[var(--brand-blue)]" />
              <h2 className="mt-5 font-bold">General enquiries</h2>
              <p className="mt-2 text-sm text-slate-600">
                {siteConfig.publicEmail}
              </p>
            </article>
            <article className="rounded-2xl bg-[#f5f7f8] p-6">
              <ShieldCheck className="h-5 w-5 text-[var(--brand-green)]" />
              <h2 className="mt-5 font-bold">Safeguarding concerns</h2>
              <p className="mt-2 text-sm text-slate-600">
                {siteConfig.safeguardingEmail}
              </p>
            </article>
            <article className="rounded-2xl bg-[#f5f7f8] p-6">
              <MapPin className="h-5 w-5 text-[var(--brand-red)]" />
              <h2 className="mt-5 font-bold">Location</h2>
              <p className="mt-2 text-sm text-slate-600">
                {siteConfig.location}. Meetings are by appointment.
              </p>
            </article>
          </div>
          <SmartForm
            kind="Contact enquiry"
            title="Enquiry form"
            introduction="We aim to acknowledge complete enquiries within five working days."
            fields={[
              { name: "fullName", label: "Full name", required: true },
              {
                name: "email",
                label: "Email address",
                type: "email",
                required: true,
              },
              { name: "phone", label: "Phone number", type: "tel" },
              {
                name: "enquiryType",
                label: "Enquiry type",
                type: "select",
                options: [...engagementTypes],
                required: true,
              },
              {
                name: "message",
                label: "How can we help?",
                type: "textarea",
                required: true,
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
