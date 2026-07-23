import type { Metadata } from "next";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PageHero } from "@/features/shared/PageHero";

export const metadata: Metadata = { title: "Stories of Impact" };

export default function StoriesPage(){
  return <main id="main-content"><PageHero eyebrow="Stories of impact" title="People are not statistics." description="This space will centre participant voices and document change with consent, accuracy and dignity." />
    <section className="py-24"><div className="container-shell">
      <div className="rounded-[2.5rem] border border-dashed border-slate-300 p-6 sm:p-10"><ImagePlaceholder label="Impact stories will appear here after programmes begin and participants approve publication." tone="blue" className="min-h-[480px] rounded-[2rem]" /></div>
    </div></section>
  </main>;
}
