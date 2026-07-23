import { ImageIcon } from "lucide-react";

export function ImagePlaceholder({
  label,
  tone = "blue",
  className = "",
}: {
  label: string;
  tone?: "blue" | "green" | "red";
  className?: string;
}) {
  const tones = {
    blue: "from-[#dff3fc] to-[#a7d9ef] text-[#154f9d]",
    green: "from-[#e7f6e2] to-[#b9e4ae] text-[#237815]",
    red: "from-[#ffe8e9] to-[#ffc4c7] text-[#b40a12]",
  };
  return (
    <div className={`flex min-h-72 items-end bg-gradient-to-br p-6 ${tones[tone]} ${className}`} role="img" aria-label={label}>
      <div className="rounded-2xl bg-white/80 p-4 backdrop-blur">
        <ImageIcon className="mb-2 h-6 w-6" aria-hidden="true" />
        <p className="max-w-xs text-sm font-bold">{label}</p>
        <p className="mt-1 text-xs opacity-75">Replace this safe placeholder with an approved IAMimpact photograph.</p>
      </div>
    </div>
  );
}
