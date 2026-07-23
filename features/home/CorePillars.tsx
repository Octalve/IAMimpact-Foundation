import {
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  CloudSun,
  Laptop,
  Users,
} from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    icon: BookOpen,
    title: "Education & Future Readiness",
    text: "School engagement, career discovery, learning support and excellence.",
    color: "bg-[#e5f5fc]",
  },
  {
    icon: Laptop,
    title: "Digital Inclusion & Innovation",
    text: "Digital literacy, AI awareness and responsible technology use.",
    color: "bg-[#e9f7e5]",
  },
  {
    icon: CloudSun,
    title: "Climate & Sustainable Communities",
    text: "Climate education, environmental responsibility and local action.",
    color: "bg-[#fff0f1]",
  },
  {
    icon: BrainCircuit,
    title: "Leadership & Contextual Intelligence",
    text: "Critical thinking, ethical leadership and intelligent decisions.",
    color: "bg-[#edf1fa]",
  },
  {
    icon: Users,
    title: "Community Development & Service",
    text: "Local needs assessment, volunteers and community-designed solutions.",
    color: "bg-[#f4f5f6]",
  },
];

export function CorePillars() {
  return (
    <section className="bg-[#f7f9fa] py-24 sm:py-32">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Our five pillars</p>
            <h2 className="section-title mt-6">
              Connected pathways to lasting impact.
            </h2>
          </div>
          <Link
            href="/what-we-do"
            className="inline-flex items-center gap-2 font-bold text-[var(--brand-deep-blue)]"
          >
            View all pillars <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className={`${pillar.color} group min-h-72 rounded-[2rem] p-7 ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
            >
              <pillar.icon
                className="h-8 w-8 text-[var(--brand-deep-blue)]"
                aria-hidden="true"
              />
              <h3 className="mt-12 max-w-sm text-2xl font-bold tracking-tight">
                {pillar.title}
              </h3>
              <p className="mt-4 max-w-md leading-7 text-slate-600">
                {pillar.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
