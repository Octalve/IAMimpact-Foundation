"use client";

import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "../ui/Logo";

type MenuItem = {
  label: string;
  href: string;
  description?: string;
};

type MenuGroup = {
  label: string;
  href: string;
  items: MenuItem[];
  featured?: boolean;
};

const menuGroups: MenuGroup[] = [
  {
    label: "Who We Are",
    href: "/who-we-are",
    items: [
      { label: "About IAMimpact", href: "/who-we-are" },
      { label: "Our Story", href: "/who-we-are#our-story" },
      { label: "Mission, Vision & Values", href: "/who-we-are#mission-vision-values" },
      { label: "Leadership & Team", href: "/who-we-are#leadership" },
      { label: "Our Partners", href: "/who-we-are#partners" },
    ],
  },
  {
    label: "What We Do",
    href: "/what-we-do",
    items: [
      { label: "What We Do", href: "/what-we-do" },
      { label: "Education & Future Readiness", href: "/what-we-do#education" },
      { label: "Digital Inclusion & Innovation", href: "/what-we-do#digital-inclusion" },
      { label: "Climate & Sustainable Communities", href: "/what-we-do#climate" },
      { label: "Leadership & Contextual Intelligence", href: "/what-we-do#leadership" },
      { label: "Community Development & Service", href: "/what-we-do#community-development" },
    ],
  },
  {
    label: "Programmes",
    href: "/programmes",
    featured: true,
    items: [
      {
        label: "IAM Future Schools",
        href: "/programmes#iam-future-schools",
        description: "Preparing young people for learning, work and the future.",
      },
      {
        label: "IAM Digital",
        href: "/programmes#iam-digital",
        description: "Expanding access to useful digital skills and innovation.",
      },
      {
        label: "IAM Contextual Intelligence",
        href: "/programmes#iam-contextual-intelligence",
        description: "Building thoughtful leaders who understand their communities.",
      },
      { label: "All Programmes", href: "/programmes" },
      { label: "Upcoming Programmes", href: "/programmes#upcoming" },
      { label: "Programme Locations", href: "/programmes#locations" },
      { label: "Propose a Programme", href: "/get-involved#propose-a-programme" },
    ],
  },
  {
    label: "Impact & Insights",
    href: "/our-impact",
    items: [
      { label: "Our Impact", href: "/our-impact" },
      { label: "Stories of Impact", href: "/our-impact#stories" },
      { label: "Reports & Publications", href: "/our-impact#reports" },
      { label: "Insights & News", href: "/insights" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    items: [
      { label: "Get Involved", href: "/get-involved" },
      { label: "Become a Volunteer", href: "/get-involved/volunteer" },
      { label: "Partner With Us", href: "/get-involved/partner" },
      { label: "Sponsor a Programme", href: "/get-involved/sponsor" },
      { label: "Donate", href: "/get-involved/donate" },
      { label: "Careers", href: "/get-involved/careers" },
    ],
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setDesktopOpen(null);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDesktopOpen(null);
        setMobileOpen(false);
        setMobileSection(null);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function closeMobileMenu() {
    setMobileOpen(false);
    setMobileSection(null);
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur"
    >
      <div className="container-shell flex min-h-20 items-center justify-between gap-4">
        <Logo />

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {menuGroups.map((group) => {
            const isOpen = desktopOpen === group.label;

            return (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setDesktopOpen(group.label)}
                onMouseLeave={() => setDesktopOpen(null)}
              >
                <div className="flex items-center">
                  <Link
                    href={group.href}
                    className="rounded-l-full py-3 pl-3 text-sm font-semibold text-slate-700 transition hover:text-[var(--brand-blue)]"
                    onFocus={() => setDesktopOpen(group.label)}
                  >
                    {group.label}
                  </Link>
                  <button
                    type="button"
                    className="rounded-r-full py-3 pl-1 pr-2 text-slate-500 transition hover:text-[var(--brand-blue)]"
                    aria-label={`Open ${group.label} menu`}
                    aria-expanded={isOpen}
                    onClick={() =>
                      setDesktopOpen(isOpen ? null : group.label)
                    }
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {isOpen && (
                  <div
                    className={
                      group.featured
                        ? "absolute left-1/2 top-full w-[min(760px,90vw)] -translate-x-1/2 pt-3"
                        : "absolute left-0 top-full w-72 pt-3"
                    }
                  >
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10">
                      {group.featured ? (
                        <div className="grid gap-2 md:grid-cols-2">
                          <div className="rounded-2xl bg-[var(--brand-blue)] p-5 text-white">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                              Featured programmes
                            </p>
                            <div className="mt-3 grid gap-1">
                              {group.items.slice(0, 3).map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setDesktopOpen(null)}
                                  className="rounded-xl p-3 transition hover:bg-white/10"
                                >
                                  <span className="block font-bold">
                                    {item.label}
                                  </span>
                                  <span className="mt-1 block text-xs leading-5 text-white/75">
                                    {item.description}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div className="p-2">
                            <p className="px-3 pt-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                              Explore
                            </p>
                            <div className="mt-2 grid gap-1">
                              {group.items.slice(3).map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setDesktopOpen(null)}
                                  className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[var(--brand-blue)]"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid gap-1">
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setDesktopOpen(null)}
                              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[var(--brand-blue)]"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/contact"
            className="rounded-full px-3 py-3 text-sm font-semibold text-slate-700 transition hover:text-[var(--brand-blue)]"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
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
          onClick={() => setMobileOpen((current) => !current)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 py-5 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="container-shell grid gap-1">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="rounded-xl px-4 py-3 font-semibold hover:bg-slate-50"
            >
              Home
            </Link>

            {menuGroups.map((group) => {
              const isOpen = mobileSection === group.label;

              return (
                <div key={group.label}>
                  <div className="flex items-center rounded-xl hover:bg-slate-50">
                    <Link
                      href={group.href}
                      onClick={closeMobileMenu}
                      className="min-w-0 flex-1 px-4 py-3 font-semibold"
                    >
                      {group.label}
                    </Link>
                    <button
                      type="button"
                      className="p-3"
                      aria-label={`Open ${group.label} menu`}
                      aria-expanded={isOpen}
                      onClick={() =>
                        setMobileSection(isOpen ? null : group.label)
                      }
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {isOpen && (
                    <div className="ml-4 grid gap-1 border-l border-slate-200 py-2 pl-3">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMobileMenu}
                          className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[var(--brand-blue)]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="rounded-xl px-4 py-3 font-semibold hover:bg-slate-50"
            >
              Contact
            </Link>
            <Link
              href="/search"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold hover:bg-slate-50"
            >
              <Search className="h-5 w-5" />
              Search
            </Link>
            <Link
              href="/get-involved"
              onClick={closeMobileMenu}
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
