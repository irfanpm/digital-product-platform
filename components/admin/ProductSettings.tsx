'use client';

import React, { useState, useEffect } from 'react';
import { 
  Link as LinkIcon, 
  DollarSign, 
  Key, 
  Save, 
  Check, 
  FileText, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const ProductSettings: React.FC = () => {
  const [productDriveUrl, setProductDriveUrl] = useState<string>('');
  const [orderBumpDriveUrl, setOrderBumpDriveUrl] = useState<string>('');
  const [basePrice, setBasePrice] = useState<number>(299);
  const [bumpPrice, setBumpPrice] = useState<number>(99);
  const [adminPin, setAdminPin] = useState<string>('admin123');

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (data.success && data.setting) {
        setProductDriveUrl(data.setting.productDriveUrl || '');
        setOrderBumpDriveUrl(data.setting.orderBumpDriveUrl || '');
        setBasePrice(data.setting.basePrice || 299);
        setBumpPrice(data.setting.bumpPrice || 99);
        setAdminPin(data.setting.adminPin || 'admin123');
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productDriveUrl,
          orderBumpDriveUrl,
          basePrice: Number(basePrice),
          bumpPrice: Number(bumpPrice),
          adminPin,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage('✅ Google Drive Links & Product Pricing saved to MongoDB!');
        setTimeout(() => setMessage(''), 4000);
      } else {
        throw new Error(data.error || 'Failed to save settings');
      }
    } catch (err: any) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="clean-card rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm mb-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-emerald-600" />
            Digital Product & Google Drive Link Management
          </h3>
          <p className="text-xs text-slate-500">Configure your Google Drive PDF download link, Notion dashboard link, and pricing</p>
        </div>

        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
          ⚡ Automated Email Delivery Active
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. Main Product Google Drive Download Link */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" /> 38-Page PDF Google Drive Link *
              </span>
              {productDriveUrl && (
                <a href={productDriveUrl} target="_blank" rel="noreferrer" className="text-emerald-600 font-bold hover:underline flex items-center gap-1 text-[11px] lowercase">
                  Test Link <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </label>
            <input
              type="url"
              required
              placeholder="https://drive.google.com/file/d/YOUR_FILE_ID/view"
              value={productDriveUrl}
              onChange={(e) => setProductDriveUrl(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-mono transition-colors"
            />
            <p className="text-[11px] text-slate-500">
              This link is automatically sent to the buyer's email upon payment completion.
            </p>
          </div>

          {/* 2. Order Bump Notion / Word Templates Link */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" /> Order Bump Notion / Drive Link *
              </span>
              {orderBumpDriveUrl && (
                <a href={orderBumpDriveUrl} target="_blank" rel="noreferrer" className="text-emerald-600 font-bold hover:underline flex items-center gap-1 text-[11px] lowercase">
                  Test Link <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </label>
            <input
              type="url"
              required
              placeholder="https://notion.so/YOUR_WORD_TEMPLATES_AND_TRACKER"
              value={orderBumpDriveUrl}
              onChange={(e) => setOrderBumpDriveUrl(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-mono transition-colors"
            />
            <p className="text-[11px] text-slate-500">
              Delivered to buyers who select the 1-click Order Bump checkbox.
            </p>
          </div>

        </div>

        {/* Pricing & Admin Security Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          
          {/* Base Product Price */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Base Kit Price (₹ INR)</label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="number"
                min="1"
                required
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 font-bold font-mono focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Order Bump Price */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Order Bump Add-on (₹ INR)</label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="number"
                min="1"
                required
                value={bumpPrice}
                onChange={(e) => setBumpPrice(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 font-bold font-mono focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Admin Login Passcode */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Admin Login Passcode / PIN</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 font-bold font-mono focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

        </div>

        {/* Message & Save Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          
          {message && (
            <div className={`text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 ${
              message.startsWith('✅') 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                : 'bg-rose-100 text-rose-800 border border-rose-200'
            }`}>
              {message}
            </div>
          )}

          <div className="ml-auto">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving to Database...' : 'Save Product Settings'}</span>
            </button>
          </div>

        </div>

      </form>

    </div>
  );
};
