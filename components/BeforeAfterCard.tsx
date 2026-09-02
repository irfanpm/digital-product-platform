'use client';

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Building2, 
  Palette, 
  HeartHandshake, 
  CheckCircle2, 
  Sparkles, 
  Check, 
  Copy,
  Calendar,
  Layers,
  Zap,
  ArrowRight
} from 'lucide-react';

interface PersonaData {
  id: string;
  role: string;
  subtitle: string;
  icon: any;
  color: string;
  accentBadge: string;
  highlights: string[];
  keyTemplates: string[];
  quote: string;
}

export const BeforeAfterCard: React.FC = () => {
  const personas: PersonaData[] = [
    {
      id: 'students',
      role: 'Students',
      subtitle: 'Ace Exams, Track Assignments & Master Your Schedule',
      icon: GraduationCap,
      color: 'from-amber-500 to-orange-500',
      accentBadge: 'bg-amber-100 text-amber-900 border-amber-300',
      highlights: [
        'Weekly Class Timetable with room & professor details',
        'Assignment & Project Deadline Tracker with priority tags',
        'Exam Study Planner & Revision Countdown Schedule',
        'Semester GPA & Grade Point Average Calculator',
        'Cornell & Dotted Note Papers for fast lecture review',
      ],
      keyTemplates: ['Class Schedule', 'Exam Countdown', 'Assignment Tracker', 'GPA Goal Matrix'],
      quote: '“This planner got me through my final year with a 3.9 GPA. Having all assignments hyperlinked in GoodNotes changed everything!” — Ananya S., University Student',
    },
    {
      id: 'professionals',
      role: 'Professionals',
      subtitle: 'Time-Block Your Days, Crush Deadlines & Elevate Your Career',
      icon: Briefcase,
      color: 'from-blue-600 to-indigo-600',
      accentBadge: 'bg-blue-100 text-blue-900 border-blue-300',
      highlights: [
        'Hourly Time-Blocking (6:00 AM to 11:00 PM) for deep focus',
        'Daily Top 3 Priorities & High-Impact Task Matrix',
        'Meeting Agenda, Action Items & Follow-up Tracker',
        'Quarterly OKR & Career Milestone Roadmaps',
        'Integrated 1-click links to Google & Apple Calendars',
      ],
      keyTemplates: ['Meeting Notes', 'Time-Blocking', 'Project Sprints', 'Quarterly OKRs'],
      quote: '“I replaced 4 different apps with this single PDF. The 1-click hyperlinks make navigating between daily meetings and monthly goals effortless.” — Rohan K., Product Lead',
    },
    {
      id: 'business',
      role: 'Business Owners',
      subtitle: 'Manage Revenue, Track Projects & Scale With Clarity',
      icon: Building2,
      color: 'from-emerald-600 to-teal-600',
      accentBadge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      highlights: [
        'Monthly Revenue Targets & Cash Flow Tracker',
        'Client CRM, Lead Follow-ups & Project Invoicing',
        'Multi-Platform Social Media & Content Marketing Calendar',
        'Inventory, Vendor Contacts & Order Fulfillment Log',
        'Annual Business Review & Growth Goal Matrix',
      ],
      keyTemplates: ['Cash Flow Hub', 'Client CRM', 'Content Calendar', 'Annual Review'],
      quote: '“As a founder, my brain used to feel overwhelmed. This planner organizes our revenue goals, client calls, and content in one gorgeous dashboard.” — Vikram M., Agency Founder',
    },
    {
      id: 'creatives',
      role: 'Creatives',
      subtitle: 'Brainstorm Visually, Plan Content & Track Inspiration',
      icon: Palette,
      color: 'from-pink-500 to-purple-600',
      accentBadge: 'bg-pink-100 text-pink-900 border-pink-300',
      highlights: [
        'Visual Moodboard & Brainstorming Blank / Dotted Spreads',
        'Instagram, YouTube & TikTok Content Scheduler',
        'Hex Color Palette & Typography Design Boards',
        'Project Concept to Completion Tracker',
        '5,000+ Aesthetic Digital Stickers for custom decoration',
      ],
      keyTemplates: ['Visual Moodboards', 'Sticker Pack', 'Content Scheduler', 'Idea Incubator'],
      quote: '“The aesthetic color palette and 5,000+ stickers give me so much joy every morning. Planning feels like creating art!” — Priya D., Graphic Designer & Creator',
    },
    {
      id: 'moms',
      role: 'Busy Moms',
      subtitle: 'Balance Family Life, Meals, Chores & Self-Care Peacefully',
      icon: HeartHandshake,
      color: 'from-rose-500 to-pink-500',
      accentBadge: 'bg-rose-100 text-rose-900 border-rose-300',
      highlights: [
        'Family Master Schedule & Kids Activity Planner',
        'Weekly Meal Planning with Categorized Grocery Shopping List',
        'Home Cleaning Routine & Chore Chart Matrix',
        'Doctor Appointments, Medication & Vaccination Log',
        'Daily Gratitude, Mood & Hydration Self-Care Tracker',
      ],
      keyTemplates: ['Family Calendar', 'Meal & Grocery Hub', 'Chore Matrix', 'Doctor & Health Log'],
      quote: '“With three kids and a job, this planner keeps our entire household running smoothly. Meal planning alone saves us ₹15,000 every month!” — Meera R., Working Mom',
    },
  ];

  const [selectedPersona, setSelectedPersona] = useState<PersonaData>(personas[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(selectedPersona.quote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-slate-50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            DESIGNED FOR EVERY LIFESTYLE & GOAL
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Perfect For Students, Pros, Founders & Moms
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Click your lifestyle below to see how the All-In-One Digital Planner customizes to your exact daily routine.
          </p>
        </div>

        {/* 5-Persona Clickable Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {personas.map((p) => {
            const Icon = p.icon;
            const isSelected = selectedPersona.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPersona(p)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer border ${
                  isSelected
                    ? `bg-slate-900 text-white shadow-xl shadow-slate-900/15 border-slate-900 scale-105`
                    : `bg-white text-slate-700 hover:bg-slate-100 border-slate-200 shadow-sm`
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-pink-400' : 'text-slate-500'}`} />
                <span>{p.role}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Persona Feature Card Display */}
        <div className="clean-card rounded-3xl p-6 sm:p-10 bg-white border-2 border-slate-200 shadow-2xl relative overflow-hidden">
          
          {/* Top Gradient Banner Stripe */}
          <div className={`h-2.5 w-full bg-gradient-to-r ${selectedPersona.color} absolute top-0 left-0`} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            
            {/* Left Column: Role Details & Checklist */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <span className={`text-xs font-black px-3 py-1 rounded-full border ${selectedPersona.accentBadge} uppercase tracking-wider inline-block`}>
                  Tailored For: {selectedPersona.role}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {selectedPersona.subtitle}
                </h3>
              </div>

              {/* Checklist */}
              <div className="space-y-3">
                {selectedPersona.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Template Tags */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Key Templates Included for {selectedPersona.role}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedPersona.keyTemplates.map((t, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-xl border border-slate-200">
                      ✨ {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Verified Customer Review Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl relative border border-slate-700">
              
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  ★★★★★ Verified User Review
                </span>
                <button
                  onClick={handleCopyQuote}
                  className="text-[11px] font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  title="Copy Review"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <blockquote className="text-sm sm:text-base font-medium text-slate-200 leading-relaxed italic">
                {selectedPersona.quote}
              </blockquote>

              <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-white block">Instant 1-Click Access</span>
                  <span className="text-[11px] text-emerald-400 font-medium">Delivered to GoodNotes & iPad</span>
                </div>

                <a
                  href="#checkout-section"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Start Planning</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
