import type { Metadata } from "next";
import Link from "next/link";
import { Building2, GraduationCap, HandHeart, Handshake } from "lucide-react";
import { PageHero } from "@/features/shared/PageHero";

export const metadata: Metadata = { title: "Get Involved" };

const pathways = [
  {
    href: "/get-involved/volunteer",
    label: "Volunteer",
    summary: "Contribute useful time, skills and community knowledge.",
    action: "Become a volunteer",
    icon: HandHeart,
  },
  {
    href: "/get-involved/school-engagement",
    label: "School engagement",
    summary: "Bring a responsible, future-readiness programme to your school.",
    action: "Request an engagement",
    icon: GraduationCap,
  },
  {
    href: "/get-involved/community-project",
    label: "Community project",
    summary: "Help us understand a local challenge and existing community capacity.",
    action: "Propose a project",
    icon: Building2,
  },
  {
    href: "/get-involved/partnership",
    label: "Partnership",
    summary: "Explore programme, research, technology, funding or implementation collaboration.",
    action: "Partner with us",
    icon: Handshake,
  },
];

export default function GetInvolvedPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Get involved"
        title="Choose how you want to create impact."
        description="Select the pathway that best matches how you want to contribute, collaborate or bring IAMimpact to your community."
        tone="green"
      />
      <section className="py-24">
        <div className="container-shell grid gap-6 md:grid-cols-2">
          {pathways.map(({ href, label, summary, action, icon: Icon }) => (
            <article key={href} className="flex min-h-80 flex-col rounded-[2rem] border border-[var(--brand-line)] bg-white p-9 transition hover:-translate-y-1 hover:shadow-xl">
              <Icon className="h-9 w-9 text-[var(--brand-blue)]" aria-hidden="true" />
              <h2 className="mt-12 text-3xl font-bold">{label}</h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">{summary}</p>
              <Link href={href} className="mt-auto pt-8 font-bold text-[var(--brand-deep-blue)]">
                {action} →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
