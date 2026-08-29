'use client';

import React, { useState } from 'react';
import { 
  Star, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Bot, 
  TrendingUp, 
  Zap, 
  ShieldCheck,
  AlertTriangle,
  Award,
  Layers,
  Check,
  Eye,
  FileCheck
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ats' | 'atmr' | 'interview'>('overview');

  const scrollToCheckout = () => {
    const el = document.getElementById('checkout-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 subtle-grid-bg bg-slate-50">
      
      {/* Background Soft Accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Loss Aversion Top Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-900 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>⚠️ <strong>85% of resumes</strong> are discarded in 6 seconds by ATS algorithms. Fix yours before your next application.</span>
          </div>
        </div>

        {/* Dual-Badge Social Anchor */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span>4.9/5 Rating (1,240+ Job Seekers Hired)</span>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm">
            <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span>Updated for 2026 AI Recruiting Tools</span>
          </div>
        </div>

        {/* Main H1 & Subhead */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] mb-6">
            Land <span className="text-emerald-600 underline decoration-emerald-400 decoration-wavy decoration-2">3x More Interviews</span> & Beat ATS Filters with the Complete 38-Page AI Career System.
          </h1>
          <p className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
            Stop sending 50+ blind applications to get ghosted. Get 10 ATS-optimized templates, 65+ copy-paste AI prompts, 50-master interview question bank, STAR framework answers, salary negotiation scripts, a 30-day action plan, and 15 printable worksheets.
          </p>
        </div>

        {/* Primary Call to Action Button */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <button
            onClick={scrollToCheckout}
            className="w-full sm:w-auto min-w-[320px] bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg sm:text-xl px-8 py-4 rounded-2xl shadow-xl shadow-emerald-600/20 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 group border border-emerald-400/30 cursor-pointer"
          >
            <span>GET INSTANT ACCESS — ₹299</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Sticky Trust Micro-Copy */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-slate-500 text-xs sm:text-sm font-medium">
            <span className="flex items-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant 38-Page PDF & Digital Access
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No Monthly Subscriptions
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Works with Free ChatGPT / Claude / Gemini
            </span>
          </div>
        </div>

        {/* 🌟 ULTRA HIGH-RESOLUTION 3D PRODUCT MOCKUP IMAGE SHOWCASE 🌟 */}
        <div className="mb-14 max-w-5xl mx-auto">
          <div className="clean-card rounded-3xl p-3 sm:p-5 bg-white border border-slate-200 shadow-2xl relative overflow-hidden group">
            <img
              src="/images/career_kit_mockup.jpg"
              alt="The AI Job Application Kit 38-Page Career Operating System 3D Product Bundle"
              className="w-full h-auto rounded-2xl object-cover shadow-sm group-hover:scale-[1.01] transition-transform duration-500"
            />
            {/* Floating Badges on Image */}
            <div className="absolute top-6 left-6 hidden sm:flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-extrabold text-slate-800 shadow-lg">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>38-Page Complete System PDF</span>
            </div>
            <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-2 bg-slate-900/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full border border-slate-700 text-xs font-bold shadow-lg">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Includes 10 Word & Notion Dashboards</span>
            </div>
          </div>
        </div>

        {/* Clean SaaS Minimalist Interactive Preview Card */}
        <div className="max-w-5xl mx-auto">
          <div className="clean-card rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xl bg-white relative overflow-hidden">
            
            {/* Header of Interactive Card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-extrabold text-base sm:text-lg flex items-center gap-2">
                    Actual Product Interactive Preview
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">38 Pages</span>
                  </h3>
                  <p className="text-slate-500 text-xs">Direct snippets from "The AI Job Application Kit 2026"</p>
                </div>
              </div>

              {/* Minimal Tabs */}
              <div className="flex bg-slate-100 p-1 rounded-xl text-xs w-full sm:w-auto justify-between border border-slate-200">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    activeTab === 'overview' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  38-Page Overview
                </button>
                <button
                  onClick={() => setActiveTab('ats')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    activeTab === 'ats' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ATS Meter Graphic
                </button>
                <button
                  onClick={() => setActiveTab('atmr')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    activeTab === 'atmr' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ATMR Rewriter
                </button>
                <button
                  onClick={() => setActiveTab('interview')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    activeTab === 'interview' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  AI Mock Engine
                </button>
              </div>
            </div>

            {/* Tab 1: 38-Page Overview */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-emerald-700 font-extrabold uppercase tracking-wider text-[10px]">SECTION 1 - 3</span>
                  <h4 className="font-bold text-slate-900 text-sm">ATS Resume System</h4>
                  <ul className="space-y-1.5 text-slate-600">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> 10 Complete ATS Templates</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> 30-Point ATS Checklist</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Keyword Extraction Matrix</li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-emerald-700 font-extrabold uppercase tracking-wider text-[10px]">SECTION 4 - 9</span>
                  <h4 className="font-bold text-slate-900 text-sm">AI Prompts & Interview Prep</h4>
                  <ul className="space-y-1.5 text-slate-600">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> 65+ Copy-Paste AI Prompts</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> 50 Master Q&A Bank + STAR</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> 6-Round AI Mock Interviewer</li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-emerald-700 font-extrabold uppercase tracking-wider text-[10px]">SECTION 10 - 18</span>
                  <h4 className="font-bold text-slate-900 text-sm">Salary & Action Systems</h4>
                  <ul className="space-y-1.5 text-slate-600">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> 10 Salary Negotiation Scripts</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> 30-Day Job Search Roadmap</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> 15 Printable Career Worksheets</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: ATS Audit Score Graphic Image */}
            {activeTab === 'ats' && (
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img
                    src="/images/ats_score_mockup.jpg"
                    alt="ATS Compatibility Audit Score Graphic 98/100"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-slate-600 text-xs text-center font-medium">
                  Verified ATS audit breakdown formula from Section 2 & Section 4 of the 38-Page Operating System.
                </p>
              </div>
            )}

            {/* Tab 3: ATMR Rewriter */}
            {activeTab === 'atmr' && (
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl space-y-1">
                    <span className="text-rose-700 font-bold text-xs">❌ Generic Weak Resume Bullet:</span>
                    <p className="text-slate-800 font-mono text-xs">
                      "Handled company social media accounts and posted content."
                    </p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-1">
                    <span className="text-emerald-800 font-bold text-xs">✅ ATMR Formula Rewriter (PDF Page 5):</span>
                    <p className="text-slate-900 font-mono text-xs font-semibold">
                      "Spearheaded organic LinkedIn content strategy, generating 120k+ impressions & driving 28% MoM lead growth at 18% lower CAC."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: AI Mock Engine */}
            {activeTab === 'interview' && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900">Section 9 • AI Mock Interview System (Page 23)</span>
                  <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">35-Point Scorecard</span>
                </div>
                <div className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-xs space-y-2">
                  <p className="text-emerald-400 font-bold">Master Prompt Snippet:</p>
                  <p className="text-slate-300">
                    "Conduct a 6-round interactive mock interview with me. Grade my answer across 7 criteria: Relevance, Clarity, STAR Structure, Confidence, Metrics, Polish, Technical Accuracy..."
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
