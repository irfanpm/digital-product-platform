'use client';

import React, { useState } from 'react';
import { MessageCircle, X, HelpCircle, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const SupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-4 py-3 rounded-full shadow-2xl border border-slate-700 flex items-center gap-2 transition-all transform hover:scale-105 cursor-pointer animate-float-slow"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>Have Questions? Chat Support</span>
        </button>
      )}

      {/* Support Micro-Modal */}
      {isOpen && (
        <div className="clean-card rounded-3xl p-5 bg-white border border-slate-200 shadow-2xl max-w-sm w-[340px] space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                <HelpCircle className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900 text-sm">Instant Help & Support</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> How do I get the PDF kit?
              </span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Instant download on screen right after payment + emailed to your inbox in &lt;5 seconds.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Is there any monthly fee?
              </span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                No monthly fees! One-time payment of ₹199 for full lifetime access and free updates.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-center">
            <a
              href="mailto:support@aijobkit.in"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Email Support (support@aijobkit.in)</span>
            </a>
          </div>

        </div>
      )}

    </div>
  );
};
