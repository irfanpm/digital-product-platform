'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Leaf } from 'lucide-react';

export const FAQAccordion: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do I need to print the files?',
      a: 'No. The Excel tracker can be used digitally. Printable challenges are available for customers who prefer printing.',
    },
    {
      q: 'Do I need Excel knowledge?',
      a: 'The tracker is designed to be simple, and the included user guide explains how to use it.',
    },
    {
      q: 'Can I choose my own savings target?',
      a: 'Yes. The Excel tracker allows users to enter their own target amount and dates.',
    },
    {
      q: 'What happens if I cannot save the full amount one day?',
      a: 'The remaining required amount can carry forward automatically according to the tracker logic.',
    },
    {
      q: 'Is this a physical product?',
      a: 'No. This is a digital product.',
    },
    {
      q: 'How do I receive the files?',
      a: 'You will receive an instant Google Drive download link directly on your screen and in your email right after successful purchase.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-16 md:py-24 bg-[#FDFBF7] relative border-t border-[#E8F0E9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#728A7C] bg-[#E8F0E9] border border-[#2C4A3B]/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#2C4A3B] tracking-tight">
            Got Questions? We’ve Got Answers.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to know about the Money Saving Bundle.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#E8F0E9] shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-black text-[#2C4A3B] text-sm sm:text-base cursor-pointer hover:text-[#728A7C] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#C6A87C] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#C6A87C]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#E8F0E9] pt-3 animate-in fade-in duration-200">
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
