"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardCheck,
  LayoutDashboard,
  ScrollText,
  ShieldCheck,
  UsersRound,
  X,
} from "lucide-react";
import type { AdminNavigationItem } from "./admin-navigation";
import { SignOutButton } from "./SignOutButton";

type AdminSidebarProps = {
  email: string;
  roleLabel: string;
  navigation: AdminNavigationItem[];
  mobile?: boolean;
  onClose?: () => void;
};

function isActive(pathname: string, href: string) {
  return href === "/admin"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

const navigationIcons = {
  overview: LayoutDashboard,
  registrations: UsersRound,
  "check-in": ClipboardCheck,
  staff: ShieldCheck,
  audit: ScrollText,
};

export function AdminSidebar({
  email,
  roleLabel,
  navigation,
  mobile = false,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={[
        "flex h-full flex-col bg-[#0a1830] text-white",
        mobile
          ? "w-[19rem] max-w-[86vw] shadow-2xl"
          : "w-full border-r border-white/10",
      ].join(" ")}
      aria-label="Admin sidebar"
    >
      <div className="flex h-24 items-center justify-between border-b border-white/10 px-6">
        <Link href="/admin" onClick={onClose} className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#123f82] text-sm font-black text-white shadow-lg shadow-black/20">
            IAM
          </span>
          <span>
            <span className="block text-base font-black tracking-tight">
              IAMimpact Admin
            </span>
            <span className="block text-[0.68rem] font-bold uppercase tracking-[0.2em] text-blue-200">
              {roleLabel}
            </span>
          </span>
        </Link>

        {mobile ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close admin navigation"
            className="grid h-10 w-10 place-items-center rounded-xl text-blue-100 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      <nav aria-label="Admin navigation" className="flex-1 overflow-y-auto px-4 py-6">
        <p className="px-3 text-[0.68rem] font-black uppercase tracking-[0.2em] text-slate-400">
          Navigation
        </p>
        <div className="mt-3 space-y-1.5">
          {navigation.map(({ href, label, description, icon }) => {
            const active = isActive(pathname, href);
            const Icon = navigationIcons[icon];

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={[
                  "group flex items-center gap-3 rounded-xl px-3 py-3 transition",
                  active
                    ? "bg-[#1d56b3] text-white shadow-lg shadow-black/20"
                    : "text-slate-200 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                <span
                  className={[
                    "grid h-10 w-10 shrink-0 place-items-center rounded-lg transition",
                    active
                      ? "bg-white/15 text-white"
                      : "bg-white/5 text-slate-300 group-hover:bg-white/10",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-black">{label}</span>
                  <span
                    className={[
                      "mt-0.5 block truncate text-xs font-medium",
                      active ? "text-blue-100" : "text-slate-400",
                    ].join(" ")}
                  >
                    {description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="mb-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="truncate text-sm font-bold text-white">{email}</p>
          <p className="mt-1 text-xs font-semibold text-blue-200">{roleLabel}</p>
        </div>
        <SignOutButton variant="sidebar" />
      </div>
    </aside>
  );
}
