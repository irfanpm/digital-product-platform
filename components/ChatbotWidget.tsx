'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface ChatQA {
  id: string;
  question: string;
  answer: string;
  actionText?: string;
  actionLink?: string;
}

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; actionText?: string; actionLink?: string }>>([
    {
      sender: 'bot',
      text: 'Hi there! 🌸 Have questions about the All-In-One Digital Planner (2026-2028 Edition)? Click any question below for instant answers!',
    },
  ]);

  const presetQuestions: ChatQA[] = [
    {
      id: 'delivery',
      question: '⚡ How fast is digital delivery?',
      answer: 'Instant! Immediately after your payment completes, you receive the full Google Drive download bundle right on your screen and in your email in under 5 seconds.',
      actionText: 'Claim Instant Access Now',
      actionLink: '#checkout-section',
    },
    {
      id: 'devices',
      question: '📱 Does it work on iPad & Android?',
      answer: 'Yes! It is 100% compatible with Apple iPad (GoodNotes, Notability, CollaNote) and Android tablets (Penly, Samsung Notes, Noteshelf) using Apple Pencil or S-Pen.',
    },
    {
      id: 'years',
      question: '📅 Are 2026, 2027 & 2028 included?',
      answer: 'Yes! Your one-time purchase includes full access to 2026, 2027, and 2028 dated planners, plus an undated version. All future yearly updates are completely free forever.',
      actionText: 'Get 3-Year Access for ₹299',
      actionLink: '#checkout-section',
    },
    {
      id: 'stickers',
      question: '🎨 How do I use the 5,000+ stickers?',
      answer: 'You get pre-cropped transparent PNG files and a GoodNotes Sticker Elements file. You can simply drag and drop them into your planner in 1 click.',
    },
    {
      id: 'onetime',
      question: '💳 Is this a one-time payment?',
      answer: 'Yes, strictly a 1-time payment of ₹299 (or ₹1 test price). Zero recurring fees and zero monthly subscriptions.',
      actionText: 'Get Instant Access',
      actionLink: '#checkout-section',
    },
  ];

  const handleQuestionClick = (qa: ChatQA) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: qa.question },
      { sender: 'bot', text: qa.answer, actionText: qa.actionText, actionLink: qa.actionLink },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Pill */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-white/20 transition-all hover:scale-105 cursor-pointer animate-bounce"
        >
          <Bot className="w-5 h-5 text-amber-300" />
          <span>Need Help? Ask Planner AI</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl border-2 border-rose-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <Bot className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h4 className="text-sm font-black flex items-center gap-1.5">
                  Planner Assistant AI <Sparkles className="w-3 h-3 text-amber-300" />
                </h4>
                <span className="text-[10px] text-emerald-200 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Online • Instant Answers
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-tr-none font-bold'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none font-medium leading-relaxed'
                  }`}
                >
                  {m.text}
                </div>

                {m.actionText && m.actionLink && (
                  <a
                    href={m.actionLink}
                    onClick={() => setIsOpen(false)}
                    className="mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] px-3.5 py-1.5 rounded-xl shadow-md flex items-center gap-1 transition-transform hover:scale-105"
                  >
                    <span>{m.actionText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Preset Questions Chips Footer */}
          <div className="p-3 bg-white border-t border-slate-200 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Click a Question for Instant Answer:
            </span>

            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
              {presetQuestions.map((qa) => (
                <button
                  key={qa.id}
                  onClick={() => handleQuestionClick(qa)}
                  className="bg-slate-100 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 border border-slate-200 text-slate-700 text-[11px] font-bold px-2.5 py-1.5 rounded-xl transition-all text-left cursor-pointer"
                >
                  {qa.question}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </>
  );
};
