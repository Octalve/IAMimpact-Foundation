import { PageHero } from "./PageHero";
export function PolicyPage({title,summary,children}:{title:string;summary:string;children:React.ReactNode}){
  return <main id="main-content"><PageHero eyebrow="Trust & accountability" title={title} description={summary} tone="dark" /><section className="py-20"><div className="container-shell max-w-4xl"><div className="prose prose-slate max-w-none space-y-6 leading-8 text-slate-600">{children}</div></div></section></main>;
}
