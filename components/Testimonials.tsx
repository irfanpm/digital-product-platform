'use client';

import React from 'react';
import { Star, CheckCircle2, Sparkles, Heart } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Aishwarya Patel',
      role: 'Medical Student & GoodNotes User',
      rating: 5,
      date: '2 days ago',
      title: '“The best investment I made for medical school.”',
      text: 'I used to carry 3 binders to campus every day. The hyperlinks in this planner are insanely fast, and having the Cornell notes + lecture schedules right next to my monthly calendar is a game-changer.',
      avatar: '👩‍⚕️',
      verified: true,
      tag: 'Verified iPad Buyer',
    },
    {
      name: 'Karan Mehra',
      role: 'Senior Software Engineer & Freelancer',
      rating: 5,
      date: '1 week ago',
      title: '“Replaced Notion, Google Keep and my paper diary.”',
      text: 'The hourly time-blocking from 6 AM to 11 PM helps me plan deep work sprint cycles. Also, the finance tracker alone saved me over ₹30,000 by cutting unused subscriptions.',
      avatar: '👨‍💻',
      verified: true,
      tag: 'Verified Galaxy Tab Buyer',
    },
    {
      name: 'Pooja Deshmukh',
      role: 'Working Mom & Content Creator',
      rating: 5,
      date: '3 days ago',
      title: '“The 5,000+ stickers and meal planner are pure magic!”',
      text: 'My Sunday planning routine is now my favorite part of the week. Decorating with the cute pastel stickers and organizing our family meals for the week brings so much calm to our home.',
      avatar: '👩‍👧',
      verified: true,
      tag: 'Verified GoodNotes Buyer',
    },
    {
      name: 'Sneha Roy',
      role: 'Fashion Designer & Small Business Owner',
      rating: 5,
      date: '5 days ago',
      title: '“Aesthetic, vibrant & zero lag on Notability.”',
      text: 'I am super picky about typography and color palettes. This Rainbow theme is gorgeous! Every tab works with 1 tap, and the 150 covers let me switch styles whenever I want.',
      avatar: '🎨',
      verified: true,
      tag: 'Verified iPad Pro Buyer',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            LOVED BY 12,400+ PLANNERS WORLDWIDE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Real Stories from Real Organizers
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            See how the All-In-One Digital Planner is helping thousands achieve their goals every single day.
          </p>
        </div>

        {/* 4-Card Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="clean-card rounded-3xl p-6 sm:p-8 bg-slate-50 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Rating & Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {r.tag}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 leading-snug">
                  {r.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  {r.text}
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xl shadow-sm">
                  {r.avatar}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900">{r.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{r.role} • {r.date}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
