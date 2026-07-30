"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import type { AdminNavigationItem } from "./admin-navigation";

type AdminTopbarProps = {
  navigation: AdminNavigationItem[];
  onOpenNavigation: () => void;
};

export function AdminTopbar({
  navigation,
  onOpenNavigation,
}: AdminTopbarProps) {
  const pathname = usePathname();
  const current =
    [...navigation]
      .sort((a, b) => b.href.length - a.href.length)
      .find(({ href }) =>
        href === "/admin"
          ? pathname === href
          : pathname === href || pathname.startsWith(`${href}/`),
      ) ?? navigation[0];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl lg:hidden">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={onOpenNavigation}
          aria-label="Open admin navigation"
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <p className="truncate text-sm font-black text-slate-950">
            {current?.label ?? "Administration"}
          </p>
          <p className="truncate text-xs font-semibold text-slate-500">
            IAMimpact Admin
          </p>
        </div>
      </div>
    </header>
  );
}
