'use client';

import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';

export const MobileStickyCTA: React.FC = () => {
  const scrollToCheckout = () => {
    const el = document.getElementById('checkout-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 border-t border-slate-200 p-3 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        
        {/* Left price info */}
        <div>
          <div className="flex items-center gap-1">
            <span className="text-slate-900 font-extrabold text-lg font-mono">₹199</span>
            <span className="text-slate-400 text-xs line-through">₹999</span>
          </div>
          <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
            Limited Offer
          </span>
        </div>

        {/* Right CTA Button */}
        <button
          onClick={scrollToCheckout}
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Get Instant Access</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
