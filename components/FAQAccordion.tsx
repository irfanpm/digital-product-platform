'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react';

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Will this work with free ChatGPT / Claude / Gemini?',
      a: 'Yes, 100%! All 65+ AI prompts and frameworks in this kit are optimized for free versions of ChatGPT (GPT-3.5/GPT-4o mini), Claude 3 Sonnet, and Google Gemini. You do NOT need any paid AI subscription.'
    },
    {
      q: 'How fast do I get access to the 38-page PDF?',
      a: 'Immediately after your payment of ₹299 is confirmed, an instant download button appears on your screen. You will also receive an automated backup copy via email in <5 seconds containing the PDF toolkit and dashboard links.'
    },
    {
      q: 'I am a fresher or from a non-tech background. Is this kit suitable for me?',
      a: 'Absolutely. Section 3 of the kit includes dedicated resume templates specifically engineered for freshers with 0 formal experience, as well as non-tech roles (Sales, Marketing, HR, Operations, Finance, Support). Section 2 teaches you how to translate academic/project work into ATMR metrics.'
    },
    {
      q: 'What if corporate ATS algorithms change in 2026?',
      a: 'Our templates and keyword extractor prompts are updated regularly to comply with the latest parsing logic of major ATS systems like Workday, Taleo, Greenhouse, iCIMS, and Lever. Your ₹299 purchase includes lifetime free access to future kit updates.'
    },
    {
      q: 'Can I open and read the kit on my mobile phone?',
      a: 'Yes! The kit is delivered in a high-resolution, mobile-optimized PDF format + cloud digital dashboard that opens seamlessly on Android phones, iPhones, iPads, laptops, and desktop computers.'
    },
    {
      q: 'Is my payment secure?',
      a: '100% secure. Payments are processed via RBI-licensed Razorpay payment gateway with 256-bit SSL encryption. We support UPI, GPay, PhonePe, Paytm, Debit/Credit cards, and NetBanking with zero hidden charges.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" /> Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to know about "The AI Job Application Kit 2026".
          </p>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="clean-card rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="text-slate-900 font-bold text-sm sm:text-base flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
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
