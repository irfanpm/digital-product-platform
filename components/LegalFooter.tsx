'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, MapPin, Clock } from 'lucide-react';

export const LegalFooter: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs border-b border-slate-800 pb-8">
          
          {/* Brand Info */}
          <div className="space-y-2 md:col-span-1">
            <h4 className="text-white font-extrabold text-sm tracking-wide">
              Career Operating System
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              The AI Job Application Kit (2026 Edition) is a digital 38-page career enablement system designed to optimize resumes, pass corporate ATS filters, and automate interview preparation.
            </p>
          </div>

          {/* Delivery SLA & Compliance */}
          <div className="space-y-2">
            <h5 className="text-slate-200 font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> Digital Delivery SLA
            </h5>
            <p className="text-slate-400 leading-relaxed">
              Instant digital download link presented on screen after successful payment. Automated email dispatch in under 5 seconds.
            </p>
          </div>

          {/* Payment Gateway Trust */}
          <div className="space-y-2">
            <h5 className="text-slate-200 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Security & Gateway
            </h5>
            <p className="text-slate-400 leading-relaxed">
              Payments processed securely via Razorpay (PCI-DSS Level 1 compliant). 256-Bit SSL encrypted transaction system.
            </p>
          </div>

          {/* Contact & Merchant Info */}
          <div className="space-y-2">
            <h5 className="text-slate-200 font-bold flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-400" /> Merchant & Support
            </h5>
            <div className="space-y-1 text-slate-400">
              <p>Email: <strong className="text-slate-200">support@aijobkit.in</strong></p>
              <p className="flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-500 mt-0.5" />
                <span>Sector 62, Digital Hub, Noida, Uttar Pradesh, India - 201309</span>
              </p>
            </div>
          </div>

        </div>

        {/* Legal Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300 font-medium">
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/refund" className="hover:text-emerald-400 transition-colors">
              Cancellation & Refund Policy
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-emerald-400 transition-colors">
              Contact Us
            </Link>
          </div>

          <div className="text-slate-500 text-center sm:text-right">
            © {new Date().getFullYear()} AI Job Application Kit. All rights reserved. Not affiliated with OpenAI, LinkedIn, or Google.
          </div>

        </div>

      </div>
    </footer>
  );
};
