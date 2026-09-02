'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Gift, Clock } from 'lucide-react';

export const UrgencyBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNum = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-bold py-2.5 px-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Left Announcement */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" /> NEW 2026-2028 EDITION
          </span>
          <span className="text-white/90 text-xs sm:text-sm">
            Includes <strong className="text-white">600+ Pages</strong>, <strong className="text-white">5,000+ Stickers</strong> & <strong className="text-white">Free Yearly Updates!</strong>
          </span>
        </div>

        {/* Right Countdown & Instant Deal */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-black/25 px-2.5 py-1 rounded-xl text-xs font-mono font-extrabold text-amber-300 border border-white/10">
            <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Launch Offer: {formatNum(timeLeft.hours)}:{formatNum(timeLeft.minutes)}:{formatNum(timeLeft.seconds)}</span>
          </div>

          <a
            href="#checkout-section"
            className="hidden md:inline-flex items-center gap-1 bg-white text-rose-600 hover:bg-rose-50 px-3 py-1 rounded-xl text-xs font-black transition-all shadow-sm cursor-pointer"
          >
            <Gift className="w-3.5 h-3.5 text-rose-500" />
            <span>Claim 70% Off</span>
          </a>
        </div>

      </div>
    </div>
  );
};
