'use client';

import React from 'react';
import { 
  FileText, 
  Bot, 
  MessageSquare, 
  Award, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Layers,
  Linkedin,
  Target,
  CheckSquare,
  TrendingUp
} from 'lucide-react';

export const ModuleGrid: React.FC = () => {
  // All 18 Sections extracted directly from the user's 38-page PDF document!
  const systemSections = [
    {
      secNum: '01 - 03',
      title: 'ATS Resume System & 10 Templates',
      tagline: 'PDF Pages 1 - 9',
      description: '30-point ATS hygiene checklist, Workday/Taleo/Greenhouse rules, and 10 complete resume templates.',
      items: [
        'Fresh Graduate & Campus Resume Template',
        'Experienced Pro (Mid-Senior) & Executive Template',
        'Career Switcher & IT Software Engineer Templates',
        'Digital Marketing, Sales, Finance & Support Templates'
      ],
      icon: FileText,
      badge: 'Templates & Rules'
    },
    {
      secNum: '04 & 16',
      title: '65+ Copy-Paste AI Prompts',
      tagline: 'PDF Pages 10 - 12 & 34 - 36',
      description: 'Plug-and-play AI prompts for ChatGPT, Claude, and Gemini to audit, extract keywords, and rewrite bullets.',
      items: [
        'Prompt #1: Comprehensive Resume Audit & Weakness Diagnostic',
        'Prompt #2: JD Keyword Extraction & Gap Matrix',
        'Prompt #3: ATMR Achievement Rewriter',
        'Prompts 4-15: Career Gap Reframer, Summary Generator & 50 Bonus Prompts'
      ],
      icon: Bot,
      badge: '65+ AI Prompts'
    },
    {
      secNum: '05 & 06',
      title: 'Cover Letters & LinkedIn Optimization',
      tagline: 'PDF Pages 13 - 16',
      description: 'Standard & startup cover letters, 10 email templates, and full 10-point LinkedIn profile optimization.',
      items: [
        '3 Custom Cover Letter Templates (All Levels, Switcher, Startup)',
        '10 Essential Application Email Templates (Referral, Recruiter, Follow-up)',
        '10 Proven LinkedIn Headline Formulas & About Templates',
        '10 Copy-Paste LinkedIn AI Prompts for Outreach'
      ],
      icon: Linkedin,
      badge: 'Outreach & Profiles'
    },
    {
      secNum: '07 & 08',
      title: '50 Master Interview Bank & STAR Stories',
      tagline: 'PDF Pages 17 - 22',
      description: '50 master interview questions across 5 categories with interviewer intent, strong answer criteria, and model stories.',
      items: [
        '10 HR & Screening Questions ("Tell me about yourself")',
        '10 Behavioral Questions + 10 Model STAR Stories',
        '10 Technical Execution & 10 Situational Questions',
        '10 Difficult & Tricky Questions (Salary expectation, job hop, gaps)'
      ],
      icon: MessageSquare,
      badge: '50 Q&A Bank'
    },
    {
      secNum: '09',
      title: 'AI Mock Interviewer & Scorecard',
      tagline: 'PDF Page 23',
      description: 'Turn free ChatGPT into a 6-round interactive hiring manager with a 35-point evaluation scorecard.',
      items: [
        'Master 6-Round Mock Interview AI Prompt System',
        'Evaluates Relevance, STAR Structure, Confidence & Metrics',
        'Includes Printable 35-Point Performance Scorecard',
        'Provides real-time candidate answer rewrites'
      ],
      icon: Award,
      badge: 'Simulator'
    },
    {
      secNum: '10 & 11',
      title: 'Salary Negotiation & Recruiter Scripts',
      tagline: 'PDF Pages 24 - 26',
      description: '10 ready-to-use salary negotiation scripts and 20 recruiter/networking follow-up scripts.',
      items: [
        '10 Salary Scripts (Screening, counter-offers, signing bonus, remote flexibility)',
        'Salary & Offer Comparison Worksheet (Total Target Compensation)',
        '20 Recruiter Follow-up Scripts (LinkedIn connection, referral, 5-day check-in)',
        'Rejection feedback & post-interview thank you notes'
      ],
      icon: DollarSign,
      badge: 'Salary + ₹2-5 LPA'
    },
    {
      secNum: '12 & 13',
      title: '30-Day Action Roadmap & Job Tracker',
      tagline: 'PDF Pages 27 - 29',
      description: 'Day-by-day 4-week execution blueprint with printable 3-sheet job application pipeline tracker.',
      items: [
        'Week 1: Foundation & Asset Creation (Day 1-7)',
        'Week 2: Application Sprint & Active Outreach (Day 8-14)',
        'Week 3: Interview Mastery & STAR Drills (Day 15-21)',
        'Week 4: Pipeline Conversion & Offers (Day 22-30)'
      ],
      icon: Calendar,
      badge: '30-Day Roadmap'
    },
    {
      secNum: '14 & 15',
      title: '15 Career Worksheets & 50-Point Checklist',
      tagline: 'PDF Pages 30 - 33',
      description: '15 printable strategy worksheets and a final 50-point application quality assurance checklist.',
      items: [
        'Worksheets 1-7: Target Role, ATMR Builder, Gap Reframer, Keyword Extractor',
        'Worksheets 8-15: STAR Builder, Pitch, Compensation, Progress Review',
        'Points 1-20: Resume & ATS Hygiene Quality Audit',
        'Points 21-50: LinkedIn Footprint, Interview Logistics & Offer Governance'
      ],
      icon: CheckSquare,
      badge: 'Worksheets & Audit'
    },
    {
      secNum: '17 & 18',
      title: 'Weekly Scorecard & "Start Today" Action Plan',
      tagline: 'PDF Pages 37 - 38',
      description: 'Measure leading indicators and complete 5 immediate 15-minute actions today to start landing interviews.',
      items: [
        'Weekly Activity Scorecard (Applications, inbounds, chats, screenings)',
        'Action 1: Choose 3 Exact Target Job Titles (15 mins)',
        'Action 2: Run Resume Through AI Prompt #1 (20 mins)',
        'Action 3-5: ATMR Bullets, LinkedIn Headline & Recruiter Outreach'
      ],
      icon: Target,
      badge: 'Instant Execution'
    }
  ];

  const scrollToCheckout = () => {
    const el = document.getElementById('checkout-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 border border-emerald-300 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-emerald-700" /> Complete 18-Section Master Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Inside The 38-Page Operating System
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Everything in your kit is structured into 18 battle-tested sections to take you from ghosted applications to signed offer letters.
          </p>
        </div>

        {/* 🌟 SALARY NEGOTIATION GRAPHIC SHOWCASE 🌟 */}
        <div className="mb-14">
          <div className="clean-card rounded-3xl p-4 sm:p-6 bg-white border border-slate-200 shadow-xl overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7">
                <img
                  src="/images/salary_negotiation_graphic.jpg"
                  alt="Salary Negotiation Toolkit & Counter Offer Email Scripts Dashboard Graphic"
                  className="w-full h-auto rounded-2xl object-cover shadow-sm group-hover:scale-[1.01] transition-transform duration-500"
                />
              </div>
              <div className="lg:col-span-5 space-y-4 p-2">
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                  PDF SECTION 10 • SALARY NEGOTIATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Negotiate +₹2 Lakhs to +₹5 Lakhs Extra On Every Offer
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Never accept initial offers on the spot. Get 10 copy-paste email counter-scripts, equity negotiation frameworks, and the total target compensation comparison worksheet.
                </p>
                <div className="pt-2">
                  <button
                    onClick={scrollToCheckout}
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    <span>Get Salary Toolkit in ₹299 Kit</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 18 Sections Grid (Full Width 3-Column Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {systemSections.map((sec, idx) => {
            const IconComp = sec.icon;
            return (
              <div
                key={idx}
                className="clean-card clean-card-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between bg-white border border-slate-200 shadow-sm"
              >
                <div>
                  {/* Card top */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200">
                      <IconComp className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      SECTIONS {sec.secNum}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1 leading-snug">
                    {sec.title}
                  </h3>
                  <p className="text-xs font-mono text-emerald-700 font-semibold mb-3">
                    {sec.tagline}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm mb-5 leading-relaxed">
                    {sec.description}
                  </p>

                  {/* Items breakdown list */}
                  <div className="space-y-2 pt-4 border-t border-slate-100 mb-4">
                    {sec.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 font-mono flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="font-semibold text-slate-700">Included in ₹299 Kit</span>
                  <span className="text-emerald-700 font-bold">Instant Download →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="text-center bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 max-w-4xl mx-auto shadow-md">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            Get All 18 Sections & 38 Pages Delivered Instantly
          </h3>
          <p className="text-slate-600 text-sm mb-6">
            One-time payment of ₹299 • Instant PDF & Digital Dashboard Access • Lifetime Free Updates
          </p>
          <button
            onClick={scrollToCheckout}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-9 py-4 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all text-base sm:text-lg cursor-pointer"
          >
            <span>UNLOCK ALL 18 SECTIONS — ₹299</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
