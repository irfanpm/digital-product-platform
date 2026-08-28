'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';

interface DailyData {
  day: string;
  revenue: number;
  orders: number;
  bumpOrders: number;
}

interface SalesChartProps {
  dailyData?: DailyData[];
  totalOrders?: number;
}

export const SalesChart: React.FC<SalesChartProps> = ({ dailyData = [], totalOrders = 0 }) => {
  const fallbackDays = [
    { day: 'Mon', revenue: 0, orders: 0, bumpOrders: 0 },
    { day: 'Tue', revenue: 0, orders: 0, bumpOrders: 0 },
    { day: 'Wed', revenue: 0, orders: 0, bumpOrders: 0 },
    { day: 'Thu', revenue: 0, orders: 0, bumpOrders: 0 },
    { day: 'Fri', revenue: 0, orders: 0, bumpOrders: 0 },
    { day: 'Sat', revenue: 0, orders: 0, bumpOrders: 0 },
    { day: 'Sun', revenue: 0, orders: 0, bumpOrders: 0 },
  ];

  const displayData = dailyData.length > 0 ? dailyData : fallbackDays;
  const maxRevenue = Math.max(...displayData.map((d) => d.revenue), 10);

  return (
    <div className="clean-card rounded-3xl p-6 bg-white border border-slate-200 shadow-sm mb-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            Real 7-Day Revenue & Order Volume Breakdown
          </h3>
          <p className="text-xs text-slate-500">Live gross revenue and order bump conversion performance calculated from MongoDB</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-600 inline-block"></span>
            <span className="text-slate-700">Real Sales (₹)</span>
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
          {displayData.map((d, i) => {
            const heightPercent = d.revenue > 0 ? Math.round((d.revenue / maxRevenue) * 100) : 4;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="text-[10px] font-mono text-slate-600 font-bold">
                  ₹{d.revenue.toLocaleString('en-IN')}
                </div>

                <div className="w-full max-w-[48px] bg-slate-100 rounded-xl overflow-hidden flex flex-col justify-end p-0.5 border border-slate-200 relative h-40">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-lg transition-all flex flex-col justify-between p-1 relative ${
                      d.revenue > 0 ? 'bg-emerald-600 group-hover:bg-emerald-500' : 'bg-slate-200'
                    }`}
                  >
                    {d.bumpOrders > 0 && (
                      <div
                        style={{ height: `${(d.bumpOrders / d.orders) * 100}%` }}
                        className="w-full bg-amber-400 rounded-sm opacity-90"
                        title={`${d.bumpOrders} bump orders`}
                      />
                    )}
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
          <span className="text-slate-400 block">Total Real Orders:</span>
          <strong className="text-slate-900 font-bold">{totalOrders} Buyers Recorded</strong>
        </div>
        <div>
          <span className="text-slate-400 block">Database Source:</span>
          <strong className="text-slate-900 font-bold">MongoDB Localhost</strong>
        </div>
        <div>
          <span className="text-slate-400 block">Delivery SLA:</span>
          <strong className="text-emerald-700 font-bold">Instant (&lt;5 Seconds)</strong>
        </div>
        <div>
          <span className="text-slate-400 block">SSL Security:</span>
          <strong className="text-emerald-700 font-bold">256-Bit Encrypted</strong>
        </div>
      </div>

    </div>
  );
};
