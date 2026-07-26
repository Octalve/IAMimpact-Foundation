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
      { label: "Leadership & Team", href: "/who-we-are#leadership" },
    ],
  },
  {
    label: "Programmes",
    href: "/programmes",
    featured: true,
    items: [
      {
        label: "IAM Future Schools",
        href: "/programmes/future-schools",
        description:
          "Preparing young people for learning, work and the future.",
      },
      {
        label: "IAM Digital",
        href: "/programmes/iam-digital",
        description:
          "Expanding access to useful digital skills and innovation.",
      },
      {
        label: "IAM Contextual Intelligence",
        href: "/programmes/contextual-intelligence",
        description:
          "Building thoughtful leaders who understand their communities.",
      },
      {
        label: "All Programmes",
        href: "/programmes",
      },
      {
        label: "Upcoming Programmes",
        href: "/events",
      },
    ],
  },
  {
    label: "Impact & Insights",
    href: "/our-impact",
    items: [
      { label: "Our Impact", href: "/our-impact" },
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
      { label: "Partner With Us", href: "/get-involved/partnership" },
      { label: "Sponsor a Programme", href: "/contact" },
      { label: "Careers", href: "/contact" },
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
      <div className="container-shell flex min-h-20 items-center justify-between gap-3">
        <div className="shrink-0">
          <Logo />
        </div>

        <nav
          className="hidden min-w-0 items-center justify-center gap-0.5 xl:flex"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="shrink-0 whitespace-nowrap rounded-full px-2.5 py-3 text-sm font-semibold text-slate-700 transition hover:text-[var(--brand-blue)] 2xl:px-3"
          >
            Home
          </Link>

          {menuGroups.slice(0, 1).map((group) => {
            const isOpen = desktopOpen === group.label;

            return (
              <div
                key={group.label}
                className="relative shrink-0"
                onMouseEnter={() => setDesktopOpen(group.label)}
                onMouseLeave={() => setDesktopOpen(null)}
              >
                <div className="flex items-center">
                  <Link
                    href={group.href}
                    className="whitespace-nowrap rounded-l-full py-3 pl-2.5 text-sm font-semibold text-slate-700 transition hover:text-[var(--brand-blue)] 2xl:pl-3"
                    onFocus={() => setDesktopOpen(group.label)}
                  >
                    {group.label}
                  </Link>

                  <button
                    type="button"
                    className="rounded-r-full py-3 pl-1 pr-1.5 text-slate-500 transition hover:text-[var(--brand-blue)] 2xl:pr-2"
                    aria-label={`Open ${group.label} menu`}
                    aria-expanded={isOpen}
                    onClick={() => setDesktopOpen(isOpen ? null : group.label)}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {isOpen && (
                  <div className="absolute left-0 top-full w-72 pt-3">
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10">
                      <div className="grid gap-1">
                        {group.items.map((item) => (
                          <Link
                            key={`${item.label}-${item.href}`}
                            href={item.href}
                            onClick={() => setDesktopOpen(null)}
                            className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[var(--brand-blue)]"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/what-we-do"
            className="shrink-0 whitespace-nowrap rounded-full px-2.5 py-3 text-sm font-semibold text-slate-700 transition hover:text-[var(--brand-blue)] 2xl:px-3"
          >
            What We Do
          </Link>

          {menuGroups.slice(1).map((group) => {
            const isOpen = desktopOpen === group.label;

            return (
              <div
                key={group.label}
                className="relative shrink-0"
                onMouseEnter={() => setDesktopOpen(group.label)}
                onMouseLeave={() => setDesktopOpen(null)}
              >
                <div className="flex items-center">
                  <Link
                    href={group.href}
                    className="whitespace-nowrap rounded-l-full py-3 pl-2.5 text-sm font-semibold text-slate-700 transition hover:text-[var(--brand-blue)] 2xl:pl-3"
                    onFocus={() => setDesktopOpen(group.label)}
                  >
                    {group.label}
                  </Link>

                  <button
                    type="button"
                    className="rounded-r-full py-3 pl-1 pr-1.5 text-slate-500 transition hover:text-[var(--brand-blue)] 2xl:pr-2"
                    aria-label={`Open ${group.label} menu`}
                    aria-expanded={isOpen}
                    onClick={() => setDesktopOpen(isOpen ? null : group.label)}
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
                        : group.label === "Get Involved"
                          ? "absolute right-0 top-full w-72 pt-3"
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
                                  key={`${item.label}-${item.href}`}
                                  href={item.href}
                                  onClick={() => setDesktopOpen(null)}
                                  className="rounded-xl p-3 transition hover:bg-white/10"
                                >
                                  <span className="block font-bold">
                                    {item.label}
                                  </span>

                                  {item.description && (
                                    <span className="mt-1 block text-xs leading-5 text-white/75">
                                      {item.description}
                                    </span>
                                  )}
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
                                  key={`${item.label}-${item.href}`}
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
                              key={`${item.label}-${item.href}`}
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
            className="shrink-0 whitespace-nowrap rounded-full px-2.5 py-3 text-sm font-semibold text-slate-700 transition hover:text-[var(--brand-blue)] 2xl:px-3"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden shrink-0 items-center gap-1.5 xl:flex 2xl:gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="rounded-full p-2.5 transition hover:bg-slate-100"
          >
            <Search className="h-5 w-5" />
          </Link>

          <Link
            href="/get-involved"
            className="whitespace-nowrap rounded-full bg-[var(--brand-red)] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#c90b14] 2xl:px-5"
          >
            Join IAMimpact
          </Link>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-full p-3 xl:hidden"
          onClick={() => setMobileOpen((current) => !current)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={
            mobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 py-5 xl:hidden"
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

            {menuGroups.slice(0, 1).map((group) => {
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
                      aria-label={`${isOpen ? "Close" : "Open"} ${
                        group.label
                      } menu`}
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
                          key={`${item.label}-${item.href}`}
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
              href="/what-we-do"
              onClick={closeMobileMenu}
              className="rounded-xl px-4 py-3 font-semibold hover:bg-slate-50"
            >
              What We Do
            </Link>

            {menuGroups.slice(1).map((group) => {
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
                      aria-label={`${isOpen ? "Close" : "Open"} ${
                        group.label
                      } menu`}
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
                          key={`${item.label}-${item.href}`}
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
