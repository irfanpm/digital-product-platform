'use client';

import React, { useState } from 'react';
import { Calculator, AlertTriangle, TrendingDown, CheckCircle, ArrowRight } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [monthlySalary, setMonthlySalary] = useState<number>(50000);

  const threeMonthsLoss = monthlySalary * 3;
  const dailyLoss = Math.round(monthlySalary / 30);
  const kitPrice = 299;
  const roiMultiplier = Math.round(threeMonthsLoss / kitPrice);

  const scrollToCheckout = () => {
    const el = document.getElementById('checkout-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Card Container */}
        <div className="clean-card rounded-3xl p-6 sm:p-10 border border-amber-200 bg-amber-50/20 shadow-lg relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 bg-amber-100 border border-amber-300 text-amber-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Calculator className="w-3.5 h-3.5 text-amber-700" /> Opportunity Cost & ROI Calculator
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              The Real Cost of Waiting 3 Months
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Every single day spent without ATS optimization and interview readiness costs you thousands in delayed earnings.
            </p>
          </div>

          {/* Interactive Calculator Controls */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 mb-8 shadow-sm">
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label className="text-slate-700">Select Your Target Monthly Salary:</label>
                <span className="text-emerald-700 font-extrabold text-xl font-mono">
                  ₹{monthlySalary.toLocaleString('en-IN')} / month
                </span>
              </div>

              <input
                type="range"
                min="20000"
                max="200000"
                step="5000"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(Number(e.target.value))}
                className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>₹20,000/mo (Fresher)</span>
                <span>₹1,00,000/mo (Mid-Senior)</span>
                <span>₹2,00,000/mo (Executive)</span>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              
              <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl space-y-1">
                <span className="text-rose-800 text-xs font-bold flex items-center gap-1">
                  <TrendingDown className="w-4 h-4 text-rose-600" /> 3-Month Search Delay Penalty:
                </span>
                <div className="text-2xl sm:text-3xl font-black text-rose-700 font-mono">
                  - ₹{threeMonthsLoss.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-slate-600">
                  Daily income lost while ghosted: <strong className="text-rose-700 font-bold">₹{dailyLoss}/day</strong>
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-1">
                <span className="text-emerald-800 text-xs font-bold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> One-time 38-Page Kit Investment:
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
                  ₹299
                </div>
                <p className="text-[11px] text-emerald-800 font-medium">
                  Instant <strong className="text-slate-900">{roiMultiplier}x ROI</strong> on your first paycheck
                </p>
              </div>

            </div>

          </div>

          {/* Comparison summary */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700">
                ₹299 is less than the price of a single pizza, yet it protects <strong>₹{threeMonthsLoss.toLocaleString('en-IN')}</strong> in career earnings.
              </p>
            </div>

            <button
              onClick={scrollToCheckout}
              className="w-full sm:w-auto shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Stop The Loss - Get Kit for ₹299</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
