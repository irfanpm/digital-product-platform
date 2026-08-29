'use client';

import React from 'react';
import { RefreshCw, Download, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

interface AdminHeaderProps {
  dateRange: string;
  setDateRange: (range: string) => void;
  onRefresh: () => void;
  onExportCSV: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  dateRange,
  setDateRange,
  onRefresh,
  onExportCSV,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3.5 px-4 sm:px-8 shadow-sm w-full">
      <div className="w-full max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Title & Live Indicator */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
            title="Back to Landing Page"
          >
            <ArrowLeft className="w-4 h-4" />
          </a>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Seller Sales Admin
              </h1>
              <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                LIVE REVENUE
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              The AI Job Application Kit (2026 Edition) • Real-Time Sales & Customer Ledger
            </p>
          </div>
        </div>

        {/* Right Actions & Date Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Time Filter Pills */}
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs flex items-center font-semibold">
            {['today', '7days', '30days', 'all'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 rounded-lg transition-all capitalize ${
                  dateRange === range
                    ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {range === '7days' ? '7 Days' : range === '30days' ? '30 Days' : range === 'all' ? 'All Time' : 'Today'}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Refresh</span>
          </button>

          {/* Export Buyers CSV */}
          <button
            onClick={onExportCSV}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer border border-emerald-400/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Buyers CSV</span>
          </button>

        </div>

      </div>
    </header>
  );
};
