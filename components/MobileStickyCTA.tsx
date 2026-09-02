'use client';

import React, { useState, useEffect } from 'react';
import { Download, Sparkles } from 'lucide-react';

export const MobileStickyCTA: React.FC = () => {
  const [price, setPrice] = useState<number>(199);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.setting && data.setting.basePrice) {
          setPrice(Number(data.setting.basePrice));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-2xl">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="leading-tight">
          <span className="text-[10px] font-black text-rose-600 block uppercase tracking-wider">
            600+ Pages & 5000+ Stickers
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 line-through">₹1,999</span>
            <span className="text-base font-black text-slate-900 font-mono">₹{price}</span>
          </div>
        </div>

        <a
          href="#checkout-section"
          className="flex-1 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-black text-xs py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Get Digital Planner</span>
        </a>
      </div>
    </div>
  );
};
