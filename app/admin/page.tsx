'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSidebar, AdminTab } from '@/components/admin/AdminSidebar';
import { RevenueStats } from '@/components/admin/RevenueStats';
import { SalesChart } from '@/components/admin/SalesChart';
import { BuyersTable } from '@/components/admin/BuyersTable';
import { ProductUploadManager } from '@/components/admin/ProductUploadManager';
import { ProductSettings } from '@/components/admin/ProductSettings';
import { AlertCircle, RefreshCw, ShieldCheck } from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [dateRange, setDateRange] = useState<string>('all');

  const [stats, setStats] = useState<any>(null);
  const [dailyChartData, setDailyChartData] = useState<any[]>([]);
  const [buyers, setBuyers] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState<string>('Connecting to Database...');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('admin_authenticated');
      if (auth !== 'true') {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  const fetchAdminData = async () => {
    setIsLoading(true);
    setError('');

    try {
      const pin = localStorage.getItem('admin_pin') || '';
      const res = await fetch('/api/admin/orders', {
        headers: {
          Authorization: `Bearer ${pin}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem('admin_authenticated');
        router.push('/admin/login');
        return;
      }

      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setDailyChartData(data.dailyChartData || []);
        setBuyers(data.buyers || []);
        setDataSource(data.source || 'MongoDB Cloud Database');
      } else {
        throw new Error(data.error || 'Failed to retrieve ledger data');
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message || 'Could not connect to backend server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
    }
  }, [isAuthenticated, dateRange]);

  const handleExportCSV = () => {
    if (buyers.length === 0) {
      alert('No buyer orders recorded yet to export.');
      return;
    }

    const headers = ['Order ID', 'Payment ID', 'Customer Name', 'Email', 'Phone', 'Date', 'Amount (INR)', 'Order Bump Added', 'Status', 'Package Purchased'];
    const csvRows = [
      headers.join(','),
      ...buyers.map((b) =>
        [
          `"${b.id}"`,
          `"${b.paymentId}"`,
          `"${b.name.replace(/"/g, '""')}"`,
          `"${b.email}"`,
          `"${b.phone}"`,
          `"${b.date}"`,
          b.amount,
          b.hasOrderBump ? 'Yes (+₹99)' : 'No',
          b.status,
          `"${b.package}"`,
        ].join(',')
      ),
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `real_buyers_mongodb_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearOrders = async () => {
    const confirmReset = window.confirm(
      'Are you sure you want to clear all test orders and reset the purchase count to 0?'
    );
    if (!confirmReset) return;

    try {
      const pin = localStorage.getItem('admin_pin') || '';
      const res = await fetch('/api/admin/orders', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${pin}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        alert('Dashboard and customer purchase count successfully reset to 0!');
        fetchAdminData();
      } else {
        alert(data.error || 'Failed to clear orders');
      }
    } catch (err: any) {
      alert(`Error clearing orders: ${err.message}`);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_authenticated');
      localStorage.removeItem('admin_pin');
    }
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-500 font-mono">
        Checking authentication...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-rose-500 selection:text-white w-full">
      
      {/* 1. Admin Sticky Full-Width Header */}
      <AdminHeader
        dateRange={dateRange}
        setDateRange={setDateRange}
        onRefresh={fetchAdminData}
        onExportCSV={handleExportCSV}
        onClearOrders={handleClearOrders}
      />

      {/* 2. Admin Sidebar & Main Workspace Layout (Full-Width Edge-to-Edge) */}
      <div className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Admin Sidebar */}
          <AdminSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
          />

          {/* Dedicated Tab Section Workspace */}
          <div className="flex-1 space-y-6 min-w-0 relative">
            
            {/* Database & Memory Health Indicator Pill */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-600">Active Storage:</span>
                <span className="font-extrabold text-slate-900 font-mono">{dataSource}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Protected by PIN Authentication</span>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
                <button
                  onClick={fetchAdminData}
                  className="ml-auto underline font-bold hover:text-rose-900"
                >
                  Retry Connection
                </button>
              </div>
            )}

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <RevenueStats stats={stats} />
                <div className="grid grid-cols-1 gap-6">
                  <SalesChart dailyData={dailyChartData} totalOrders={stats?.totalOrders || 0} />
                  <BuyersTable buyers={buyers} />
                </div>
              </div>
            )}

            {/* TAB 2: BUYERS / CUSTOMER LEDGER */}
            {activeTab === 'buyers' && (
              <div className="space-y-6">
                <BuyersTable buyers={buyers} />
              </div>
            )}

            {/* TAB 3: PRODUCT UPLOAD & GOOGLE DRIVE MANAGER */}
            {activeTab === 'product_upload' && (
              <div className="space-y-6">
                <ProductUploadManager />
              </div>
            )}

            {/* TAB 4: PIXEL & SECURITY */}
            {(activeTab === 'pixel' || activeTab === 'security') && (
              <div className="space-y-6">
                <ProductSettings />
              </div>
            )}

          </div>

        </div>
      </div>
    </main>
  );
}
