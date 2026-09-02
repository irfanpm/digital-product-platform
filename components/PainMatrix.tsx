'use client';

import React from 'react';
import { XCircle, CheckCircle2, Sparkles, ArrowRight, Zap } from 'lucide-react';

export const PainMatrix: React.FC = () => {
  const comparisons = [
    {
      pain: 'Carrying 4 heavy paper notebooks for work, budget, meals & habits',
      solution: 'All 8 life operating hubs organized inside 1 lightweight iPad/tablet file',
    },
    {
      pain: 'Messy pen scribbles, whiteout mistakes & running out of paper pages',
      solution: 'Flawless 1-tap undo, digital lasso tool, custom handwriting & infinite pages',
    },
    {
      pain: 'Spending ₹3,500+ every single year buying new paper planners & stickers',
      solution: 'One-time ₹299 payment with 2026, 2027 & 2028 yearly updates included free',
    },
    {
      pain: 'Flipping through hundreds of physical pages trying to find last month’s notes',
      solution: 'Lightning-fast 1-click hyperlinked tabs taking you anywhere in 0.1 seconds',
    },
    {
      pain: 'Losing all your plans and notes if a physical notebook gets lost or wet',
      solution: '100% safe automatic cloud sync to iCloud, Google Drive & OneDrive',
    },
    {
      pain: 'Boring monochrome paper that kills your motivation to stay organized',
      solution: 'Vibrant Rainbow & Minimalist aesthetic with 5,000+ cute digital stickers',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            WHY SWITCH TO DIGITAL PLANNING?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Stop Carrying Paper Chaos. Experience Digital Clarity.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            See why over 12,400+ planners threw away their physical notebooks this year.
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-12">
          
          {/* Left Column: Old Paper Way (Pain) */}
          <div className="rounded-3xl p-6 sm:p-8 bg-rose-50/50 border-2 border-rose-200/80 space-y-6">
            <div className="flex items-center justify-between border-b border-rose-200 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                  The Old Way
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Physical Paper Planners
                </h3>
              </div>
              <XCircle className="w-8 h-8 text-rose-500" />
            </div>

            <div className="space-y-4">
              {comparisons.map((c, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{c.pain}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: All-In-One Digital Planner (Solution) */}
          <div className="rounded-3xl p-6 sm:p-8 bg-emerald-50/60 border-2 border-emerald-500 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Recommended
            </div>

            <div className="flex items-center justify-between border-b border-emerald-200 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  The Smart Way
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  All-In-One Digital Planner (2026-2028)
                </h3>
              </div>
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>

            <div className="space-y-4">
              {comparisons.map((c, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{c.solution}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CTA Banner */}
        <div className="text-center">
          <a
            href="#checkout-section"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-sm sm:text-base py-4 px-8 rounded-2xl shadow-lg transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Switch to Digital Planning Today (Only ₹299 Lifetime)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
