import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/features/shared/PageHero";
import { TeamSections } from "@/features/who-we-are/TeamSections";

export const metadata: Metadata = {
  title: "Who We Are",
};

export default function WhoWeArePage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Who we are"
        title="A foundation built on the belief that everyone can create impact."
        description="IAMimpact Foundation is a youth and community-development organisation being built to equip people with knowledge, skills and opportunities to improve their context."
      />

      <section className="py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] bg-slate-100 sm:min-h-[520px]">
            <Image
              src="/images/ismail-aminullahi-olamide.png"
              alt="Ismail Aminullahi Olamide, founder of IAMimpact Foundation"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover object-top"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[var(--brand-deep-blue)]/25 via-transparent to-transparent"
            />

            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-[var(--brand-deep-blue)]/85 p-5 text-white shadow-xl backdrop-blur-md sm:inset-x-7 sm:bottom-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a9e39d]">
                Founder
              </p>

              <p className="mt-2 text-xl font-bold">
                Ismail Aminullahi Olamide
              </p>

              <p className="mt-1 text-sm text-blue-100">
                Turning personal conviction into meaningful, shared impact.
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow">Our story</p>

            <h2 className="mt-6 text-4xl font-bold tracking-[-.04em] sm:text-6xl">
              From a personal conviction to a shared movement.
            </h2>

            <p className="body-copy mt-7 text-lg">
              #IAMimpact began as Ismail Aminullahi Olamide&apos;s commitment to
              live visibly, contribute meaningfully and help other people
              recognise their capacity. The Foundation turns that conviction
              into structured programmes for students and communities.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f8f9] py-24">
        <div className="container-shell grid gap-6 md:grid-cols-2">
          <article className="rounded-[2rem] bg-white p-9">
            <p className="text-sm font-bold text-[var(--brand-red)]">VISION</p>

            <h2 className="mt-5 text-3xl font-bold">
              A future where every young person can pursue excellence, solve
              meaningful problems and create sustainable impact.
            </h2>
          </article>

          <article className="rounded-[2rem] bg-[var(--brand-deep-blue)] p-9 text-white">
            <p className="text-sm font-bold text-[#a9e39d]">MISSION</p>

            <h2 className="mt-5 text-3xl font-bold">
              To empower students, young people and communities through digital
              literacy, contextual intelligence, climate education, leadership
              and community-led solutions.
            </h2>
          </article>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <p className="eyebrow">Our values</p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Excellence with integrity",
              "Dignity and inclusion",
              "Learning through action",
              "Community ownership",
            ].map((value, index) => (
              <article
                key={value}
                className="rounded-[1.5rem] border border-[var(--brand-line)] p-7"
              >
                <span className="text-sm font-black text-[var(--brand-green)]">
                  0{index + 1}
                </span>

                <h2 className="mt-10 text-2xl font-bold">{value}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TeamSections />
    </main>
  );
}
