import type { Metadata } from "next";
import { BookOpen, BrainCircuit, CloudSun, Laptop, Users } from "lucide-react";
import { PageHero } from "@/features/shared/PageHero";

export const metadata: Metadata = { title: "What We Do" };

const pillars = [
  {
    icon: BookOpen,
    title: "Education and Future Readiness",
    body: "Secondary-school engagement, career discovery, learning support and excellence.",
    sdg: "SDGs 4, 8 and 10",
  },
  {
    icon: Laptop,
    title: "Digital Inclusion and Innovation",
    body: "Digital literacy, AI awareness, responsible technology use and practical digital skills.",
    sdg: "SDGs 4, 8, 9 and 10",
  },
  {
    icon: CloudSun,
    title: "Climate and Sustainable Communities",
    body: "Climate education, environmental responsibility and community action.",
    sdg: "SDGs 11 and 13",
  },
  {
    icon: BrainCircuit,
    title: "Leadership and Contextual Intelligence",
    body: "Critical thinking, ethical leadership, communication and intelligent decision-making.",
    sdg: "SDGs 4 and 16",
  },
  {
    icon: Users,
    title: "Community Development and Service",
    body: "Community needs assessment, volunteer mobilisation and locally designed solutions.",
    sdg: "SDGs 10, 11 and 17",
  },
];

export default function WhatWeDoPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="What we do"
        title="Five connected pillars. One commitment to multiplying impact."
        description="Our work links learning, technology, climate responsibility, intelligent leadership and community service."
        tone="green"
      />
      <section className="py-24">
        <div className="container-shell space-y-5">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className="grid gap-6 rounded-[2rem] border border-[var(--brand-line)] p-7 md:grid-cols-[100px_1fr_auto] md:items-center md:p-10"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--brand-mist)]">
                <pillar.icon className="h-9 w-9 text-[var(--brand-deep-blue)]" />
              </div>
              <div>
                <p className="text-sm font-black text-[var(--brand-red)]">
                  PILLAR {index + 1}
                </p>
                <h2 className="mt-2 text-3xl font-bold">{pillar.title}</h2>
                <p className="mt-3 max-w-2xl text-slate-600">{pillar.body}</p>
              </div>
              <p className="w-fit rounded-full bg-[#eaf7e7] px-4 py-2 text-sm font-bold text-[#237815]">
                {pillar.sdg}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
