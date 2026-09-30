'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  Save, 
  ExternalLink, 
  UploadCloud, 
  CheckCircle2, 
  DollarSign,
  Lock,
  FileCheck,
  Zap,
  FolderArchive,
  Calendar,
  Gift,
  Palette
} from 'lucide-react';

export const ProductUploadManager: React.FC = () => {
  const [productDriveUrl, setProductDriveUrl] = useState<string>('');
  const [basePrice, setBasePrice] = useState<number>(199);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [settingsReady, setSettingsReady] = useState(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/settings', { headers: { Authorization: `Bearer ${localStorage.getItem('admin_pin') || ''}` }, cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Settings unavailable');
      if (data.success && data.setting) {
        setProductDriveUrl(data.setting.productDriveUrl || '');
        setSettingsReady(true);
        setBasePrice(data.setting.basePrice || 199);
      }
    } catch (err) {
      setMessage('Could not load protected settings. Sign in again or retry.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setMessage('Saving product settings to database...');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('admin_pin') || ''}` },
        body: JSON.stringify({
          productDriveUrl: productDriveUrl.trim(),
          basePrice: Number(basePrice) || 199,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage('✅ Money Saving System Drive Link & Pricing Saved!');
        setTimeout(() => setMessage(''), 4000);
      } else {
        throw new Error(data.error || 'Failed to save settings');
      }
    } catch (err: any) {
      console.error('Save error:', err);
      setMessage(`❌ Error saving: ${err.message || 'Server connection error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="clean-card rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl border border-rose-200">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Money Saving System Asset Manager</h2>
            <p className="text-xs text-slate-500">Manage the savings tracker, printable challenges, user guide and bundle price</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-600" /> Delivery configuration
          </span>
        </div>
      </div>

      {/* Upload Dropzone & Link Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Drive Links & Price Settings Form */}
        <div className="lg:col-span-8 clean-card rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-6">
          
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-rose-600" /> Digital Product Download Link Configuration
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Stored in MongoDB</span>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            
            {/* 1. Main Planner Bundle Google Drive Link */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-rose-600" /> Money Saving System Bundle Google Drive Link *
                </span>
                {productDriveUrl && (
                  <a href={productDriveUrl} target="_blank" rel="noreferrer" className="text-rose-600 font-bold hover:underline flex items-center gap-1 text-[11px] lowercase">
                    Test Download Link <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </label>
              <input
                type="text"
                placeholder="https://drive.google.com/file/d/YOUR_PLANNER_BUNDLE_ID/view"
                value={productDriveUrl}
                onChange={(e) => setProductDriveUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 font-mono placeholder-slate-400 focus:outline-none focus:border-rose-500 transition-colors"
              />
              <p className="text-[11px] text-slate-500">
                Use your existing Drive bundle containing the Excel tracker, all 12 printable challenges and the user guide. Access is granted after verified payment.
              </p>
            </div>

            {/* Price Config */}
            <div className="pt-4 border-t border-slate-100">
              <div className="space-y-1 max-w-xs">
                <label className="text-xs font-bold text-slate-700">Bundle Base Price (₹ INR)</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="number"
                    min="1"
                    value={basePrice}
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-slate-900 font-mono focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
            </div>

            {/* Actions & Feedback */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              {message && (
                <div className={`text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-2 ${
                  message.startsWith('✅') 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                    : message.startsWith('❌')
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  <span>{message}</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => handleSave()}
                disabled={isSaving || isLoading || !settingsReady}
                className="ml-auto bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-black text-xs px-7 py-3.5 rounded-xl shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving to Database...' : 'Save Bundle Settings'}</span>
              </button>
            </div>

          </form>

        </div>

        {/* Right Column: Active Digital Assets */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active Product Assets Card */}
          <div className="clean-card rounded-3xl p-6 bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-rose-400" /> Expected Bundle Contents
              </h4>
              <span className="text-[10px] text-rose-400 font-mono font-bold bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                3 deliverables
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-rose-400" /> Smart Excel Savings Tracker
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Excel</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Workbook with dashboard and daily plan</span>
                  <span className="text-emerald-400 font-bold">Check in Drive</span>
                </div>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-pink-400" /> Printable Savings Challenges
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">PDF</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>12 savings goals</span>
                  <span className="text-pink-400 font-bold">Check in Drive</span>
                </div>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <FolderArchive className="w-4 h-4 text-purple-400" /> Step-by-Step User Guide
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">PDF</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Setup and daily use instructions</span>
                  <span className="text-purple-400 font-bold">Check in Drive</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
