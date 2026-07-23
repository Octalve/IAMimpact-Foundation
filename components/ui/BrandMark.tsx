export function BrandMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <span className={`relative block ${className}`} aria-hidden="true">
      <span className="absolute left-[45%] top-[5%] h-[42%] w-[17%] -rotate-[17deg] rounded-full bg-[var(--brand-blue)]" />
      <span className="absolute left-[25%] top-[28%] h-[13%] w-[13%] rounded-full bg-[var(--brand-deep-blue)]" />
      <span className="absolute bottom-[5%] left-[37%] h-[48%] w-[17%] rotate-[23deg] rounded-full bg-[var(--brand-red)]" />
      <span className="absolute left-[1%] top-[9%] h-[12%] w-[12%] rounded-full bg-[var(--brand-green)]" />
      <span className="absolute right-[2%] top-[9%] h-[12%] w-[12%] rounded-full bg-[var(--brand-green)]" />
      <span className="absolute left-[4%] top-[50%] h-[10%] w-[17%] rounded-full bg-[var(--brand-green)]" />
      <span className="absolute right-[3%] top-[50%] h-[10%] w-[17%] rounded-full bg-[var(--brand-green)]" />
    </span>
  );
}
