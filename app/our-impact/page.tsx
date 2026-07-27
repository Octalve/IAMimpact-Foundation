import type { Metadata } from "next";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PageHero } from "@/features/shared/PageHero";

export const metadata: Metadata = { title: "Our Impact" };

export default function ImpactPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Our impact"
        title="Evidence before applause."
        description="We will report what was delivered, who participated, what changed and what still needs work—without presenting targets as achievements."
        tone="dark"
      />
      <section className="py-24">
        <div className="container-shell grid gap-5 md:grid-cols-3">
          {[
            "Activities delivered",
            "Verified participants",
            "Participant-led projects",
          ].map((label) => (
            <article key={label} className="rounded-[2rem] bg-[#f4f7f8] p-8">
              <p className="text-5xl font-black text-[var(--brand-blue)]">—</p>
              <h2 className="mt-8 text-xl font-bold">{label}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Published only after verified programme delivery.
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-[#eef8eb] py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">How we measure</p>
            <h2 className="section-title mt-6">
              Numbers tell part of the story. People and outcomes complete it.
            </h2>
            <p className="body-copy mt-7 text-lg">
              Our framework will combine participation data, learning outcomes,
              project completion, community feedback and carefully documented
              stories.
            </p>
          </div>
          <ImagePlaceholder
            label="Suggested image: students presenting a completed community project"
            tone="green"
            className="min-h-[460px] rounded-[2.5rem]"
          />
        </div>
      </section>
    </main>
  );
}
