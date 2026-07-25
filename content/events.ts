export type FoundationEvent = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  startAt: string;
  endAt: string;
  location: string;
  format: "In person" | "Online" | "Hybrid";
  capacity: number;
  audience: string;
  registrationOpen: boolean;
  featured?: boolean;
};

// Add future events here. Each event automatically receives a listing,
// detail page, countdown and registration pathway.
export const events: FoundationEvent[] = [
  {
    slug: "future-ready-schools-abuja-2026",
    title: "Future-Ready Schools Lab",
    summary: "A practical day of digital confidence, contextual intelligence and climate action for secondary-school students.",
    description:
      "Students will explore responsible technology, problem-solving, leadership and community action through guided challenges. Teachers and school leaders will also receive a short implementation resource.",
    startAt: "2026-11-14T09:00:00+01:00",
    endAt: "2026-11-14T15:30:00+01:00",
    location: "Abuja, Nigeria · Venue shared with confirmed participants",
    format: "In person",
    capacity: 120,
    audience: "Secondary-school students, teachers and school leaders",
    registrationOpen: true,
    featured: true,
  },
  {
    slug: "contextual-intelligence-roundtable-2027",
    title: "Contextual Intelligence Roundtable",
    summary: "An online conversation on leading thoughtfully in complex communities and institutions.",
    description:
      "A moderated exchange for emerging leaders, educators and community builders on context, ethics, communication and responsible decision-making.",
    startAt: "2027-02-20T16:00:00+01:00",
    endAt: "2027-02-20T18:00:00+01:00",
    location: "Online · Access link sent after registration",
    format: "Online",
    capacity: 300,
    audience: "Emerging leaders, educators and community builders",
    registrationOpen: true,
  },
];

export function getEvent(slug: string) {
  return events.find((event) => event.slug === slug);
}
