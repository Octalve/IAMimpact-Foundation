export type InsightCategory = "Ideas & perspectives" | "Reports & resources" | "Foundation news";

export const insightCategories: Array<{
  title: InsightCategory;
  description: string;
  editorialUse: string;
}> = [
  {
    title: "Ideas & perspectives",
    description: "Original thinking on future readiness, contextual intelligence, responsible technology, leadership and community change.",
    editorialUse: "Add essays, interviews, explainers and practitioner reflections.",
  },
  {
    title: "Reports & resources",
    description: "Practical guides, programme learning, research notes, toolkits and transparent impact reporting.",
    editorialUse: "Add downloadable PDFs, learning briefs, templates and annual reports.",
  },
  {
    title: "Foundation news",
    description: "Verified announcements, programme milestones, partnership updates, opportunities and event notices.",
    editorialUse: "Add dated updates with an author, location, image and related links.",
  },
];

export const featuredInsights = [
  {
    category: "Ideas & perspectives" as InsightCategory,
    title: "Why future readiness must begin with context",
    excerpt: "Technology matters, but young people also need the judgement to understand where they are, what their communities need and how to act responsibly.",
    date: "24 July 2026",
    readTime: "5 min read",
  },
  {
    category: "Reports & resources" as InsightCategory,
    title: "A school engagement readiness checklist",
    excerpt: "A practical preview of the people, consent, safeguarding and learning conditions required for a responsible school programme.",
    date: "Coming September 2026",
    readTime: "Resource preview",
  },
  {
    category: "Foundation news" as InsightCategory,
    title: "IAMimpact Foundation begins programme development",
    excerpt: "The Foundation is building partnerships, safeguarding systems and pilot pathways across its five connected pillars.",
    date: "24 July 2026",
    readTime: "3 min read",
  },
];
