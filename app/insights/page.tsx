import type { Metadata } from "next";
import { ArrowUpRight, FileText, Lightbulb, Newspaper } from "lucide-react";
import { PageHero } from "@/features/shared/PageHero";

export const metadata: Metadata = { title: "Insights" };

const types=[{icon:Lightbulb,title:"Ideas & perspectives",text:"Contextual intelligence, leadership and thoughtful public contribution."},{icon:FileText,title:"Reports & resources",text:"Programme learning, guides and transparent impact reporting."},{icon:Newspaper,title:"Foundation news",text:"Verified announcements, opportunities and programme updates."}];
export default function InsightsPage(){
  return <main id="main-content"><PageHero eyebrow="Insights & resources" title="Learning should travel further than the room." description="Explore ideas, practical resources, programme learning and Foundation updates." tone="green" />
    <section className="py-24"><div className="container-shell grid gap-5 md:grid-cols-3">{types.map(item=><article key={item.title} className="rounded-[2rem] border border-[var(--brand-line)] p-8"><item.icon className="h-8 w-8 text-[var(--brand-blue)]" /><h2 className="mt-12 text-3xl font-bold">{item.title}</h2><p className="mt-4 leading-7 text-slate-600">{item.text}</p><p className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-deep-blue)]">Content coming soon <ArrowUpRight className="h-4 w-4" /></p></article>)}</div></section>
  </main>;
}
