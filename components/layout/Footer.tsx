import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Logo } from "../ui/Logo";

export function Footer() {
  return (
    <footer className="bg-[#17212a] text-white">
      <div className="container-shell grid gap-12 py-16 lg:grid-cols-[1.3fr_.8fr_.8fr_.8fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-sm text-sm leading-7 text-slate-300">
            Inspiring people. Advancing communities. Multiplying impact.
          </p>
          <div className="mt-6 flex gap-2">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, index) => (
              <span
                key={index}
                className="rounded-full border border-white/20 p-2 text-slate-300"
                aria-hidden="true"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-bold">Explore</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            <Link href="/who-we-are">Who We Are</Link>
            <Link href="/what-we-do">What We Do</Link>
            <Link href="/programmes">Programmes</Link>
            <Link href="/our-impact">Our Impact</Link>
          </div>
        </div>
        <div>
          <h2 className="font-bold">Participate</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            <Link href="/events">Events</Link>
            <Link href="/get-involved">Volunteer</Link>
            <Link href="/get-involved">Partner with us</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h2 className="font-bold">Trust</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            <Link href="/safeguarding">Safeguarding</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/accessibility">Accessibility</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-3 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 IAMimpact Foundation. All rights reserved.</p>
          <p>I am impact. You are impact. Together, we multiply impact.</p>
        </div>
      </div>
    </footer>
  );
}
