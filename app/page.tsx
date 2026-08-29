'use client';

import React from 'react';
import { UrgencyBanner } from '@/components/UrgencyBanner';
import { HeroSection } from '@/components/HeroSection';
import { CompanyMarquee } from '@/components/CompanyMarquee';
import { PainMatrix } from '@/components/PainMatrix';
import { BeforeAfterCard } from '@/components/BeforeAfterCard';
import { RoiCalculator } from '@/components/RoiCalculator';
import { ModuleGrid } from '@/components/ModuleGrid';
import { Testimonials } from '@/components/Testimonials';
import { CheckoutSection } from '@/components/CheckoutSection';
import { FAQAccordion } from '@/components/FAQAccordion';
import { MobileStickyCTA } from '@/components/MobileStickyCTA';
import { LegalFooter } from '@/components/LegalFooter';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-emerald-500 selection:text-white relative">
      
      {/* Top Urgency Sticky Deal Ticker */}
      <UrgencyBanner />

      {/* Hero Section */}
      <HeroSection />

      {/* Infinite Scrolling Ticker (Company & ATS Badges) */}
      <CompanyMarquee />

      {/* Section 1: Pain Matrix (Old Way vs 38-Page AI System) */}
      <ScrollReveal delay={100}>
        <PainMatrix />
      </ScrollReveal>

      {/* Section 2: Before & After Real ATMR Resume Bullets */}
      <ScrollReveal delay={100}>
        <BeforeAfterCard />
      </ScrollReveal>

      {/* Section 3: Interactive Salary ROI Calculator */}
      <ScrollReveal delay={100}>
        <RoiCalculator />
      </ScrollReveal>

      {/* Section 4: All 18 Sections Grid Breakdown */}
      <ScrollReveal delay={100}>
        <ModuleGrid />
      </ScrollReveal>

      {/* Section 5: Verified Buyer Testimonials */}
      <ScrollReveal delay={100}>
        <Testimonials />
      </ScrollReveal>

      {/* Section 6: Instant 1-Click Order Bump & Razorpay Checkout */}
      <ScrollReveal delay={100}>
        <CheckoutSection />
      </ScrollReveal>

      {/* Section 7: Collapsible FAQ Accordion */}
      <ScrollReveal delay={100}>
        <FAQAccordion />
      </ScrollReveal>

      {/* Mobile Fixed CTA Dock (Hidden on Desktop) */}
      <MobileStickyCTA />

      {/* Legal & KYC Compliance Footer */}
      <LegalFooter />

    </main>
  );
}
