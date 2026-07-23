import { ArrowLink } from "@/components/ui/ArrowLink";

export function CommunityInvitation() {
  return (
    <section className="relative overflow-hidden bg-[#eef8eb] py-24 sm:py-32">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[55px] border-white/60" />
      <div className="container-shell relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="eyebrow">Join the community</p>
          <h2 className="section-title mt-6">
            You do not have to wait to become an impact.
          </h2>
          <p className="body-copy mt-7 max-w-2xl text-lg">
            Volunteer, bring IAMimpact to a school, propose a community project
            or explore a partnership.
          </p>
        </div>
        <ArrowLink href="/get-involved">Choose your pathway</ArrowLink>
      </div>
    </section>
  );
}
