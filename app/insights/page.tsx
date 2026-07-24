import type { Metadata } from "next";
import { FileText, Lightbulb, Newspaper } from "lucide-react";
import { PageHero } from "@/features/shared/PageHero";
import { featuredInsights, insightCategories } from "@/content/insights";

export const metadata: Metadata = { title: "Insights & Resources", description: "Ideas, reports, practical resources and verified IAMimpact Foundation news." };
const icons = { "Ideas & perspectives": Lightbulb, "Reports & resources": FileText, "Foundation news": Newspaper };

export default function InsightsPage() {
  return <main id="main-content">
    <PageHero eyebrow="Insights & resources" title="Learning should travel further than the room." description="Explore grounded ideas, useful resources, programme learning and verified Foundation updates." tone="green" />
    <section className="py-24"><div className="container-shell">
      <p className="eyebrow">Explore by type</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">{insightCategories.map((item) => {
        const Icon = icons[item.title];
        return <article key={item.title} className="rounded-[2rem] border border-[var(--brand-line)] p-8"><Icon className="h-8 w-8 text-[var(--brand-blue)]" /><h2 className="mt-10 text-3xl font-bold">{item.title}</h2><p className="mt-4 leading-7 text-slate-600">{item.description}</p><p className="mt-6 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600"><strong className="text-slate-900">How to add more:</strong> {item.editorialUse}</p></article>;
      })}</div>
    </div></section>
    <section className="bg-[#f4f7f8] py-24"><div className="container-shell"><div className="flex items-end justify-between gap-6"><div><p className="eyebrow">Latest</p><h2 className="section-title mt-5">Ideas worth carrying forward.</h2></div></div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">{featuredInsights.map((item) => <article key={item.title} className="flex min-h-80 flex-col rounded-[2rem] bg-white p-8"><p className="text-xs font-black uppercase tracking-[.16em] text-[var(--brand-red)]">{item.category}</p><h3 className="mt-6 text-3xl font-bold tracking-tight">{item.title}</h3><p className="mt-5 leading-7 text-slate-600">{item.excerpt}</p><p className="mt-auto pt-8 text-sm font-semibold text-slate-500">{item.date} · {item.readTime}</p></article>)}</div>
    </div></section>
  </main>;
}
