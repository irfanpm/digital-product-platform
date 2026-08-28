'use client';

import React, { useState } from 'react';
import { ArrowRightLeft, Check, X, Sparkles } from 'lucide-react';

export const BeforeAfterCard: React.FC = () => {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  // Real transformation examples from Section 2 of the PDF!
  const transformations = [
    {
      role: 'Digital Marketing',
      before: 'Handled company social media accounts and posted content.',
      beforeResult: '0 callbacks, 6 weeks wasted',
      after: 'Spearheaded organic LinkedIn & Instagram content strategy, generating 120k+ impressions and driving 28% MoM inbound lead growth at 18% lower CAC.',
      afterResult: '3 recruiter interview invites',
    },
    {
      role: 'Software Engineering',
      before: 'Worked on the backend database and fixed various bugs.',
      beforeResult: 'Filtered out by ATS for missing metrics',
      after: 'Refactored legacy PostgreSQL queries and implemented Redis caching, reducing p99 API latency by 42% and supporting 150k+ concurrent active users.',
      afterResult: 'Shortlisted for Senior SDE (₹24 LPA)',
    },
    {
      role: 'Sales & Account Exec',
      before: 'Reached out to potential clients and tried to sell software.',
      beforeResult: 'Ignored by top recruiters',
      after: 'Prospected and closed 14 enterprise B2B accounts across North America, generating ₹1.8Cr in Net New ARR and exceeding annual quota by 135%.',
      afterResult: 'Recruiter reached out directly on LinkedIn',
    },
    {
      role: 'Customer Support',
      before: 'Responsible for answering customer calls and dealing with complaints.',
      beforeResult: 'Filtered out by Workday ATS',
      after: 'Resolved 45+ customer escalations daily via Zendesk and live chat, maintaining a 96% CSAT rating against an industry benchmark of 88%.',
      afterResult: 'Invited to Support Lead Interview',
    },
    {
      role: 'Operations & Project Mgr',
      before: 'In charge of weekly team meetings and tracking tasks.',
      beforeResult: 'Stuck at baseline salary tier',
      after: 'Orchestrated sprint planning and resource allocation for a 12-person cross-functional team, delivering enterprise release 2 weeks ahead of schedule and 14% under budget.',
      afterResult: 'Invited to Lead Ops Manager Interview',
    },
  ];

  const current = transformations[activeRoleIndex];

  return (
    <section className="py-16 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> PDF Section 2 • ATMR Formula Proof
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            See The ATMR Bullet Rewriter In Action
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Action-Task-Method-Result (ATMR) formula transforms weak, ignored resume bullets into high-converting interview magnets in 10 seconds.
          </p>

          {/* Role selector tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {transformations.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveRoleIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeRoleIndex === idx
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.role}
              </button>
            ))}
          </div>
        </div>

        {/* Transformation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          
          {/* Middle Icon for desktop */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-slate-300 rounded-full items-center justify-center text-emerald-600 shadow-md">
            <ArrowRightLeft className="w-4 h-4" />
          </div>

          {/* BEFORE Card (Red) */}
          <div className="clean-card rounded-3xl p-6 sm:p-7 relative flex flex-col justify-between border-rose-200 bg-rose-50/40">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-rose-700 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <X className="w-4 h-4 p-0.5 bg-rose-200 text-rose-800 rounded-full" />
                  Weak Discarded Bullet
                </span>
                <span className="text-slate-400 text-xs font-mono">Before Kit</span>
              </div>
              
              <div className="bg-white p-4 rounded-2xl border border-rose-200 text-slate-700 font-mono text-sm leading-relaxed shadow-sm">
                "{current.before}"
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">Recruiter Verdict:</span>
              <span className="text-rose-800 font-bold bg-rose-100 px-2.5 py-1 rounded-lg border border-rose-200">
                ❌ {current.beforeResult}
              </span>
            </div>
          </div>

          {/* AFTER Card (Green) */}
          <div className="clean-card rounded-3xl p-6 sm:p-7 relative flex flex-col justify-between border-emerald-300 bg-emerald-50/40 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-emerald-800 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Check className="w-4 h-4 p-0.5 bg-emerald-200 text-emerald-800 rounded-full" />
                  The ATMR Formula Bullet
                </span>
                <span className="text-emerald-800 text-xs font-bold bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                  PDF Page 5
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-200 text-slate-900 font-mono text-sm font-semibold leading-relaxed shadow-sm">
                "{current.after}"
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-200 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Recruiter Reaction:</span>
              <span className="text-emerald-900 font-extrabold bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-300">
                ✅ {current.afterResult}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
