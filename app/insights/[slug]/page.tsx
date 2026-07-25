import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredInsights, getInsight } from "@/content/insights";

export function generateStaticParams() {
  return featuredInsights.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  return insight
    ? { title: insight.title, description: insight.excerpt }
    : { title: "Insight not found" };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  return (
    <main id="main-content">
      <article>
        <header className="bg-[#17212a] py-24 text-white">
          <div className="container-shell">
            <p className="text-sm font-black uppercase tracking-[.16em] text-[#a9e39d]">{insight.category}</p>
            <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[.95] tracking-[-.05em] sm:text-7xl">{insight.title}</h1>
            <p className="mt-7 text-sm font-semibold text-slate-300">{insight.date} · {insight.readTime}</p>
          </div>
        </header>
        <div className="container-shell py-20">
          <div className="max-w-3xl">
            <p className="text-xl font-semibold leading-9 text-slate-700">{insight.excerpt}</p>
            <div className="mt-10 space-y-7 text-lg leading-9 text-slate-600">
              {insight.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <Link href="/insights" className="mt-12 inline-block font-bold text-[var(--brand-deep-blue)]">← Back to insights</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
