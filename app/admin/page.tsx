'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSidebar, AdminTab } from '@/components/admin/AdminSidebar';
import { RevenueStats } from '@/components/admin/RevenueStats';
import { SalesChart } from '@/components/admin/SalesChart';
import { ProductSettings } from '@/components/admin/ProductSettings';
import { ProductUploadManager } from '@/components/admin/ProductUploadManager';
import { BuyersTable, Buyer } from '@/components/admin/BuyersTable';
import { LegalFooter } from '@/components/LegalFooter';

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [dateRange, setDateRange] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    bumpOrdersCount: 0,
    bumpRevenue: 0,
    bumpTakeRate: 0,
    averageOrderValue: 0,
  });
  const [dailyChartData, setDailyChartData] = useState<any[]>([]);
  const [buyers, setBuyers] = useState<Buyer[]>([]);

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
    try {
      const pin = localStorage.getItem('admin_pin') || '';
      const res = await fetch('/api/admin/orders', {
        headers: { 'Authorization': `Bearer ${pin}` }
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setDailyChartData(data.dailyChartData || []);
        setBuyers(data.buyers || []);
      } else {
        if (data.error === 'Unauthorized') {
          alert('Your session is invalid. Please log out and log back in.');
          handleLogout();
        } else {
          alert('Failed to load customers: ' + data.error);
        }
      }
    } catch (err) {
      console.error('Error fetching real admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
    }
  }, [isAuthenticated]);

  const handleExportCSV = () => {
    if (buyers.length === 0) {
      alert('No buyer records in MongoDB to export.');
      return;
    }

    const headers = ['Order ID', 'Payment ID', 'Name', 'Email', 'Phone', 'Date', 'Amount (INR)', 'Order Bump', 'Status', 'Package'];
    const csvRows = [
      headers.join(','),
      ...buyers.map((b) =>
        [
          b.id,
          b.paymentId,
          `"${b.name}"`,
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
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-emerald-500 selection:text-white w-full">
      
      {/* 1. Admin Sticky Full-Width Header */}
      <AdminHeader
        dateRange={dateRange}
        setDateRange={setDateRange}
        onRefresh={fetchAdminData}
        onExportCSV={handleExportCSV}
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

            {isLoading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-3xl border border-slate-100">
                <div className="flex flex-col items-center gap-3 bg-white p-6 rounded-2xl shadow-xl border border-emerald-100">
                  <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-emerald-700 font-bold text-sm">Fetching Real-Time Data...</span>
                </div>
              </div>
            )}
            
            {/* TAB 1: Sales Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <RevenueStats stats={stats} />
                <SalesChart dailyData={dailyChartData} totalOrders={stats.totalOrders} />
                <BuyersTable buyers={buyers} />
              </div>
            )}

            {/* TAB 2: Product Upload & Digital Asset Management */}
            {activeTab === 'product_upload' && (
              <ProductUploadManager />
            )}

            {/* TAB 3: Customer Transactions Ledger */}
            {activeTab === 'buyers' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <BuyersTable buyers={buyers} />
              </div>
            )}

            {/* TAB 4 & 5: Product Settings, Meta Pixel & Security */}
            {(activeTab === 'pixel' || activeTab === 'security') && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <ProductSettings />
              </div>
            )}

          </div>

        </div>
      </div>

      {/* 3. Footer */}
      <LegalFooter />

    </main>
  );
}
