import Image from "next/image";

export function StoriesOfImpact() {
  return (
    <section className="overflow-hidden bg-[var(--brand-deep-blue)] py-24 text-white sm:py-32">
      <div className="container-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.2em] text-[#a9e39d]">
            Stories of impact
          </p>

          <h2 className="mt-6 text-5xl font-bold leading-[.95] tracking-[-.05em] sm:text-7xl">
            Every impact begins with a person.
          </h2>

          <p className="mt-7 max-w-xl text-lg leading-8 text-blue-100">
            IAMimpact equips young people and communities with education,
            digital skills, climate awareness and contextual intelligence. Our
            impact stories highlight the journeys of our participants and the
            positive change they create in their communities.
          </p>

          <p className="mt-6 text-sm font-bold text-[#a9e39d]">
            You are part of the story.
          </p>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] sm:min-h-[520px]">
          <Image
            src="/images/stories/iamimpact-community-leader.png"
            alt="A young Nigerian woman leading participants during a collaborative community innovation project"
            fill
            sizes="(max-width: 1023px) 100vw, 55vw"
            className="object-cover"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[var(--brand-deep-blue)]/25 via-transparent to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
