import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 text-sm font-bold hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Checkout
        </Link>

        <div className="space-y-4 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-black text-white">Contact & Support</h1>
          <p className="text-slate-400 text-xs font-mono">We reply to all support queries within 2 hours.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
            <Mail className="w-6 h-6 text-emerald-400" />
            <h3 className="text-white font-bold text-base">Support Email</h3>
            <p className="text-slate-300 text-xs font-mono">support@aijobkit.in</p>
            <p className="text-slate-400 text-[11px]">Instant file re-delivery & technical assistance</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
            <Phone className="w-6 h-6 text-emerald-400" />
            <h3 className="text-white font-bold text-base">WhatsApp Helpline</h3>
            <p className="text-slate-300 text-xs font-mono">+91 98765 43210</p>
            <p className="text-slate-400 text-[11px]">Mon-Sat: 10:00 AM - 7:00 PM IST</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
            <MapPin className="w-6 h-6 text-emerald-400" />
            <h3 className="text-white font-bold text-base">Registered Office</h3>
            <p className="text-slate-400 text-xs">
              Sector 62, Digital Hub, Noida, Uttar Pradesh, India - 201309
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
