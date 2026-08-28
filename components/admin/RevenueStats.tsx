'use client';

import React from 'react';
import { DollarSign, ShoppingBag, Sparkles, TrendingUp, Users, ArrowUpRight } from 'lucide-react';

interface StatsProps {
  stats: {
    totalRevenue: number;
    totalOrders: number;
    bumpOrdersCount: number;
    bumpRevenue: number;
    bumpTakeRate: number;
    averageOrderValue: number;
  };
}

export const RevenueStats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      
      {/* 1. Total Gross Revenue */}
      <div className="clean-card rounded-2xl p-5 bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Earnings</span>
          <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
            ₹{stats.totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold pt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+24.5% vs last week</span>
          </div>
        </div>
      </div>

      {/* 2. Total Orders */}
      <div className="clean-card rounded-2xl p-5 bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Orders</span>
          <div className="p-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-100">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
            {stats.totalOrders} Buyers
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium pt-1">
            <span>100% Verified Digital Deliveries</span>
          </div>
        </div>
      </div>

      {/* 3. Order Bump Performance */}
      <div className="clean-card rounded-2xl p-5 bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Order Bump (+₹99)</span>
          <div className="p-2 bg-amber-50 text-amber-700 rounded-xl border border-amber-100">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
            {stats.bumpTakeRate}% Take Rate
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-800 font-semibold pt-1">
            <span>₹{stats.bumpRevenue.toLocaleString('en-IN')} extra revenue ({stats.bumpOrdersCount} buyers)</span>
          </div>
        </div>
      </div>

      {/* 4. Average Order Value (AOV) */}
      <div className="clean-card rounded-2xl p-5 bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Order Value (AOV)</span>
          <div className="p-2 bg-purple-50 text-purple-700 rounded-xl border border-purple-100">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
            ₹{stats.averageOrderValue}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-purple-800 font-semibold pt-1">
            <span>+₹{(stats.averageOrderValue - 299)} uplift over base ₹299</span>
          </div>
        </div>
      </div>

    </div>
  );
};
