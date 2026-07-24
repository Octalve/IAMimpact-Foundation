import type { Metadata } from "next";
import { PageHero } from "@/features/shared/PageHero";
import { SmartForm } from "@/features/forms/SmartForm";

export const metadata: Metadata = { title: "Get Involved" };
const common = [
  { name: "fullName", label: "Full name", required: true },
  { name: "email", label: "Email address", type: "email" as const, required: true },
  { name: "phone", label: "Phone number", type: "tel" as const },
  { name: "organisation", label: "Organisation, school or community" },
];
const pathways = [
  { id: "volunteer", label: "Volunteer", summary: "Share your skills, time and local knowledge.", fields: [...common, { name: "skills", label: "Skills or contribution areas", required: true }, { name: "availability", label: "Availability", required: true }, { name: "motivation", label: "Why would you like to volunteer?", type: "textarea" as const, required: true }] },
  { id: "school", label: "School engagement", summary: "Request a responsible, safeguarding-led school programme.", fields: [...common, { name: "role", label: "Your role at the school", required: true }, { name: "studentGroup", label: "Student age range and estimated number", required: true }, { name: "needs", label: "What would you like the engagement to address?", type: "textarea" as const, required: true }] },
  { id: "community", label: "Community project", summary: "Propose a locally grounded challenge and response.", fields: [...common, { name: "location", label: "Community and state", required: true }, { name: "challenge", label: "Challenge, existing assets and proposed response", type: "textarea" as const, required: true }] },
  { id: "partner", label: "Partnership", summary: "Explore programme, funding, research, technology or implementation collaboration.", fields: [...common, { name: "partnershipType", label: "Partnership area", type: "select" as const, required: true, options: ["Programme delivery", "Funding or sponsorship", "Research and learning", "Technology", "Employee volunteering", "Media and communications", "Other"] }, { name: "proposal", label: "Proposed collaboration and shared value", type: "textarea" as const, required: true }] },
];

export default function GetInvolvedPage() {
  return <main id="main-content"><PageHero eyebrow="Get involved" title="Choose how you want to create impact." description="Each pathway gathers only the information needed to understand your request and respond responsibly." tone="green" />
    <nav className="border-b border-slate-200 bg-white" aria-label="Application types"><div className="container-shell flex gap-2 overflow-x-auto py-4">{pathways.map((path) => <a key={path.id} href={`#${path.id}`} className="shrink-0 rounded-full border border-slate-300 px-4 py-2 text-sm font-bold hover:border-[var(--brand-blue)]">{path.label}</a>)}</div></nav>
    <div className="container-shell space-y-24 py-24">{pathways.map((path, index) => <section key={path.id} id={path.id} className="scroll-mt-28 grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-sm font-black text-[var(--brand-red)]">0{index + 1}</p><h2 className="mt-4 text-4xl font-bold">{path.label}</h2><p className="mt-4 text-lg leading-8 text-slate-600">{path.summary}</p></div><SmartForm kind={path.label} title={`${path.label} form`} introduction="Complete the form below. A submission is an expression of interest and does not guarantee placement or programme approval." fields={path.fields} /></section>)}</div>
  </main>;
}
