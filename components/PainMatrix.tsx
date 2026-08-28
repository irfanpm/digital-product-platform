'use client';

import React from 'react';
import { XCircle, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export const PainMatrix: React.FC = () => {
  const comparisons = [
    {
      feature: 'Resume Optimization',
      oldWay: 'Sending 50+ generic resumes blindly on LinkedIn/Naukri',
      oldResult: '0 Callbacks, 6 weeks wasted',
      aiWay: '10 ATS-customized resume templates matching target JDs',
      aiResult: 'Passes Workday/Taleo ATS with 95%+ score',
    },
    {
      feature: 'Resume Bullets',
      oldWay: '"Responsible for sales and client communication"',
      oldResult: 'Boring, rejected in 6 secs',
      aiWay: 'ATMR Formula: "Scaled B2B pipeline by ₹1.2Cr with 40% win rate"',
      aiResult: 'Instant recruiter interview invites',
    },
    {
      feature: 'Interview Preparation',
      oldWay: 'Googling random questions 2 hours before the interview',
      oldResult: 'Anxious, stammering, blanking out',
      aiWay: '50 Master Questions + 6-Round AI Mock Interview Simulator',
      aiResult: 'Crush technical & HR rounds smoothly',
    },
    {
      feature: 'Salary Offer Negotiation',
      oldWay: 'Accepting whatever initial offer the recruiter gives',
      oldResult: 'Leaving ₹2L to ₹5L on the table',
      aiWay: '10 Plug-and-play counter-offer scripts & leverage tactics',
      aiResult: '+₹2 LPA to +₹5 LPA salary boost',
    },
  ];

  const scrollToCheckout = () => {
    const el = document.getElementById('checkout-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-white border-y border-slate-200 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Direct Comparison
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Why 90% of Applicants Get Ghosted (And How You Win)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            See the exact difference between manual blind applications versus leveraging the battle-tested 38-Page AI Career Operating System.
          </p>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* Column 1: The Old Way (Red) */}
          <div className="bg-rose-50/50 border border-rose-200 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-rose-200">
              <div className="p-2.5 bg-rose-100 rounded-2xl text-rose-700">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-rose-950">The Old Discarded Way</h3>
                <p className="text-xs text-rose-700">Manual, frustrating, 0 callbacks</p>
              </div>
            </div>

            <div className="space-y-6">
              {comparisons.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-2xl border border-rose-100 space-y-2 shadow-sm">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.feature}</div>
                  <p className="text-sm text-slate-800 flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{item.oldWay}</span>
                  </p>
                  <div className="inline-block text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
                    Result: {item.oldResult}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: The AI System Way (Green) */}
          <div className="bg-emerald-50/50 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 relative shadow-lg">
            <div className="absolute -top-3.5 right-6 bg-emerald-600 text-white text-[11px] font-black uppercase px-3.5 py-1 rounded-full shadow-sm">
              RECOMMENDED 38-PAGE SYSTEM
            </div>

            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-emerald-200">
              <div className="p-2.5 bg-emerald-100 rounded-2xl text-emerald-800">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-950">The 38-Page AI Operating System</h3>
                <p className="text-xs text-emerald-800">Automated, ATS-proof, high salary offers</p>
              </div>
            </div>

            <div className="space-y-6">
              {comparisons.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-2xl border border-emerald-200 space-y-2 shadow-sm">
                  <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{item.feature}</div>
                  <p className="text-sm text-slate-900 font-medium flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item.aiWay}</span>
                  </p>
                  <div className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-200">
                    Result: {item.aiResult}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CTA Banner */}
        <div className="text-center">
          <button
            onClick={scrollToCheckout}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-7 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all text-sm sm:text-base cursor-pointer"
          >
            <span>Switch to the 38-Page AI System for ₹299</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
