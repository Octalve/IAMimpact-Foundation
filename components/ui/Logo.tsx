import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="relative block h-12 w-[198px] overflow-hidden"
      aria-label="IAMimpact Foundation home"
    >
      <Image
        src={light ? "/brand/iamimpact-logo-cropped.png" : "/brand/iamimpact-logo.png"}
        alt=""
        fill
        sizes="198px"
        className="object-contain"
        priority
      />
    </Link>
  );
}
