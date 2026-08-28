'use client';

import React from 'react';
import { Star, CheckCircle2, Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Rohan Sharma',
      role: 'Full Stack Engineer (Ex-Fresher)',
      placedAt: 'Secured ₹14 LPA at FinTech Startup',
      salaryJump: '+85% Salary Hike',
      avatar: 'RS',
      review: 'I sent 60+ applications over 2 months with zero calls. After using Section 4 ATMR Prompt #3 on my resume, I got 4 recruiter calls in 10 days! The AI Mock Interview Simulator in Section 9 gave me the exact confidence I needed.',
      verified: 'Verified Buyer',
      date: '3 days ago'
    },
    {
      name: 'Ananya Verma',
      role: 'Product Marketing Specialist',
      placedAt: 'Landed Senior Role at E-commerce Unicorn',
      salaryJump: '+₹3.5 LPA Negotiated',
      avatar: 'AV',
      review: 'The Salary Negotiation scripts in Section 10 alone earned me an extra ₹3.5 LPA on my joining offer! The recruiter agreed within 24 hours of receiving the script email.',
      verified: 'Verified Buyer',
      date: '1 week ago'
    },
    {
      name: 'Karthik Nair',
      role: 'Data Analyst (Career Pivot)',
      placedAt: 'Pivoted from Non-Tech Support to Data Role',
      salaryJump: 'Career Pivot Success',
      avatar: 'KN',
      review: 'I was pivoting from non-tech support to data analytics. The ATS template matched 98% with target JDs. Worth 100x more than ₹299.',
      verified: 'Verified Buyer',
      date: '2 weeks ago'
    }
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Real Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            1,240+ Job Seekers Hired & Promoted
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            See how real applicants transformed their career trajectory using the 38-Page AI Kit.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="clean-card rounded-3xl p-6 border border-slate-200 flex flex-col justify-between shadow-sm bg-white hover:border-emerald-300 transition-all"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                      {rev.avatar}
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold text-sm leading-tight">{rev.name}</h4>
                      <p className="text-slate-500 text-[11px]">{rev.role}</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                    {rev.salaryJump}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              {/* Footer info */}
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{rev.verified}</span>
                </div>
                <span className="text-slate-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
