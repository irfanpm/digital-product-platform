'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, Award, Star } from 'lucide-react';

export const CompanyMarquee: React.FC = () => {
  const marqueeItems = [
    { text: 'WORKDAY ATS: PASS 98%', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' },
    { text: 'TALEO ATS: PASS 96%', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' },
    { text: 'GREENHOUSE: PASS 99%', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' },
    { text: 'LEVER ATS: PASS 97%', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' },
    { text: 'iCIMS ATS: PASS 95%', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' },
    { text: 'HIRED AT: GOOGLE', color: 'text-slate-900 bg-white border-slate-200' },
    { text: 'HIRED AT: AMAZON', color: 'text-slate-900 bg-white border-slate-200' },
    { text: 'HIRED AT: MICROSOFT', color: 'text-slate-900 bg-white border-slate-200' },
    { text: 'HIRED AT: DELOITTE', color: 'text-slate-900 bg-white border-slate-200' },
    { text: 'HIRED AT: TCS & INFOSYS', color: 'text-slate-900 bg-white border-slate-200' },
    { text: 'AVG SALARY HIKE: +₹3.5 LPA', color: 'text-amber-900 bg-amber-100 border-amber-300' },
    { text: '3X MORE INTERVIEW INVITES', color: 'text-purple-900 bg-purple-100 border-purple-300' },
  ];

  return (
    <div className="w-full bg-slate-900 text-white py-3.5 border-y border-slate-800 overflow-hidden relative shadow-md">
      
      {/* Gradient Fade Edges */}
      <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-6">
        {/* Render 2 duplicate sets for infinite loop */}
        {[...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div
            key={idx}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-extrabold border shrink-0 shadow-sm ${item.color}`}
          >
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>

    </div>
  );
};
