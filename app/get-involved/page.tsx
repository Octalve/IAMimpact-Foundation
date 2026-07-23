import type { Metadata } from "next";
import { Building2, GraduationCap, HandHeart, Handshake, Users } from "lucide-react";
import { PageHero } from "@/features/shared/PageHero";

export const metadata: Metadata = { title: "Get Involved" };
const paths=[{icon:HandHeart,title:"Volunteer",text:"Contribute useful time, skills and community knowledge."},{icon:GraduationCap,title:"Request a school engagement",text:"Express interest in bringing a future-readiness programme to a school."},{icon:Building2,title:"Propose a community project",text:"Help us understand a local challenge and existing community capacity."},{icon:Handshake,title:"Partner with us",text:"Explore programme, research, technology or implementation collaboration."},{icon:Users,title:"Join the community",text:"Receive verified updates and participate in future IAMimpact activities."}];
export default function GetInvolvedPage(){
  return <main id="main-content"><PageHero eyebrow="Get involved" title="Choose how you want to become an impact." description="Our participation pathways are designed around contribution, dignity and shared responsibility." tone="green" />
    <section className="py-24"><div className="container-shell grid gap-5 md:grid-cols-2">{paths.map((path,index)=><article key={path.title} className={`rounded-[2rem] p-8 ${index===4?"bg-[var(--brand-deep-blue)] text-white md:col-span-2":"border border-[var(--brand-line)]"}`}><path.icon className={`h-8 w-8 ${index===4?"text-[#a9e39d]":"text-[var(--brand-blue)]"}`} /><h2 className="mt-10 text-3xl font-bold">{path.title}</h2><p className={`mt-4 max-w-xl leading-7 ${index===4?"text-blue-100":"text-slate-600"}`}>{path.text}</p><button type="button" disabled className="mt-7 cursor-not-allowed rounded-full bg-slate-200 px-5 py-3 text-sm font-bold text-slate-500">Applications opening soon</button></article>)}</div></section>
  </main>;
}
