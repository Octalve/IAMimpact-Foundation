import { ArrowLink } from "@/components/ui/ArrowLink";

export function ImpactIntroduction() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-shell grid gap-12 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="eyebrow">Why IAMimpact</p>
          <h2 className="section-title mt-6">
            Potential becomes progress when people are equipped to act.
          </h2>
        </div>
        <div className="flex flex-col justify-center">
          <p className="body-copy text-lg">
            IAMimpact Foundation works with secondary-school students, young
            people and communities to turn learning into action. Our approach
            connects future readiness, responsible technology, climate
            education, ethical leadership and community-led problem-solving.
          </p>
          <p className="body-copy mt-5">
            We are building a platform where every participant can recognise
            their capacity, understand their context and contribute meaningfully
            to society.
          </p>
          <div className="mt-8">
            <ArrowLink href="/who-we-are">Discover our foundation</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
