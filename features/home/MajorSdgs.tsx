import Image from "next/image";
import Link from "next/link";

const majorSdgs = [
  { number: 4, title: "Quality Education" },
  { number: 8, title: "Decent Work and Economic Growth" },
  { number: 9, title: "Industry, Innovation and Infrastructure" },
  { number: 10, title: "Reduced Inequalities" },
  { number: 11, title: "Sustainable Cities and Communities" },
  { number: 13, title: "Climate Action" },
  { number: 16, title: "Peace, Justice and Strong Institutions" },
  { number: 17, title: "Partnerships for the Goals" },
] as const;

export function MajorSdgs() {
  return (
    <section
      className="bg-white py-20 sm:py-24"
      aria-labelledby="major-sdgs-title"
    >
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--brand-red)]">
            Globally aligned, locally driven
          </p>
          <h2
            id="major-sdgs-title"
            className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl"
          >
            Our major Sustainable Development Goals
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Our programmes are designed around eight priority UN Sustainable
            Development Goals that connect education, innovation, inclusive
            growth, climate action, strong communities, and partnership.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5 lg:grid-cols-8">
          {majorSdgs.map((goal) => {
            const paddedNumber = String(goal.number).padStart(2, "0");

            return (
              <Link
                key={goal.number}
                href={`https://sdgs.un.org/goals/goal${goal.number}`}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-blue)]/30"
                aria-label={`Learn about Sustainable Development Goal ${goal.number}: ${goal.title}`}
              >
                <Image
                  src={`/images/sdgs/E_SDG_Icons-${paddedNumber}.jpg`}
                  alt={`Goal ${goal.number}: ${goal.title}`}
                  width={600}
                  height={600}
                  className="aspect-square h-auto w-full object-cover"
                />
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/what-we-do"
            className="inline-flex items-center justify-center rounded-full bg-[var(--brand-blue)] px-6 py-3 text-sm font-bold text-white transition hover:brightness-90"
          >
            See how our work advances the SDGs
          </Link>
        </div>
      </div>
    </section>
  );
}