'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Send, 
  Copy, 
  Check, 
  UserCheck, 
  Sparkles, 
  CreditCard,
  Mail,
  Phone,
  Calendar,
  ExternalLink
} from 'lucide-react';

export interface Buyer {
  id: string;
  paymentId: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  amount: number;
  hasOrderBump: boolean;
  status: string;
  package: string;
}

interface BuyersTableProps {
  buyers: Buyer[];
}

export const BuyersTable: React.FC<BuyersTableProps> = ({ buyers }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterBump, setFilterBump] = useState<string>('all'); // all, bump, standard
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sentEmailId, setSentEmailId] = useState<string | null>(null);

  const filteredBuyers = buyers.filter((buyer) => {
    const matchesSearch =
      buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buyer.phone.includes(searchTerm) ||
      buyer.paymentId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterBump === 'all' ||
      (filterBump === 'bump' && buyer.hasOrderBump) ||
      (filterBump === 'standard' && !buyer.hasOrderBump);

    return matchesSearch && matchesFilter;
  });

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResendLink = (email: string, id: string) => {
    setSentEmailId(id);
    setTimeout(() => setSentEmailId(null), 2500);
    alert(`Re-sent instant 38-page PDF & Notion download package to ${email}`);
  };

  return (
    <div className="clean-card rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-6">
      
      {/* Header & Search / Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-600" />
            Customer & Buyer Transactions ({filteredBuyers.length})
          </h3>
          <p className="text-xs text-slate-500">Real-time ledger of digital product purchases and instant delivery logs</p>
        </div>

        {/* Search & Filter Inputs */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition-colors"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={filterBump}
              onChange={(e) => setFilterBump(e.target.value)}
              className="bg-transparent text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">All Packages</option>
              <option value="bump">Kit + Bump (₹398)</option>
              <option value="standard">Standard Kit (₹299)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider text-[10px] border-y border-slate-200">
            <tr>
              <th className="py-3 px-4">Date & Time</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Package Purchased</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Razorpay Payment ID</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredBuyers.length > 0 ? (
              filteredBuyers.map((buyer) => (
                <tr key={buyer.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Date */}
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {buyer.date}
                  </td>

                  {/* Customer Info */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{buyer.name}</div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" /> {buyer.email}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" /> {buyer.phone}
                      </span>
                    </div>
                  </td>

                  {/* Package Purchased */}
                  <td className="py-3.5 px-4">
                    {buyer.hasOrderBump ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                        <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
                        Kit + Word/Notion Bump
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                        Standard 38-Page Kit
                      </span>
                    )}
                  </td>

                  {/* Amount Paid */}
                  <td className="py-3.5 px-4 font-mono font-black text-slate-900 text-sm">
                    ₹{buyer.amount}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <Check className="w-3 h-3" /> {buyer.status}
                    </span>
                  </td>

                  {/* Payment ID */}
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                    {buyer.paymentId}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      
                      {/* Copy Email */}
                      <button
                        onClick={() => handleCopyEmail(buyer.email, buyer.id)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Copy Customer Email"
                      >
                        {copiedId === buyer.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Resend Link */}
                      <button
                        onClick={() => handleResendLink(buyer.email, buyer.id)}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg border border-emerald-200 text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                        title="Resend Instant PDF Download Link"
                      >
                        {sentEmailId === buyer.id ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Send className="w-3 h-3" />
                        )}
                        <span>{sentEmailId === buyer.id ? 'Sent!' : 'Resend PDF'}</span>
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No buyer transactions found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
