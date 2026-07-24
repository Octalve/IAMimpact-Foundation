import { ArrowLink } from "@/components/ui/ArrowLink";
import { Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-[#12202b] text-white">
      {/*
        Approved image slot:
        Replace the gradient layer below with a locally stored, consent-cleared IAMimpact hero photograph/video.
        Suggested subject: African secondary-school students collaborating during a digital or climate activity.
        Do not hotlink remote images in production.
      */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#31a51f66,transparent_30%),radial-gradient(circle_at_20%_70%,#0a87c788,transparent_35%),linear-gradient(130deg,#152a38,#17212a_58%,#36181b)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#ffffff08_1px,transparent_1px),linear-gradient(90deg,#ffffff08_1px,transparent_1px)] [background-size:52px_52px]" />
      <div className="container-shell relative flex min-h-[720px] flex-col justify-between py-14">
        <div className="flex justify-end">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm text-white"
            aria-label="Play foundation story video"
          >
            <Play className="h-4 w-4" /> Our story
          </button>
        </div>
        <div className="max-w-4xl pb-6">
          <p className="mb-5 text-sm font-bold uppercase tracking-[.22em] text-[#8fd77e]">
            I am impact. You are impact.
          </p>
          <h1 className="text-[clamp(3.3rem,9vw,8.5rem)] font-medium leading-[.84] tracking-[-.075em]">
            Building futures that multiply impact.
          </h1>
          <div className="mt-8 flex flex-col gap-6 border-t border-white/25 pt-7 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-lg leading-8 text-slate-200">
              We equip young people and communities with education, digital
              skills, climate awareness and contextual intelligence.
            </p>
            <ArrowLink href="/what-we-do" inverse>
              Explore our work
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
