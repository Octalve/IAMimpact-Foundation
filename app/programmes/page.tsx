import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/features/shared/PageHero";

export const metadata: Metadata = { title: "Programmes" };

const programmes = [
  ["future-schools","IAM Future Schools","Future readiness, digital intelligence, climate awareness and leadership for secondary-school students."],
  ["iam-digital","IAM Digital","Practical digital literacy and responsible AI awareness for young people and communities."],
  ["iam-climate","IAM Climate","Climate education and community-centred environmental action."],
  ["iam-community","IAM Community","Listening, volunteering and locally designed responses to community needs."],
  ["contextual-intelligence","IAM Contextual Intelligence & Leadership","Critical thinking, communication and ethical decision-making for emerging leaders."],
  ["iamimpact-clubs","IAMimpact Clubs","Student-led chapters that turn learning into school and community projects."],
];

export default function ProgrammesPage() {
  return <main id="main-content">
    <PageHero eyebrow="Our programmes" title="Structured pathways from awareness to action." description="These programme concepts are in development and will be activated as implementation plans, partners and safeguarding systems are confirmed." tone="red" />
    <section className="py-24"><div className="container-shell grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {programmes.map(([slug,title,text],index)=><Link key={slug} href={`/programmes/${slug}`} className="group flex min-h-80 flex-col justify-between rounded-[2rem] border border-[var(--brand-line)] p-8 transition hover:-translate-y-1 hover:shadow-xl">
        <div><p className="text-xs font-black uppercase tracking-[.16em] text-[var(--brand-green)]">Programme concept 0{index+1}</p><h2 className="mt-5 text-3xl font-bold tracking-tight">{title}</h2><p className="mt-5 leading-7 text-slate-600">{text}</p></div>
        <span className="mt-10 flex items-center gap-2 font-bold text-[var(--brand-deep-blue)]">View programme <ArrowUpRight className="h-5 w-5" /></span>
      </Link>)}
    </div></section>
  </main>;
}
