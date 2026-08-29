'use client';

import React from 'react';
import { 
  BarChart3, 
  UploadCloud, 
  Users, 
  Target, 
  ShieldCheck, 
  LogOut, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export type AdminTab = 'overview' | 'product_upload' | 'buyers' | 'pixel' | 'security';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  onLogout,
}) => {
  const menuItems = [
    {
      id: 'overview' as AdminTab,
      label: 'Sales Overview',
      icon: BarChart3,
      badge: 'Live',
    },
    {
      id: 'product_upload' as AdminTab,
      label: 'Product & File Upload',
      icon: UploadCloud,
      badge: 'Google Drive',
    },
    {
      id: 'buyers' as AdminTab,
      label: 'Customer Ledger',
      icon: Users,
      badge: 'MongoDB',
    },
    {
      id: 'pixel' as AdminTab,
      label: 'Meta Pixel Tracking',
      icon: Target,
      badge: 'FB Ads',
    },
    {
      id: 'security' as AdminTab,
      label: 'Security Settings',
      icon: ShieldCheck,
      badge: 'PIN',
    },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 shadow-xl flex flex-col justify-between shrink-0">
      
      <div className="space-y-6">
        
        {/* Brand Header */}
        <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500 text-slate-950 rounded-xl shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-white tracking-tight">Seller Control Center</h2>
              <p className="text-[11px] text-slate-400">AI Job Kit (2026)</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-emerald-700 text-emerald-100'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                </div>
              </button>
            );
          })}
        </nav>

      </div>

      {/* Footer / Quick Links */}
      <div className="pt-6 border-t border-slate-800 space-y-3 mt-6">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between text-xs text-slate-400 hover:text-emerald-400 transition-colors font-medium"
        >
          <span>View Live Landing Page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <button
          onClick={onLogout}
          className="w-full bg-slate-800 hover:bg-rose-900/50 text-slate-300 hover:text-rose-300 font-bold text-xs py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout Admin</span>
        </button>
      </div>

    </aside>
  );
};
