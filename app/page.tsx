import { CommunityInvitation } from "@/features/home/CommunityInvitation";
import { CorePillars } from "@/features/home/CorePillars";
import { FeaturedProgrammes } from "@/features/home/FeaturedProgrammes";
import { Hero } from "@/features/home/Hero";
import { ImpactIntroduction } from "@/features/home/ImpactIntroduction";
import { StoriesOfImpact } from "@/features/home/StoriesOfImpact";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <ImpactIntroduction />
      <CorePillars />
      <FeaturedProgrammes />
      <StoriesOfImpact />
      <CommunityInvitation />
    </main>
  );
}
