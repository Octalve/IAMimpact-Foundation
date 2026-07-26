import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TeamPortrait } from "./TeamPortrait";

const leaders = [
  {
    name: "Ismail Aminullahi Olamide",
    role: "Founder and President",
    image: "/images/ismail-aminullahi-olamide.png",
  },
  {
    name: "Edikan Udoma",
    role: "Curriculum and Programmes Development Lead",
    image: "/images/edikan-udoma.png",
  },
  {
    name: "Ike Chidera Divine",
    role: "Programmes Implementation and Community Engagement Coordinator",
    image: "/images/ike-chidera-divine.png",
  },
];

const volunteers = Array.from({ length: 5 }, (_, index) => ({
  name: `Volunteer ${String(index + 1).padStart(2, "0")}`,
  role: "Volunteer profile coming soon",
  image: `/images/volunteer-${String(index + 1).padStart(2, "0")}.png`,
}));

export function TeamSections() {
  return (
    <>
      <section className="bg-[#f6f8f9] py-24">
        <div className="container-shell">
          <p className="eyebrow">Leadership</p>
          <div className="mt-6 max-w-3xl">
            <h2 className="text-4xl font-bold tracking-[-.04em] sm:text-6xl">
              The people guiding our mission.
            </h2>
            <p className="body-copy mt-6 text-lg">
              Our leadership team combines vision, programme development and
              community-centred implementation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {leaders.map((member) => (
              <article
                key={member.name}
                className="overflow-hidden rounded-[2rem] bg-white shadow-sm"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <TeamPortrait
                    src={member.image}
                    alt={member.name}
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  />
                </div>
                <div className="p-7">
                  <h3 className="text-2xl font-bold">{member.name}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[var(--brand-deep-blue)]">
                    {member.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow">Our volunteers</p>
              <h2 className="mt-6 text-4xl font-bold tracking-[-.04em] sm:text-6xl">
                People choosing to make an impact.
              </h2>
              <p className="body-copy mt-6 text-lg">
                Volunteer profiles will appear here as our community grows.
              </p>
            </div>

            <Link
              href="/get-involved"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--brand-red)] px-6 py-3 font-bold text-white transition hover:-translate-y-0.5"
            >
              Become a volunteer
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {volunteers.map((member) => (
              <article
                key={member.name}
                className="overflow-hidden rounded-[1.5rem] border border-[var(--brand-line)] bg-white"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <TeamPortrait
                    src={member.image}
                    alt={member.name}
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 20vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    {member.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
