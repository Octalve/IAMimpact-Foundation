"use client";

import { useEffect, useState } from "react";

function getRemaining(target: string) {
  const distance = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export function EventCountdown({ startAt }: { startAt: string }) {
  const [remaining, setRemaining] = useState(() => getRemaining(startAt));
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining(startAt)), 1000);
    return () => window.clearInterval(timer);
  }, [startAt]);
  return (
    <div className="grid grid-cols-4 gap-2" aria-label="Time until event">
      {Object.entries(remaining).map(([label, value]) => (
        <div key={label} className="rounded-2xl bg-white/10 p-3 text-center">
          <strong className="block text-2xl sm:text-3xl">{String(value).padStart(2, "0")}</strong>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100">{label}</span>
        </div>
      ))}
    </div>
  );
}
