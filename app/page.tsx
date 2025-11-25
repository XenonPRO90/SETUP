import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { SetupPointsSection } from '@/components/sections/SetupPointsSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { PartnerSection } from '@/components/sections/PartnerSection';
import { LevelUpSection } from '@/components/sections/LevelUpSection';
import { QuickStartSection } from '@/components/sections/QuickStartSection';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <SetupPointsSection />
      <PricingSection />
      <PartnerSection />
      <LevelUpSection />
      <QuickStartSection />
      <CTASection />
      <Footer />
    </main>
  );
}
