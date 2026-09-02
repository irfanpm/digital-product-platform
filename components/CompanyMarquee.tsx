'use client';

import React from 'react';
import { Smartphone, CheckCircle2, Sparkles, Tablet, PenTool, Laptop, Apple } from 'lucide-react';

export const CompanyMarquee: React.FC = () => {
  const supportedApps = [
    { name: 'GoodNotes 6 / 5', badge: 'iOS & Mac', color: 'text-sky-600 bg-sky-50 border-sky-200' },
    { name: 'Notability', badge: 'Apple iPad', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { name: 'Penly App', badge: 'Android & Samsung', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { name: 'Noteshelf', badge: 'iOS & Android', color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { name: 'Samsung Notes', badge: 'Galaxy Tab', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { name: 'Kilonotes', badge: 'Stylus Ready', color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { name: 'CollaNote', badge: 'Free App Support', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { name: 'reMarkable 2', badge: 'E-Ink Tablet', color: 'text-slate-800 bg-slate-100 border-slate-300' },
    { name: 'GoodNotes for Android', badge: 'Tablet Ready', color: 'text-teal-600 bg-teal-50 border-teal-200' },
    { name: 'Apple Pencil 1 & 2 & Pro', badge: '100% Compatible', color: 'text-pink-600 bg-pink-50 border-pink-200' },
    { name: 'S-Pen & Universal Stylus', badge: 'Zero Lag Writing', color: 'text-violet-600 bg-violet-50 border-violet-200' },
  ];

  return (
    <section className="py-8 bg-white border-y border-slate-200/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <span className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          WORKS SEAMLESSLY ACROSS YOUR FAVORITE APPS & DEVICES
        </span>
      </div>

      {/* Infinite Scrolling Marquee Track */}
      <div className="flex w-full overflow-hidden select-none group">
        <div className="flex items-center gap-4 animate-marquee py-2 shrink-0">
          {supportedApps.concat(supportedApps).map((app, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border text-xs sm:text-sm font-bold shadow-sm whitespace-nowrap transition-transform hover:scale-105 ${app.color}`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 stroke-[2.5]" />
              <span className="font-extrabold">{app.name}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/80 border border-current/20 opacity-90">
                {app.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
