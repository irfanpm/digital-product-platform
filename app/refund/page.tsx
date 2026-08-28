import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 text-sm font-bold hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Checkout
        </Link>

        <div className="space-y-4 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-black text-white">Cancellation & Refund Policy</h1>
          <p className="text-slate-400 text-xs font-mono">Last Updated: January 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Digital Content Policy</h2>
            <p>
              Due to the immediate digital delivery and non-returnable nature of downloadable PDF files, Notion templates, and copy-paste prompt banks, all sales are considered final once download access has been granted.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Duplicate Charge Refund Guarantee</h2>
            <p>
              If your bank account was debited twice for a single order due to a payment gateway timeout, we will issue a 100% refund for the duplicate transaction within 5-7 working days. Please send your transaction receipt to <strong className="text-emerald-400">support@aijobkit.in</strong>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Non-Delivery Resolution</h2>
            <p>
              If you did not receive your download email within 10 minutes of payment due to a spam filter or incorrect email entry, please email us immediately or message support with your payment ID. Our team will manually re-send your files within 2 hours.
            </p>
          </section>
        </div>

      </div>
    </main>
  );
}
