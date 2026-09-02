'use client';

import React from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Sparkles, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  Eye, 
  MousePointerClick, 
  Percent,
  Activity
} from 'lucide-react';

interface StatsProps {
  stats?: {
    totalRevenue?: number;
    totalOrders?: number;
    bumpOrdersCount?: number;
    bumpRevenue?: number;
    bumpTakeRate?: number;
    averageOrderValue?: number;
    pageViews?: number;
    ctaClicks?: number;
    conversionRate?: number;
    clickThroughRate?: number;
  } | null;
}

export const RevenueStats: React.FC<StatsProps> = ({ stats }) => {
  const safeStats = {
    totalRevenue: stats?.totalRevenue ?? 0,
    totalOrders: stats?.totalOrders ?? 0,
    bumpOrdersCount: stats?.bumpOrdersCount ?? 0,
    bumpRevenue: stats?.bumpRevenue ?? 0,
    bumpTakeRate: stats?.bumpTakeRate ?? 0,
    averageOrderValue: stats?.averageOrderValue ?? 0,
    pageViews: stats?.pageViews ?? 0,
    ctaClicks: stats?.ctaClicks ?? 0,
    conversionRate: stats?.conversionRate ?? 0,
    clickThroughRate: stats?.clickThroughRate ?? 0,
  };

  return (
    <div className="space-y-4 mb-8">
      
      {/* Top 4 Main Financial & Sales Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Total Gross Revenue */}
        <div className="clean-card rounded-2xl p-5 bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Revenue</span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              ₹{safeStats.totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold pt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Live Gross Earnings</span>
            </div>
          </div>
        </div>

        {/* 2. Total Orders / Buyers */}
        <div className="clean-card rounded-2xl p-5 bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Buyers</span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-100">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {safeStats.totalOrders} Purchases
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium pt-1">
              <span>Verified Digital Deliveries</span>
            </div>
          </div>
        </div>

        {/* 3. Website Visitors / Page Views */}
        <div className="clean-card rounded-2xl p-5 bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Landing Page Views</span>
            <div className="p-2 bg-purple-50 text-purple-700 rounded-xl border border-purple-100">
              <Eye className="w-5 h-5" />
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {safeStats.pageViews.toLocaleString('en-IN')} Views
            </div>
            <div className="flex items-center gap-1 text-[11px] text-purple-700 font-semibold pt-1">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>Real-Time Traffic Count</span>
            </div>
          </div>
        </div>

        {/* 4. Link & CTA Clicks */}
        <div className="clean-card rounded-2xl p-5 bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">CTA Link Clicks</span>
            <div className="p-2 bg-rose-50 text-rose-700 rounded-xl border border-rose-100">
              <MousePointerClick className="w-5 h-5" />
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {safeStats.ctaClicks.toLocaleString('en-IN')} Clicks
            </div>
            <div className="flex items-center gap-1 text-[11px] text-rose-700 font-semibold pt-1">
              <span>Checkout Button Intent</span>
            </div>
          </div>
        </div>

      </div>

      {/* Secondary 2-Card Conversion Performance Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Conversion Rate Card */}
        <div className="clean-card rounded-2xl p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-md">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-900 block">Store Conversion Rate</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-800 font-mono">
                {safeStats.conversionRate}%
              </span>
            </div>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium hidden sm:inline">
            (Total Purchases ÷ Total Visitors)
          </span>
        </div>

        {/* Click-Through Rate (CTR) */}
        <div className="clean-card rounded-2xl p-4 bg-gradient-to-r from-rose-50 to-purple-50 border border-rose-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-600 text-white rounded-xl shadow-md">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-900 block">Visitor Click-Through Rate (CTR)</span>
              <span className="text-xl sm:text-2xl font-black text-rose-800 font-mono">
                {safeStats.clickThroughRate}%
              </span>
            </div>
          </div>
          <span className="text-[11px] text-rose-700 font-medium hidden sm:inline">
            (CTA Clicks ÷ Total Visitors)
          </span>
        </div>

      </div>

    </div>
  );
};
