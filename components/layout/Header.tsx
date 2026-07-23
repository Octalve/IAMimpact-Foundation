"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "../ui/Logo";

const navigation = [
  ["Home", "/"],
  ["Who We Are", "/who-we-are"],
  ["What We Do", "/what-we-do"],
  ["Programmes", "/programmes"],
  ["Our Impact", "/our-impact"],
  ["Insights", "/insights"],
  ["Get Involved", "/get-involved"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="container-shell flex min-h-20 items-center justify-between gap-6">
        <Logo />
        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Main navigation"
        >
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-semibold text-slate-700 transition hover:text-[var(--brand-blue)]"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/search"
            aria-label="Search"
            className="rounded-full p-3 hover:bg-slate-100"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/get-involved"
            className="rounded-full bg-[var(--brand-red)] px-5 py-3 text-sm font-bold text-white hover:bg-[#c90b14]"
          >
            Join IAMimpact
          </Link>
        </div>
        <button
          type="button"
          className="rounded-full p-3 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          className="border-t border-slate-200 bg-white px-4 py-5 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="container-shell grid gap-1">
            {navigation.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-semibold hover:bg-slate-50"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/events"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 font-semibold hover:bg-slate-50"
            >
              Events
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 font-semibold hover:bg-slate-50"
            >
              Contact
            </Link>
            <Link
              href="/get-involved"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-[var(--brand-red)] px-5 py-3 text-center font-bold text-white"
            >
              Join IAMimpact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
