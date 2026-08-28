'use client';

import React, { useState, useEffect } from 'react';
import { Zap, Clock, ShieldCheck } from 'lucide-react';

export const UrgencyBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 15, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('checkout-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-slate-900 text-white py-2.5 px-4 shadow-sm border-b border-slate-800 backdrop-blur-md bg-opacity-95">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm font-medium">
        
        {/* Left Side Hook */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-bold tracking-wide flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-emerald-400" />
            TEST PAYMENT MODE:
          </span>
          <span className="text-slate-200">
            Get 38-Page Operating System for <strong className="text-emerald-300 font-extrabold text-base">₹1</strong> <span className="line-through text-slate-400 text-xs">₹999</span>
          </span>
        </div>

        {/* Right Side Timer & CTA */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 text-slate-300 font-mono text-xs">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Resets in:</span>
            <span className="text-amber-400 font-bold">
              {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={scrollToCheckout}
            className="hidden md:flex items-center gap-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-3 py-1 rounded transition-all text-xs shadow-sm hover:scale-105 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Claim ₹1 Deal
          </button>
        </div>

      </div>
    </div>
  );
};
