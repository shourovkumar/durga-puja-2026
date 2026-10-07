import { HeroSection } from "@/components/sections/hero-section";
import { LightDiyaSection } from "@/components/sections/light-diya-section";
import { PujaJourney } from "@/components/sections/puja-journey";

export default function Home() {
  return (
    <main className="home-main" id="main-content">
      <HeroSection />
      <PujaJourney />
      <LightDiyaSection />
    </main>
  );
}
