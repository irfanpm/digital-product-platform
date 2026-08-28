import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 text-sm font-bold hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Checkout
        </Link>

        <div className="space-y-4 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
          <p className="text-slate-400 text-xs font-mono">Last Updated: January 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
            <p>
              When you purchase "The AI Job Application Kit", we collect your Full Name, Email Address, and Phone Number solely for the purpose of delivering your digital files and sending transaction receipts.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Payment Security</h2>
            <p>
              We do NOT store your bank account details, UPI PINs, or Credit/Debit Card numbers on our servers. All transaction details are processed by PCI-DSS compliant payment gateways (Razorpay) using 256-bit SSL encryption.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. How We Use Your Data</h2>
            <p>
              Your contact information is used strictly to fulfill your order, provide customer support, and notify you of free future updates to the kit. We never sell, rent, or trade your personal information to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Cookies & Analytics</h2>
            <p>
              We use standard analytics scripts (such as Meta Pixel) to track site visits and optimize marketing campaigns. You can disable cookies in your browser settings at any time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">5. Data Deletion Requests</h2>
            <p>
              To request deletion of your personal contact records, email us at <strong className="text-emerald-400">support@aijobkit.in</strong> with your order reference.
            </p>
          </section>
        </div>

      </div>
    </main>
  );
}
