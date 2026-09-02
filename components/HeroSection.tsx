'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  CheckCircle2, 
  Download, 
  Star, 
  Calendar, 
  Smartphone, 
  Palette, 
  Zap, 
  Heart,
  Layers,
  ArrowRight,
  ShieldCheck,
  Smile,
  DollarSign
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'finance' | 'habits' | 'wellness'>('daily');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-rose-50/70 via-purple-50/40 to-slate-50">
      
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-gradient-to-r from-pink-300/25 via-purple-300/25 to-sky-300/25 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute -top-12 right-10 w-72 h-72 bg-amber-200/30 blur-2xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-80 left-4 w-60 h-60 bg-rose-200/30 blur-2xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Floating Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-md shadow-rose-500/20">
            <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
            2026 • 2027 • 2028 ALL-IN-ONE DIGITAL PLANNER
          </span>
          <span className="inline-flex items-center gap-1 bg-white border border-rose-200 text-rose-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            4.98/5 Rating (12,400+ Happy Planners)
          </span>
          <span className="inline-flex items-center gap-1 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-extrabold px-3 py-1.5 rounded-full">
            🎁 FREE YEARLY UPDATES
          </span>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Plan Better. Stay Organized.{' '}
            <span className="bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Achieve More Every Day.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            The complete <strong className="text-slate-900">600+ page hyperlinked digital planning system</strong> for GoodNotes, Notability & iPad/Android. Includes <strong className="text-slate-900">5,000+ aesthetic stickers</strong>, <strong className="text-slate-900">100+ templates</strong>, and <strong className="text-slate-900">150 customizable covers</strong>.
          </p>

          {/* Quick Value Metrics Pill Grid */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2 text-xs sm:text-sm font-extrabold text-slate-700">
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 px-3.5 py-1.5 rounded-2xl shadow-sm flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>600+ Hyperlinked Pages</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 px-3.5 py-1.5 rounded-2xl shadow-sm flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-pink-500" />
              <span>5,000+ Digital Stickers</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 px-3.5 py-1.5 rounded-2xl shadow-sm flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>Google & Apple Calendar Sync</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 px-3.5 py-1.5 rounded-2xl shadow-sm flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>iPad, Galaxy Tab & Penly Ready</span>
            </div>
          </div>
        </div>

        {/* 3D Visual Mockup Showcase Container */}
        <div className="relative max-w-5xl mx-auto mb-12">
          
          {/* Main Visual Image Card with 3D Tilt Effect */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-rose-200/80 bg-white shadow-2xl shadow-rose-500/10 p-2 sm:p-4 group">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] w-full">
              <Image
                src="/images/digital_planner_main_mockup.jpg"
                alt="All-In-One Digital Planner 2026-2028 Mockup"
                fill
                priority
                className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
              />
            </div>

            {/* Floating Live Badges Over Image */}
            <div className="absolute top-6 left-6 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-rose-200 shadow-lg text-xs font-black text-rose-900">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Instant 1-Click Hyperlink Navigation</span>
            </div>

            <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-2 bg-slate-900/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-2xl border border-slate-700 shadow-xl text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Sunday & Monday Start Included</span>
            </div>
          </div>

          {/* Side Floating Feature Cards for Desktop */}
          <div className="hidden lg:block absolute -top-4 -left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-purple-200 shadow-xl max-w-[210px] animate-float-slow text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-purple-700 font-extrabold">
              <Palette className="w-4 h-4" /> Rainbow & Pastel
            </div>
            <p className="text-slate-500 text-[11px] leading-tight">
              Aesthetically curated color palette designed for stress-free daily planning.
            </p>
          </div>

          <div className="hidden lg:block absolute -bottom-4 -right-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-200 shadow-xl max-w-[210px] animate-float-slow text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-700 font-extrabold">
              <Download className="w-4 h-4" /> Instant Delivery
            </div>
            <p className="text-slate-500 text-[11px] leading-tight">
              Download bundle directly to your iPad or tablet in less than 5 seconds.
            </p>
          </div>
        </div>

        {/* Interactive Sample Planner Spread Switcher */}
        <div className="max-w-4xl mx-auto clean-card rounded-3xl p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                Interactive Preview
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                Explore Inside Your 600+ Page System
              </h3>
            </div>

            {/* Switcher Tab Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setActiveTab('daily')}
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  activeTab === 'daily'
                    ? 'bg-rose-500 text-white shadow-md font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📅 Daily Spread
              </button>
              <button
                onClick={() => setActiveTab('finance')}
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  activeTab === 'finance'
                    ? 'bg-rose-500 text-white shadow-md font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                💰 Budget & Finance
              </button>
              <button
                onClick={() => setActiveTab('habits')}
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  activeTab === 'habits'
                    ? 'bg-rose-500 text-white shadow-md font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🎯 Habit Tracker
              </button>
              <button
                onClick={() => setActiveTab('wellness')}
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  activeTab === 'wellness'
                    ? 'bg-rose-500 text-white shadow-md font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🧘‍♀️ Wellness & Mood
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Left Content Description */}
            <div className="space-y-3 text-xs sm:text-sm">
              {activeTab === 'daily' && (
                <>
                  <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-rose-500" /> Daily Time-Blocking & Focus Schedule
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Hourly schedule blocks (6:00 AM to 11:00 PM), top 3 priorities, daily gratitude box, water intake tracker, to-do list, meal plan, and mood check-in.
                  </p>
                  <ul className="space-y-1.5 text-slate-700 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 1-Click Hyperlink back to Month & Week
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Sunday & Monday start options
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Integrated Google & Apple Calendar links
                    </li>
                  </ul>
                </>
              )}

              {activeTab === 'finance' && (
                <>
                  <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-600" /> Complete Wealth & Budget Hub
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Track monthly income, recurring subscriptions, daily expenses, savings challenges (52-week & ₹1,00,000 goals), and debt snowball payoff trackers.
                  </p>
                  <ul className="space-y-1.5 text-slate-700 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Visual spending pie charts & progress bars
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Annual financial summary review
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Bill payment checklist with due date alerts
                    </li>
                  </ul>
                </>
              )}

              {activeTab === 'habits' && (
                <>
                  <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-600" /> 30-Day Atomic Habit Matrix
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Build unstoppable routines. Track morning and evening rituals, reading goals, workout streaks, screen time limits, and sleep consistency.
                  </p>
                  <ul className="space-y-1.5 text-slate-700 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Monthly streak tracker with color highlights
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Weekly reflection & reward system
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Pre-built habit ideas for health, career & peace
                    </li>
                  </ul>
                </>
              )}

              {activeTab === 'wellness' && (
                <>
                  <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-500" /> Holistic Health & Mindset Log
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Daily mood emoji tracker, 8-glass water tracker, sleep quality log, symptom tracker, workout log, and guided morning/evening gratitude journaling.
                  </p>
                  <ul className="space-y-1.5 text-slate-700 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Monthly self-care bingo & challenges
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Meal planner with grocery list organizer
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Stress relief and mental wellness prompts
                    </li>
                  </ul>
                </>
              )}
            </div>

            {/* Right Image Graphic Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-[16/10] shadow-md bg-slate-100">
              <Image
                src={
                  activeTab === 'habits' || activeTab === 'wellness'
                    ? '/images/planner_ipad_lifestyle.jpg'
                    : '/images/planner_templates_spread.jpg'
                }
                alt="Planner Template Spread Preview"
                fill
                className="object-cover object-center"
              />
            </div>

          </div>
        </div>

        {/* Hero CTA & Instant Checkout Anchor */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <a
            href="#checkout-section"
            className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-black text-lg sm:text-xl py-4 sm:py-5 px-8 sm:px-12 rounded-2xl shadow-xl shadow-rose-500/25 hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer border border-rose-300/30"
          >
            <Download className="w-6 h-6 stroke-[2.5]" />
            <span>Get All-In-One Planner & 5000+ Stickers Now</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Instant Digital Access
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-amber-500" /> Free 2026, 2027 & 2028 Updates
            </span>
            <span className="flex items-center gap-1">
              <Smile className="w-4 h-4 text-rose-500" /> 30-Day Happiness Guarantee
            </span>
          </div>
        </div>

      </div>

    </section>
  );
};
