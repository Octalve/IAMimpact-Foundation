import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ArrowLink({
  href,
  children,
  inverse = false,
}: {
  href: string;
  children: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <Link
      href={href}
      style={inverse ? { color: "#303030" } : undefined}
      className={`group inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-bold transition ${
        inverse
          ? "bg-white text-[var(--brand-ink)] hover:bg-[var(--brand-mist)]"
          : "bg-[var(--brand-ink)] text-white hover:bg-[var(--brand-deep-blue)]"
      }`}
    >
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}
