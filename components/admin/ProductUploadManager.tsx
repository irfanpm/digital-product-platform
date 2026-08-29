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
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export const ProductUploadManager: React.FC = () => {
  const [productDriveUrl, setProductDriveUrl] = useState<string>('');
  const [orderBumpDriveUrl, setOrderBumpDriveUrl] = useState<string>('');
  const [basePrice, setBasePrice] = useState<number>(299);
  const [bumpPrice, setBumpPrice] = useState<number>(99);
  const [enableOrderBump, setEnableOrderBump] = useState<boolean>(true);

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
        setEnableOrderBump(data.setting.enableOrderBump !== false);
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
          enableOrderBump,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage('✅ Product Download Links, Pricing & Order Bump Toggle Saved!');
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
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="clean-card rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl border border-emerald-200">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Product File Upload & Delivery Center</h2>
            <p className="text-xs text-slate-500">Manage digital PDF downloads, Google Drive links, and order bump ON/OFF controls</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-600" /> Automated Delivery Active
          </span>
        </div>
      </div>

      {/* Upload Dropzone & Link Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Drive Links & Price Settings Form */}
        <div className="lg:col-span-8 clean-card rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-6">
          
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" /> Digital Product Download Link Configuration
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Stored in MongoDB</span>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            
            {/* ON / OFF Toggle for 10 Editable Microsoft Word Order Bump Section */}
            <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <span className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" /> 
                  10 Editable Microsoft Word & Notion Templates Order Bump Section
                </span>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Turn ON or OFF the [+ ₹99] Order Bump checkbox box on the customer checkout page.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEnableOrderBump(!enableOrderBump)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
                  enableOrderBump
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-300 text-slate-700'
                }`}
              >
                {enableOrderBump ? (
                  <>
                    <ToggleRight className="w-5 h-5 text-white" />
                    <span>ON (Enabled)</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-5 h-5 text-slate-600" />
                    <span>OFF (Hidden)</span>
                  </>
                )}
              </button>
            </div>

            {/* 1. Main PDF Download Link */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" /> Main 38-Page PDF Google Drive Link *
                </span>
                {productDriveUrl && (
                  <a href={productDriveUrl} target="_blank" rel="noreferrer" className="text-emerald-600 font-bold hover:underline flex items-center gap-1 text-[11px] lowercase">
                    Test Download Link <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </label>
              <input
                type="url"
                required
                placeholder="https://drive.google.com/file/d/YOUR_FILE_ID/view"
                value={productDriveUrl}
                onChange={(e) => setProductDriveUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 font-mono placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition-colors"
              />
              <p className="text-[11px] text-slate-500">
                This link is automatically sent to the buyer's email and displayed on the confirmation screen immediately after payment.
              </p>
            </div>

            {/* 2. Order Bump Link */}
            {enableOrderBump && (
              <div className="space-y-2 animate-in fade-in duration-200">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" /> Order Bump Notion / Word Templates Link *
                  </span>
                  {orderBumpDriveUrl && (
                    <a href={orderBumpDriveUrl} target="_blank" rel="noreferrer" className="text-emerald-600 font-bold hover:underline flex items-center gap-1 text-[11px] lowercase">
                      Test Download Link <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://notion.so/YOUR_WORD_TEMPLATES_AND_TRACKER"
                  value={orderBumpDriveUrl}
                  onChange={(e) => setOrderBumpDriveUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 font-mono placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition-colors"
                />
                <p className="text-[11px] text-slate-500">
                  Delivered to buyers who select the 1-click Order Bump checkbox at checkout.
                </p>
              </div>
            )}

            {/* Price Config */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Base Kit Product Price (₹ INR)</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="number"
                    min="1"
                    required
                    value={basePrice}
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-slate-900 font-mono focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              {enableOrderBump && (
                <div className="space-y-1 animate-in fade-in duration-200">
                  <label className="text-xs font-bold text-slate-700">Order Bump Add-on Price (₹ INR)</label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="number"
                      min="1"
                      required
                      value={bumpPrice}
                      onChange={(e) => setBumpPrice(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-slate-900 font-mono focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions & Feedback */}
            <div className="flex items-center justify-between pt-2">
              {message && (
                <div className={`text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 ${
                  message.startsWith('✅') 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                    : 'bg-rose-100 text-rose-800 border border-rose-200'
                }`}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="ml-auto bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Updating Database...' : 'Save Product Settings'}</span>
              </button>
            </div>

          </form>

        </div>

        {/* Right Column: Upload Files Card & Active Digital Assets */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* File Upload Dropzone Simulator */}
          <div className="clean-card rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-emerald-600" /> Direct File Upload Dropzone
            </h4>

            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-3 bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-400 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-white text-emerald-600 rounded-full mx-auto flex items-center justify-center border border-slate-200 shadow-sm">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-900 block">Click or Drag PDF / Zip Files Here</span>
                <span className="text-[11px] text-slate-500 block">Supports PDF, DOCX, ZIP (Max 100 MB)</span>
              </div>
            </div>
          </div>

          {/* Active Product Assets Card */}
          <div className="clean-card rounded-3xl p-6 bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" /> Active Digital Product Assets
              </h4>
              <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                {enableOrderBump ? '2 Assets Live' : '1 Asset Live'}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-400" /> The_AI_Job_Kit_38Page_2026.pdf
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">4.2 MB</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Status: Active Delivery</span>
                  <span className="text-emerald-400 font-bold">Verified</span>
                </div>
              </div>

              {enableOrderBump && (
                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 space-y-1 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200 flex items-center gap-1.5">
                      <FolderArchive className="w-4 h-4 text-amber-400" /> 10_Word_Notion_Templates.zip
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">1.8 MB</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Status: Order Bump Add-on</span>
                    <span className="text-amber-400 font-bold">Verified</span>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
