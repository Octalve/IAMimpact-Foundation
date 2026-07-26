"use client";

import Image from "next/image";
import { UserRound } from "lucide-react";
import { useState } from "react";

export function TeamPortrait({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-label={`${alt} photo placeholder`}
        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#dff3fc] to-[#a7d9ef] text-[var(--brand-deep-blue)]"
        role="img"
      >
        <UserRound aria-hidden="true" className="h-16 w-16 opacity-55" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className="object-cover object-top"
      onError={() => setFailed(true)}
    />
  );
}
