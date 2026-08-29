'use client';

import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, XCircle, Copy, Check } from 'lucide-react';

export const BeforeAfterCard: React.FC = () => {
  const [activeRole, setActiveRole] = useState<'swe' | 'marketing' | 'sales' | 'ops' | 'cs'>('swe');
  const [copied, setCopied] = useState<boolean>(false);

  const roleExamples = {
    swe: {
      role: 'Software Engineering / Tech',
      before: 'Maintained web application codebase and fixed bugs reported by users.',
      beforeFlaw: 'Vague, no technologies, no metrics, sounds passive.',
      after: 'Engineered high-throughput React/Node microservices, resolving 45+ critical bugs and reducing API response latency by 34% across 150k monthly active users.',
      afterFormula: 'Action Verb (Engineered) + Metric (45+ bugs, -34% latency) + Scope (150k MAU) + Result',
    },
    marketing: {
      role: 'Digital Marketing & Growth',
      before: 'Handled social media accounts and created weekly marketing posts.',
      beforeFlaw: 'Generic task dump, zero conversion metrics or lead impact.',
      after: 'Spearheaded organic LinkedIn & META ad campaigns, generating 120k+ impressions & driving 28% MoM lead growth at 18% lower Customer Acquisition Cost (CAC).',
      afterFormula: 'Action Verb (Spearheaded) + Metric (120k+ impressions, +28% MoM) + CAC Efficiency',
    },
    sales: {
      role: 'Sales & Business Development',
      before: 'Called potential clients and tried to sell company SaaS subscriptions.',
      beforeFlaw: 'Lacks quota percentage, deal sizes, or revenue numbers.',
      after: 'Outperformed quarterly quota by 142%, closing ₹1.8 Crore in new ARR across 22 enterprise accounts via multi-touch consultative prospecting.',
      afterFormula: 'Action Verb (Outperformed) + Quota % (142%) + Revenue (₹1.8 Cr ARR) + Process',
    },
    ops: {
      role: 'Operations & Supply Chain',
      before: 'Managed warehouse inventory and coordinated daily shipping schedules.',
      beforeFlaw: 'No cost savings, no efficiency metrics, generic operations.',
      after: 'Optimized regional fulfillment logistics, reducing order dispatch cycle time from 48h to 14h while cutting annual shipping overhead by ₹4.5 Lakhs.',
      afterFormula: 'Action Verb (Optimized) + Speed Metric (48h → 14h) + Cost Savings (₹4.5L)',
    },
    cs: {
      role: 'Customer Support & Success',
      before: 'Answered customer support tickets and solved client issues via email.',
      beforeFlaw: 'No CSAT score, no retention metrics, no response SLA.',
      after: 'Maintained 98.4% CSAT rating across 2,400+ customer tickets while reducing average first-response SLA to under 8 minutes.',
      afterFormula: 'Action Verb (Maintained) + CSAT Metric (98.4%) + Ticket Volume (2,400+) + SLA Speed',
    },
  };

  const current = roleExamples[activeRole];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.after);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 border border-emerald-300 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> PDF Section 2 • ATMR Formula Rewriter
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Real Resume Bullet Transformations
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            See how the <strong>Action-Task-Metrics-Result (ATMR) Formula</strong> turns weak resume bullets into high-impact recruiter magnets across different industries.
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {(Object.keys(roleExamples) as Array<keyof typeof roleExamples>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveRole(key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeRole === key
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {roleExamples[key].role}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Card */}
        <div className="clean-card rounded-3xl p-6 sm:p-10 bg-white border border-slate-200 shadow-xl max-w-5xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider font-mono">
              ROLE: {current.role}
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3 py-1.5 rounded-lg border border-slate-300 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Sample Bullet</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* BEFORE */}
            <div className="bg-rose-50/70 border border-rose-200 p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>BEFORE (Weak 6-Second Discard)</span>
              </div>
              <p className="text-slate-800 font-mono text-xs sm:text-sm leading-relaxed bg-white p-3.5 rounded-xl border border-rose-200">
                "{current.before}"
              </p>
              <div className="text-[11px] text-rose-700 font-medium">
                ⚠️ <strong>Flaw:</strong> {current.beforeFlaw}
              </div>
            </div>

            {/* AFTER */}
            <div className="bg-emerald-50/70 border-2 border-emerald-500 p-6 rounded-2xl space-y-3 relative shadow-md">
              <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>AFTER (ATMR ATS Magnet)</span>
              </div>
              <p className="text-slate-900 font-mono text-xs sm:text-sm font-semibold leading-relaxed bg-white p-3.5 rounded-xl border border-emerald-300 text-emerald-950">
                "{current.after}"
              </p>
              <div className="text-[11px] text-emerald-800 font-bold bg-emerald-100 p-2 rounded-lg border border-emerald-200">
                ✨ <strong>Formula:</strong> {current.afterFormula}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
