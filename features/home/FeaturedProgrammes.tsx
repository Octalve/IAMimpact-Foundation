import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const programmes = [
  {
    name: "IAM Future Schools",
    text: "Taking future-readiness, digital intelligence, climate awareness and leadership into secondary schools.",
    image: "/images/programmes/iam-future-schools.png",
    imageAlt:
      "Secondary school students participating in a collaborative classroom activity",
  },
  {
    name: "IAM Digital",
    text: "Helping young people and communities build practical digital confidence for education, work and enterprise.",
    image: "/images/programmes/iam-digital.png",
    imageAlt:
      "Young African learners collaborating during a practical digital skills session",
  },
  {
    name: "IAM Contextual Intelligence",
    text: "Developing thoughtful leaders who understand people, environments, institutions and consequences.",
    image: "/images/programmes/iam-contextual-intelligence.png",
    imageAlt:
      "Young people discussing community challenges during a leadership workshop",
  },
];

export function FeaturedProgrammes() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-shell">
        <p className="eyebrow">Our Programmes</p>

        <h2 className="section-title mt-6">
          Ideas designed to become measurable action.
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {programmes.map((programme) => (
            <article
              key={programme.name}
              className="group overflow-hidden rounded-[2rem] border border-[var(--brand-line)] bg-white"
            >
              <div className="relative min-h-64 overflow-hidden">
                <Image
                  src={programme.image}
                  alt={programme.imageAlt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-7">
                <p className="text-xs font-bold uppercase tracking-[.16em] text-[var(--brand-red)]">
                  Programme
                </p>

                <h3 className="mt-3 text-2xl font-bold">{programme.name}</h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {programme.text}
                </p>

                <Link
                  href="/programmes"
                  className="mt-7 inline-flex items-center gap-2 font-bold text-[var(--brand-deep-blue)] transition-colors hover:text-[var(--brand-red)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-deep-blue)] focus-visible:ring-offset-4"
                >
                  Explore programme
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
