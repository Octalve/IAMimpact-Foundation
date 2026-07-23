export function PageHero({
  eyebrow,
  title,
  description,
  tone = "blue",
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "blue" | "green" | "red" | "dark";
}) {
  const tones = {
    blue: "bg-[#e7f5fb]",
    green: "bg-[#eaf7e7]",
    red: "bg-[#fff0f1]",
    dark: "bg-[#17212a] text-white",
  };
  return (
    <section className={`${tones[tone]} py-20 sm:py-28`}>
      <div className="container-shell">
        <p className={`eyebrow ${tone === "dark" ? "text-[#9ce08e]" : ""}`}>{eyebrow}</p>
        <h1 className="mt-7 max-w-5xl text-[clamp(3.2rem,8vw,7rem)] font-bold leading-[.88] tracking-[-.07em]">{title}</h1>
        <p className={`mt-8 max-w-2xl text-lg leading-8 ${tone === "dark" ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
      </div>
    </section>
  );
}
