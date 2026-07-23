import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

const programmes: Record<string,{title:string;summary:string;audience:string}> = {
  "future-schools": {title:"IAM Future Schools",summary:"An integrated school-engagement programme connecting future readiness, digital literacy, climate awareness, leadership and community service.",audience:"Secondary-school students, educators and school communities."},
  "iam-digital": {title:"IAM Digital",summary:"Practical digital skills, AI awareness, safety and responsible technology use for education, work and enterprise.",audience:"Students, young people, teachers and community members."},
  "iam-climate": {title:"IAM Climate",summary:"Climate education that helps young people understand environmental challenges and design meaningful local action.",audience:"Schools, youth groups and local communities."},
  "iam-community": {title:"IAM Community",summary:"A listening-first model for identifying local priorities, mobilising volunteers and co-designing useful responses.",audience:"Community leaders, volunteers, schools and underserved groups."},
  "contextual-intelligence": {title:"IAM Contextual Intelligence & Leadership",summary:"A leadership-development pathway focused on critical thinking, context, communication, ethics and consequences.",audience:"Emerging leaders, students, founders and volunteers."},
  "iamimpact-clubs": {title:"IAMimpact Clubs",summary:"Student-led chapters that sustain learning and transform ideas into school and community impact projects.",audience:"Secondary schools and youth communities."},
};

export function generateStaticParams(){ return Object.keys(programmes).map(slug=>({slug})); }

export default async function ProgrammePage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const programme=programmes[slug]; if(!programme) notFound();
  return <main id="main-content">
    <section className="bg-[#17212a] py-24 text-white"><div className="container-shell"><p className="text-sm font-bold uppercase tracking-[.2em] text-[#9ce08e]">Programme concept</p><h1 className="mt-6 max-w-5xl text-6xl font-bold leading-[.9] tracking-[-.06em] sm:text-8xl">{programme.title}</h1><p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">{programme.summary}</p></div></section>
    <section className="py-24"><div className="container-shell grid gap-12 lg:grid-cols-2 lg:items-center"><ImagePlaceholder tone="blue" label={`Suggested image for ${programme.title}`} className="min-h-[520px] rounded-[2.5rem]" /><div><p className="eyebrow">Who it is for</p><h2 className="mt-6 text-4xl font-bold tracking-tight">{programme.audience}</h2><p className="body-copy mt-6">The detailed curriculum, eligibility, locations and delivery dates will be published after programme validation and safeguarding review.</p><div className="mt-8"><ArrowLink href="/get-involved">Register interest</ArrowLink></div></div></div></section>
  </main>;
}
