import type { Metadata } from "next";
import { Search } from "lucide-react";
import { PageHero } from "@/features/shared/PageHero";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage(){
  return <main id="main-content"><PageHero eyebrow="Search" title="Find programmes, stories and opportunities." description="The search interface is prepared for connection to verified website content." />
    <section className="py-24"><div className="container-shell max-w-3xl">
      <label className="grid gap-3 text-sm font-bold" htmlFor="site-search">Search IAMimpact</label>
      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-50 p-4"><Search className="h-5 w-5 text-slate-400" /><input id="site-search" disabled placeholder="Search will be enabled when content is published" className="w-full bg-transparent outline-none" /></div>
      <p className="mt-4 text-sm text-slate-500">Search is intentionally disabled until the website has a connected content index.</p>
    </div></section>
  </main>;
}
