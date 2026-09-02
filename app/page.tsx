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
import { ChatbotWidget } from '@/components/ChatbotWidget';
import { LegalFooter } from '@/components/LegalFooter';
import { ScrollReveal } from '@/components/ScrollReveal';
import { VisitorTracker } from '@/components/VisitorTracker';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-rose-500 selection:text-white relative">
      
      {/* Real-time Website Visitor & Click Tracker */}
      <VisitorTracker />

      {/* Top Urgency Sticky Deal Ticker */}
      <UrgencyBanner />

      {/* Hero Section */}
      <HeroSection />

      {/* Infinite Scrolling Ticker (GoodNotes, Notability, iPad & Android) */}
      <CompanyMarquee />

      {/* Section 1: Pain Matrix (Paper Notebooks vs All-In-One Digital Planner) */}
      <ScrollReveal delay={100}>
        <PainMatrix />
      </ScrollReveal>

      {/* Section 2: Interactive Persona Switcher (Students, Pros, Founders & Moms) */}
      <ScrollReveal delay={100}>
        <BeforeAfterCard />
      </ScrollReveal>

      {/* Section 3: Interactive Organization Savings Calculator */}
      <ScrollReveal delay={100}>
        <RoiCalculator />
      </ScrollReveal>

      {/* Section 4: 8 Core Life Operating Hubs & 5000+ Stickers Showcase */}
      <ScrollReveal delay={100}>
        <ModuleGrid />
      </ScrollReveal>

      {/* Section 5: Verified Buyer Testimonials */}
      <ScrollReveal delay={100}>
        <Testimonials />
      </ScrollReveal>

      {/* Section 6: Instant Razorpay Checkout & Direct Download */}
      <ScrollReveal delay={100}>
        <CheckoutSection />
      </ScrollReveal>

      {/* Section 7: Collapsible FAQ Accordion */}
      <ScrollReveal delay={100}>
        <FAQAccordion />
      </ScrollReveal>

      {/* Mobile Fixed CTA Dock (Hidden on Desktop) */}
      <MobileStickyCTA />

      {/* Interactive AI Customer Doubt Clearance Chatbot */}
      <ChatbotWidget />

      {/* Legal & KYC Compliance Footer */}
      <LegalFooter />

    </main>
  );
}
