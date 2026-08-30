'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: string[];
  ctaUrl?: string;
  ctaText?: string;
}

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hi there! 👋 I am your AI Career Assistant. How can I help you clear your doubts today?',
      options: [
        'How do I receive the PDF kit?',
        'Is this one-time payment or monthly?',
        'Does this work for Freshers / IT / Sales?',
        'Do I need paid ChatGPT Plus?',
        'What is in the [+ ₹99] Order Bump?',
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Fixed Questions & Fixed Answers Database
  const qaKnowledgeBase: { [key: string]: { text: string; ctaText?: string; ctaUrl?: string } } = {
    'How do I receive the PDF kit?': {
      text: '⚡ Instant Delivery! As soon as you complete payment via UPI, GPay, or Card, the download link appears instantly on your screen AND a copy is sent to your email in under 5 seconds.',
      ctaText: 'Claim ₹199 Access Now',
      ctaUrl: '#checkout-section',
    },
    'Is this one-time payment or monthly?': {
      text: '🎉 100% One-Time Payment! You pay only ₹199 (or ₹1 test price) once. There are zero recurring monthly subscriptions, and you get lifetime access + free future updates.',
      ctaText: 'Get Lifetime Access — ₹199',
      ctaUrl: '#checkout-section',
    },
    'Does this work for Freshers / IT / Sales?': {
      text: '✅ Yes! Section 1 includes 10 dedicated resume templates & ATMR formulas tailored for Freshers/Campus, Experienced Pros (Mid-Senior), Career Switchers, Software Engineers, Digital Marketers, Sales, Finance & Support roles.',
      ctaText: 'See 10 Resume Templates',
      ctaUrl: '#checkout-section',
    },
    'Do I need paid ChatGPT Plus?': {
      text: '💡 No paid subscription required! All 65+ AI prompts, keyword extractors, and the 6-round AI Mock Interviewer work 100% perfectly with free ChatGPT, Claude, or Gemini.',
    },
    'What is in the [+ ₹99] Order Bump?': {
      text: '🚀 The Order Bump [+ ₹99] includes 10 Editable Microsoft Word (.docx) resume templates and a pre-built Notion Job Application Tracker Dashboard to manage all your job applications.',
      ctaText: 'Add Order Bump on Checkout',
      ctaUrl: '#checkout-section',
    },
    'Can I get a refund if not satisfied?': {
      text: '🛡️ Yes! We offer a 7-day 100% money-back guarantee. If you follow the 38-page system and do not get improved resume responses, contact support@aijobkit.in for an immediate full refund.',
    },
  };

  const handleSelectOption = (questionText: string) => {
    // Add user message
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: questionText,
    };

    // Lookup fixed answer
    const answer = qaKnowledgeBase[questionText] || {
      text: `Thanks for asking! Regarding "${questionText}": You get instant digital delivery of all 38 pages, 10 ATS templates & 65+ AI prompts for ₹199 with a 100% money-back guarantee.`,
      ctaText: 'Proceed to Checkout',
      ctaUrl: '#checkout-section',
    };

    const botMsg: ChatMessage = {
      id: `bot_${Date.now()}`,
      sender: 'bot',
      text: answer.text,
      ctaText: answer.ctaText,
      ctaUrl: answer.ctaUrl,
      options: Object.keys(qaKnowledgeBase).filter((q) => q !== questionText).slice(0, 4),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const query = inputQuery.trim();
    setInputQuery('');

    // Find best match in knowledge base
    const matchedKey = Object.keys(qaKnowledgeBase).find(
      (k) => k.toLowerCase().includes(query.toLowerCase()) || query.toLowerCase().includes(k.toLowerCase().slice(0, 10))
    );

    if (matchedKey) {
      handleSelectOption(matchedKey);
    } else {
      const userMsg: ChatMessage = {
        id: `user_${Date.now()}`,
        sender: 'user',
        text: query,
      };

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: `Thanks for your question! The AI Job Application Kit gives you instant 38-page PDF access, 10 ATS templates, 65+ AI prompts, and a 6-round AI Mock Interviewer for ₹199 (one-time payment). Feel free to tap any topic below or chat with support at support@aijobkit.in!`,
        ctaText: 'Claim ₹199 Access Now',
        ctaUrl: '#checkout-section',
        options: [
          'How do I receive the PDF kit?',
          'Is this one-time payment or monthly?',
          'Does this work for Freshers / IT / Sales?',
          'Do I need paid ChatGPT Plus?',
        ],
      };

      setMessages((prev) => [...prev, userMsg, botMsg]);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome_reset',
        sender: 'bot',
        text: 'Chat reset! 👋 Ask me any question or pick a doubt below:',
        options: [
          'How do I receive the PDF kit?',
          'Is this one-time payment or monthly?',
          'Does this work for Freshers / IT / Sales?',
          'Do I need paid ChatGPT Plus?',
          'What is in the [+ ₹99] Order Bump?',
        ],
      },
    ]);
  };

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm px-4 py-3 rounded-full shadow-2xl border-2 border-emerald-400 flex items-center gap-2.5 transition-all transform hover:scale-105 cursor-pointer animate-float-slow"
        >
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </div>
          <Bot className="w-5 h-5 text-white" />
          <span>AI Doubt Assistant 🤖</span>
        </button>
      )}

      {/* Chatbot Interface Modal */}
      {isOpen && (
        <div className="clean-card rounded-3xl bg-white border border-slate-200 shadow-2xl max-w-sm sm:max-w-md w-[350px] sm:w-[400px] h-[520px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm flex items-center gap-1.5">
                  AI Doubt Clearance Assistant
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">Instant answers to your pre-purchase questions</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reset Chat"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl space-y-2 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white font-medium rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                  {/* Optional CTA Button inside bot message */}
                  {msg.ctaUrl && (
                    <div className="pt-1">
                      <a
                        href={msg.ctaUrl}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpen(false);
                          const el = document.getElementById('checkout-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] px-3 py-1.5 rounded-lg shadow transition-all cursor-pointer"
                      >
                        <span>{msg.ctaText || 'Get Instant Access'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Quick Fixed Question Option Chips */}
                {msg.options && msg.options.length > 0 && (
                  <div className="mt-2.5 space-y-1.5 max-w-[95%]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Tap a doubt to clear:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelectOption(opt)}
                          className="bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 font-bold px-2.5 py-1 rounded-xl text-[11px] text-left transition-all shadow-sm cursor-pointer"
                        >
                          💬 {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Fixed Question Write-In Footer Input */}
          <form onSubmit={handleCustomSubmit} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask a question or tap option above..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition-colors"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl shadow transition-all shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
