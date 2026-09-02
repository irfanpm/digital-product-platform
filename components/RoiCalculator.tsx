'use client';

import React, { useState } from 'react';
import { Calculator, Sparkles, CheckCircle2, DollarSign, Clock, ArrowRight, Smile } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [dailyPlanningMinutes, setDailyPlanningMinutes] = useState<number>(30);
  const [yearlyNotebooksCount, setYearlyNotebooksCount] = useState<number>(4);

  // Calculations
  const stationerySavings = yearlyNotebooksCount * 850 + 1500; // Notebooks + Stickers/Pens
  const yearlyHoursSaved = Math.round((dailyPlanningMinutes * 365 * 0.4) / 60); // 40% efficiency boost with hyperlinks

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-rose-50/40 to-slate-50 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-rose-500" />
            INTERACTIVE SAVINGS CALCULATOR
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How Much Time & Money Will You Save?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Adjust the sliders below to calculate your personal annual productivity and financial savings.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="clean-card rounded-3xl p-6 sm:p-10 bg-white border-2 border-rose-200 shadow-2xl space-y-8">
          
          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-slate-200">
            
            {/* Slider 1: Daily Planning Time */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm font-black text-slate-800">
                <span>Daily Time Spent Planning / Organizing:</span>
                <span className="text-rose-600 font-mono text-base">{dailyPlanningMinutes} mins / day</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={dailyPlanningMinutes}
                onChange={(e) => setDailyPlanningMinutes(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>10 mins</span>
                <span>45 mins</span>
                <span>90 mins</span>
              </div>
            </div>

            {/* Slider 2: Physical Notebooks / Planners bought per year */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm font-black text-slate-800">
                <span>Physical Notebooks / Planners Bought / Year:</span>
                <span className="text-purple-600 font-mono text-base">{yearlyNotebooksCount} Planners</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={yearlyNotebooksCount}
                onChange={(e) => setYearlyNotebooksCount(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>1 Notebook</span>
                <span>5 Notebooks</span>
                <span>10 Notebooks</span>
              </div>
            </div>

          </div>

          {/* Result Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            
            {/* Output 1: Money Saved */}
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-1">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Estimated Money Saved / Year
              </span>
              <div className="text-2xl sm:text-4xl font-black text-emerald-700 font-mono">
                ₹{stationerySavings.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-slate-500">
                No more paper notebooks, pens or physical sticker packs
              </p>
            </div>

            {/* Output 2: Hours Saved */}
            <div className="bg-purple-50 border border-purple-200 p-5 rounded-2xl space-y-1">
              <span className="text-xs font-bold text-purple-800 uppercase tracking-wider block">
                Productive Hours Gained / Year
              </span>
              <div className="text-2xl sm:text-4xl font-black text-purple-700 font-mono">
                +{yearlyHoursSaved} Hours
              </div>
              <p className="text-[11px] text-slate-500">
                Thanks to 1-click hyperlinks & pre-made habit matrices
              </p>
            </div>

            {/* Output 3: 3-Year Life Impact */}
            <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl space-y-1">
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">
                3-Year Total Planner ROI
              </span>
              <div className="text-2xl sm:text-4xl font-black text-rose-600 font-mono">
                {Math.round((stationerySavings * 3) / 299)}x Return
              </div>
              <p className="text-[11px] text-slate-500">
                Includes free 2026, 2027 & 2028 yearly updates
              </p>
            </div>

          </div>

          {/* Bottom Call to Action */}
          <div className="text-center pt-2">
            <a
              href="#checkout-section"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-black text-sm sm:text-base py-3.5 px-8 rounded-2xl shadow-lg transition-all cursor-pointer"
            >
              <span>Unlock 3-Year All-In-One Digital Planner For ₹299</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
