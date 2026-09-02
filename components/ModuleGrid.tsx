'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Calendar, 
  Target, 
  DollarSign, 
  Heart, 
  Plane, 
  BookOpen, 
  Layers, 
  Utensils, 
  Sparkles, 
  Gift, 
  CheckCircle2, 
  Palette, 
  Download,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const ModuleGrid: React.FC = () => {
  const hubs = [
    {
      number: '01',
      title: 'Daily, Weekly & Monthly Planning',
      icon: Calendar,
      color: 'from-rose-500 to-pink-500',
      badge: '600+ Hyperlinked Pages',
      description: 'Effortlessly switch between yearly overviews, monthly calendars, weekly focus spreads, and hourly daily schedules with 1 tap.',
      items: ['Yearly, Monthly, Weekly & Daily Spreads', 'Sunday & Monday Start Options', 'Integrated Google & Apple Calendar Links', 'Hourly Time-Blocking (6 AM - 11 PM)'],
    },
    {
      number: '02',
      title: 'Goal Setting & Habit Tracker',
      icon: Target,
      color: 'from-purple-600 to-indigo-600',
      badge: 'Atomic Habits System',
      description: 'Turn your biggest dreams into daily actionable habits. Includes quarterly goal roadmaps, 30-day streak grids, and reflection prompts.',
      items: ['Quarterly & Annual Goal Breakdowns', '30-Day Atomic Habit Matrices', 'Morning & Evening Routine Checklists', 'Vision Board & Milestones Log'],
    },
    {
      number: '03',
      title: 'Finance & Wealth Hub',
      icon: DollarSign,
      color: 'from-emerald-600 to-teal-600',
      badge: 'Master Your Money',
      description: 'Take full control of your income, expenses, and savings. Complete with visual spending pie charts and debt payoff trackers.',
      items: ['Monthly Budget & Spending Breakdown', 'Savings Challenges (52-Week & ₹1,00,000)', 'Subscription & Recurring Bill Tracker', 'Debt Snowball & Payoff Calculator'],
    },
    {
      number: '04',
      title: 'Wellness & Mindset Hub',
      icon: Heart,
      color: 'from-pink-500 to-rose-600',
      badge: 'Holistic Self-Care',
      description: 'Prioritize your mental and physical health with daily mood emojis, 8-glass water trackers, sleep quality logs, and gratitude journaling.',
      items: ['Daily Mood & Emotion Tracker', '8-Glass Water Hydration Log', 'Sleep Quality & Energy Tracker', 'Morning Gratitude & Evening Reflection'],
    },
    {
      number: '05',
      title: 'Travel & Vacation Hub',
      icon: Plane,
      color: 'from-sky-500 to-blue-600',
      badge: 'Stress-Free Trips',
      description: 'Plan unforgettable adventures without the stress. Organize flight itineraries, hotel bookings, packing checklists, and trip budgets.',
      items: ['Flight, Hotel & Transport Itinerary', 'Master Packing & Luggage Checklist', 'Places to Visit & Food Bucket List', 'Travel Expense & Currency Converter'],
    },
    {
      number: '06',
      title: 'Notes, Dotted & Cornell Hub',
      icon: BookOpen,
      color: 'from-amber-500 to-orange-500',
      badge: 'All Paper Textures',
      description: 'Capture lecture notes, meeting brainstorms, and sketches. Includes lined, dotted, grid, Cornell, and blank aesthetic paper styles.',
      items: ['Cornell Method Note Pages', 'Bullet Journaling Dotted Paper', 'Wide & College Ruled Lined Paper', 'Hexagonal & Grid Drawing Pages'],
    },
    {
      number: '07',
      title: 'Projects & Productivity Hub',
      icon: Layers,
      color: 'from-indigo-600 to-violet-600',
      badge: 'Get Things Done',
      description: 'Organize high-priority tasks with Eisenhower matrices, Pomodoro sprint logs, meeting agendas, and team action items.',
      items: ['Eisenhower Priority 4-Box Matrix', 'Pomodoro Focus Session Tracker', 'Meeting Agenda & Action Items Log', 'Project Milestone Timelines'],
    },
    {
      number: '08',
      title: 'Meal Planning & Grocery Hub',
      icon: Utensils,
      color: 'from-teal-500 to-emerald-600',
      badge: 'Save ₹15,000/Month',
      description: 'Plan your weekly breakfast, lunch, dinner, and snacks. Auto-organize your grocery shopping list by aisle to save time and money.',
      items: ['Weekly Breakfast, Lunch & Dinner Menu', 'Categorized Grocery Shopping List', 'Pantry & Fridge Inventory Tracker', 'Favorite Recipe Card Archive'],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            EVERYTHING YOU NEED IN ONE PLACE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            8 Core Life Operating Hubs
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Never juggle separate notebooks again. Every page is fully hyperlinked with zero lag on GoodNotes, Notability & Penly.
          </p>
        </div>

        {/* 8-Hub Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hubs.map((hub, idx) => {
            const Icon = hub.icon;
            return (
              <div
                key={idx}
                className="clean-card rounded-3xl p-6 bg-white border border-slate-200/90 hover:border-rose-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${hub.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-xs font-mono font-black text-slate-400">
                      HUB {hub.number}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                      {hub.badge}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-1.5 leading-snug">
                      {hub.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {hub.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  {hub.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* EXTRA BONUSES 3D SHOWCASE SECTION */}
        <div className="clean-card rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white border-2 border-purple-800/50 shadow-2xl space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 uppercase tracking-wider">
              <Gift className="w-4 h-4 text-amber-400" /> FREE EXCLUSIVE BONUSES INCLUDED (WORTH ₹4,999)
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Get 5,000+ Stickers & 150 Covers Free
            </h3>
            <p className="text-sm text-slate-300">
              Your instant download bundle comes with everything you need to personalize and organize your digital planner in seconds.
            </p>
          </div>

          {/* 2 Big Visual Bonus Graphic Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Bonus 1: 5,000+ Aesthetic Stickers Pack */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-4 hover:border-pink-500 transition-colors">
              <div className="relative rounded-xl overflow-hidden aspect-[16/9] w-full border border-slate-700 shadow-md">
                <Image
                  src="/images/digital_stickers_bundle.jpg"
                  alt="5000+ Aesthetic Digital Planner Stickers Bundle"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-black text-white flex items-center gap-2">
                    <Palette className="w-5 h-5 text-pink-400" /> 5,000+ Pre-Cropped Digital Stickers
                  </h4>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
                    Worth ₹1,999 (FREE)
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Includes individual PNG files + GoodNotes Sticker Elements file. Emojis, washi tapes, sticky notes, weather icons, motivational quotes, and habit stickers.
                </p>
              </div>
            </div>

            {/* Bonus 2: 150 Aesthetic Covers & Fan Spread */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-4 hover:border-purple-500 transition-colors">
              <div className="relative rounded-xl overflow-hidden aspect-[16/9] w-full border border-slate-700 shadow-md">
                <Image
                  src="/images/planner_templates_spread.jpg"
                  alt="100+ Templates and 150 Covers Fan Spread"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-black text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-400" /> 150 Aesthetic Covers & 100+ Templates
                  </h4>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
                    Worth ₹2,999 (FREE)
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Swap covers anytime to match your mood (minimalist, pastel, leather, marble, floral). Plus step-by-step video tutorials for iPad and Android.
                </p>
              </div>
            </div>

          </div>

          {/* Bonus Call to Action */}
          <div className="text-center pt-4">
            <a
              href="#checkout-section"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-black text-base sm:text-lg py-3.5 px-8 rounded-2xl shadow-xl transition-all cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>Claim Planner + All Bonuses Instantly</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
