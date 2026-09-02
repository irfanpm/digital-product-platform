'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FAQAccordion: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I download and import the planner into GoodNotes or Notability?',
      a: 'It takes under 60 seconds! After completing checkout, you will receive an instant Google Drive download link on your screen and in your email. Simply tap the link, click "Open in GoodNotes" (or Notability / Penly), and your 600+ page hyperlinked planner is ready to use immediately.',
    },
    {
      q: 'Does it work on Android tablets (Samsung Tab, Penly, Noteshelf)?',
      a: 'Yes, 100%! The planner works on ANY Android device or tablet with PDF annotation apps like Penly, Samsung Notes, Noteshelf, or Xodo. All hyperlinks, tabs, and calendar integrations work smoothly on Android.',
    },
    {
      q: 'Do I get access to 2026, 2027, and 2028 yearly planners?',
      a: 'Yes! Your one-time purchase includes full access to the 2026, 2027, and 2028 dated planners, as well as an undated reusable edition. Future yearly updates are delivered to your Google Drive link completely free.',
    },
    {
      q: 'How do the 1-click hyperlinks and calendar sync work?',
      a: 'Every monthly, weekly, and daily tab is coded with fast hyperlinks. Tap any date on your monthly calendar to jump straight to that day’s hourly schedule. Plus, tap the Google or Apple Calendar icons to schedule live digital reminders on your phone.',
    },
    {
      q: 'Are the 5,000+ digital stickers pre-cropped and easy to use?',
      a: 'Yes! You get both individual pre-cropped transparent PNG files and a dedicated GoodNotes Sticker Book collection. You can simply drag and drop or copy/paste any sticker into your planner in 1 click.',
    },
    {
      q: 'Is this a one-time payment or a monthly subscription?',
      a: 'This is a strictly 100% ONE-TIME payment of ₹299 (or ₹1 test price). There are zero recurring fees, zero monthly charges, and you get lifetime access with free updates forever.',
    },
    {
      q: 'What if I need help setting it up on my iPad or tablet?',
      a: 'Every download includes step-by-step video tutorials for iPad (GoodNotes, Notability) and Android (Penly, Samsung Notes). Plus, our 24/7 customer support team is available anytime to assist you.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Got Questions? We’ve Got Answers.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to know about device compatibility, stickers, hyperlinks and instant delivery.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="clean-card rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-black text-slate-900 text-sm sm:text-base cursor-pointer hover:text-rose-600 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-rose-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
