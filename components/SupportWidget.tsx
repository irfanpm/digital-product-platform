'use client';

import React, { useState } from 'react';
import { HelpCircle, X, MessageCircle, Mail, Sparkles, Heart } from 'lucide-react';

export const SupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {/* Floating Helper Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs px-3.5 py-2.5 rounded-full shadow-xl border border-slate-200 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-rose-500" />
          <span>Support & Help</span>
        </button>
      )}

      {/* Floating Support Modal */}
      {isOpen && (
        <div className="fixed bottom-6 left-4 sm:left-6 z-50 w-[90vw] sm:w-[320px] bg-white rounded-3xl shadow-2xl border-2 border-rose-200 p-5 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm">
                🌸
              </span>
              <div>
                <h4 className="text-xs font-black text-slate-900">Planner VIP Support</h4>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available 24/7
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Need assistance downloading your Google Drive bundle or importing into GoodNotes / Penly? We are here to help!
          </p>

          <div className="space-y-2 pt-1">
            <a
              href="mailto:muhammedirfanpm@gmail.com?subject=Digital%20Planner%20Support%20Request"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-rose-400" />
              <span>Email Support Team</span>
            </a>

            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20with%20my%20All-In-One%20Digital%20Planner"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Instant Chat</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
