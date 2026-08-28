import React from 'react';
import { UrgencyBanner } from '@/components/UrgencyBanner';
import { HeroSection } from '@/components/HeroSection';
import { PainMatrix } from '@/components/PainMatrix';
import { BeforeAfterCard } from '@/components/BeforeAfterCard';
import { RoiCalculator } from '@/components/RoiCalculator';
import { ModuleGrid } from '@/components/ModuleGrid';
import { Testimonials } from '@/components/Testimonials';
import { CheckoutSection } from '@/components/CheckoutSection';
import { FAQAccordion } from '@/components/FAQAccordion';
import { MobileStickyCTA } from '@/components/MobileStickyCTA';
import { LegalFooter } from '@/components/LegalFooter';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-emerald-500 selection:text-white pb-16 md:pb-0">
      
      {/* 1. Sticky Urgency Banner */}
      <UrgencyBanner />

      {/* 2. Scribblit/Notely Style Hero Section with Interactive PDF Preview */}
      <HeroSection />

      {/* 3. Pain Matrix (Manual Applying vs 38-Page System) */}
      <PainMatrix />

      {/* 4. Interactive Before vs After ATMR Card (PDF Section 2 Data) */}
      <BeforeAfterCard />

      {/* 5. ROI & Cost of Delay Calculator */}
      <RoiCalculator />

      {/* 6. All 18 Sections Master Architecture Grid */}
      <ModuleGrid />

      {/* 7. Social Proof Testimonials */}
      <Testimonials />

      {/* 8. High-Trust Dynamic Checkout Section */}
      <CheckoutSection />

      {/* 9. Objection Crushers FAQ Accordion */}
      <FAQAccordion />

      {/* 10. Legal & Gateway Compliance Footer */}
      <LegalFooter />

      {/* 11. Mobile Floating Conversion Dock */}
      <MobileStickyCTA />

    </main>
  );
}
