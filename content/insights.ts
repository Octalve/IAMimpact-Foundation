export type InsightCategory = "Ideas & perspectives" | "Reports & resources" | "Foundation news";

export const insightCategories: Array<{
  title: InsightCategory;
  description: string;
}> = [
  {
    title: "Ideas & perspectives",
    description: "Original thinking on future readiness, contextual intelligence, responsible technology, leadership and community change.",
  },
  {
    title: "Reports & resources",
    description: "Practical guides, programme learning, research notes, toolkits and transparent impact reporting.",
  },
  {
    title: "Foundation news",
    description: "Verified announcements, programme milestones, partnership updates, opportunities and event notices.",
  },
];

export const featuredInsights = [
  {
    slug: "why-future-readiness-must-begin-with-context",
    category: "Ideas & perspectives" as InsightCategory,
    title: "Why future readiness must begin with context",
    excerpt: "Technology matters, but young people also need the judgement to understand where they are, what their communities need and how to act responsibly.",
    date: "24 July 2026",
    readTime: "5 min read",
    body: [
      "Future readiness is often reduced to access to devices or familiarity with new tools. Those things matter, but they are not enough. Young people also need the judgement to understand their environment, recognise real needs and choose responsible ways to act.",
      "Context turns knowledge into useful action. It helps a learner ask who may be affected, what resources already exist, which assumptions need testing and how a solution can remain relevant after the first excitement has passed.",
      "IAMimpact Foundation is developing programmes that connect digital confidence with contextual intelligence, ethical leadership and community service. The goal is not simply to prepare young people for the future, but to help them shape it thoughtfully.",
    ],
  },
  {
    slug: "school-engagement-readiness-checklist",
    category: "Reports & resources" as InsightCategory,
    title: "A school engagement readiness checklist",
    excerpt: "A practical preview of the people, consent, safeguarding and learning conditions required for a responsible school programme.",
    date: "Coming September 2026",
    readTime: "Resource preview",
    body: [
      "Responsible school engagement begins before facilitators enter a classroom. It requires clear learning goals, safeguarding responsibilities, informed school leadership and an honest understanding of the learners and their environment.",
      "The forthcoming checklist will help schools and delivery partners review consent, accessibility, facilitator preparation, technology access, feedback methods and follow-up support before an engagement begins.",
      "This resource is currently in development and is planned for publication in September 2026.",
    ],
  },
  {
    slug: "iamimpact-foundation-begins-programme-development",
    category: "Foundation news" as InsightCategory,
    title: "IAMimpact Foundation begins programme development",
    excerpt: "The Foundation is building partnerships, safeguarding systems and pilot pathways across its five connected pillars.",
    date: "24 July 2026",
    readTime: "3 min read",
    body: [
      "IAMimpact Foundation has begun the structured development of its first programmes across education, digital inclusion, climate action, contextual leadership and community service.",
      "The current phase focuses on listening, partnership development, safeguarding systems and practical pilot pathways. Each programme will be tested against local needs before public delivery begins.",
      "Verified opportunities, pilot dates and partnership updates will be published through the Foundation’s official channels as they become available.",
    ],
  },
];

export type FeaturedInsight = (typeof featuredInsights)[number];

export function getInsight(slug: string) {
  return featuredInsights.find((insight) => insight.slug === slug);
}
