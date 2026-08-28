import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 text-sm font-bold hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Checkout
        </Link>

        <div className="space-y-4 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-black text-white">Terms & Conditions</h1>
          <p className="text-slate-400 text-xs font-mono">Last Updated: January 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Product Overview</h2>
            <p>
              "The AI Job Application Kit (Career Operating System)" is a digital product consisting of downloadable PDF guides, AI prompt templates, resume frameworks, and interactive dashboard links priced at ₹299 INR (or ₹398 INR with the template add-on).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Digital Goods Delivery</h2>
            <p>
              Upon successful payment processed via our payment gateway (Razorpay), customers are granted immediate digital access. Download links are displayed on screen instantly and sent to the provided email address within 5 seconds.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Intellectual Property Rights</h2>
            <p>
              All content, templates, prompts, and frameworks contained in this kit are protected by copyright. Purchasing grants you a non-exclusive, non-transferable personal license. Reselling, distributing, or sharing these materials publicly is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Earnings & Outcome Disclaimer</h2>
            <p>
              While our prompts and templates are designed according to industry ATS standards and recruiting best practices, individual job interview calls and salary outcomes depend on market demand, personal qualifications, and execution.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">5. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Gautam Buddha Nagar / Noida, Uttar Pradesh, India.
            </p>
          </section>
        </div>

      </div>
    </main>
  );
}
