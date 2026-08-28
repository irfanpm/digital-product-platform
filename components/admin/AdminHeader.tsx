'use client';

import React from 'react';
import Link from 'next/link';
import { Download, RefreshCw, Layers, ShieldCheck, ArrowLeft, Calendar } from 'lucide-react';

interface AdminHeaderProps {
  dateRange: string;
  setDateRange: (val: string) => void;
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
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200 text-slate-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                Seller Sales Admin
              </h1>
              <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                LIVE REVENUE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              The AI Job Application Kit (2026 Edition) • Sales & Customer Ledger
            </p>
          </div>
        </div>

        {/* Controls: Date Filter, CSV Export, Refresh */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          
          {/* Date Filter Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            {['today', '7days', '30days', 'all'].map((val) => (
              <button
                key={val}
                onClick={() => setDateRange(val)}
                className={`px-3 py-1.5 rounded-lg transition-all capitalize ${
                  dateRange === val
                    ? 'bg-white text-slate-900 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {val === 'today' ? 'Today' : val === '7days' ? '7 Days' : val === '30days' ? '30 Days' : 'All Time'}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          {/* Export CSV Button */}
          <button
            onClick={onExportCSV}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Buyers CSV</span>
          </button>

        </div>

      </div>
    </header>
  );
};
