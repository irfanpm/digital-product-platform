'use client';

import React from 'react';
import { BarChart3, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export const SalesChart: React.FC = () => {
  const dailyData = [
    { day: 'Mon', revenue: 14624, orders: 42, bumpOrders: 31 },
    { day: 'Tue', revenue: 18450, orders: 53, bumpOrders: 39 },
    { day: 'Wed', revenue: 21350, orders: 61, bumpOrders: 45 },
    { day: 'Thu', revenue: 19890, orders: 57, bumpOrders: 42 },
    { day: 'Fri', revenue: 24650, orders: 71, bumpOrders: 52 },
    { day: 'Sat', revenue: 28420, orders: 82, bumpOrders: 60 },
    { day: 'Sun (Today)', revenue: 31260, orders: 89, bumpOrders: 68 },
  ];

  const maxRevenue = 35000;

  return (
    <div className="clean-card rounded-3xl p-6 bg-white border border-slate-200 shadow-sm mb-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            7-Day Revenue & Order Volume Breakdown
          </h3>
          <p className="text-xs text-slate-500">Daily gross revenue and order bump conversion performance</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-600 inline-block"></span>
            <span className="text-slate-700">Gross Sales (₹)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-400 inline-block"></span>
            <span className="text-slate-700">Order Bump Add-on</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Visual */}
      <div className="pt-6 pb-2">
        <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 px-2">
          {dailyData.map((d, i) => {
            const heightPercent = Math.round((d.revenue / maxRevenue) * 100);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                  ₹{d.revenue.toLocaleString('en-IN')}
                </div>

                <div className="w-full max-w-[48px] bg-slate-100 rounded-xl overflow-hidden flex flex-col justify-end p-0.5 border border-slate-200 relative h-40">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-emerald-600 rounded-lg group-hover:bg-emerald-500 transition-all flex flex-col justify-between p-1 relative"
                  >
                    <div
                      style={{ height: `${(d.bumpOrders / d.orders) * 100}%` }}
                      className="w-full bg-amber-400 rounded-sm opacity-80"
                      title={`${d.bumpOrders} bump orders`}
                    />
                  </div>
                </div>

                <span className="text-[11px] font-bold text-slate-700 text-center">
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer stats summary */}
      <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-600">
        <div>
          <span className="text-slate-400 block">Peak Revenue Day:</span>
          <strong className="text-slate-900 font-bold">Sunday (₹31,260)</strong>
        </div>
        <div>
          <span className="text-slate-400 block">Top Traffic Source:</span>
          <strong className="text-slate-900 font-bold">Meta Ads (Meta Pixel ID Verified)</strong>
        </div>
        <div>
          <span className="text-slate-400 block">Checkout Conversion Rate:</span>
          <strong className="text-emerald-700 font-bold">4.8% Page Visit → Paid</strong>
        </div>
        <div>
          <span className="text-slate-400 block">Digital Delivery Success:</span>
          <strong className="text-emerald-700 font-bold">99.8% (&lt;5 Seconds)</strong>
        </div>
      </div>

    </div>
  );
};
