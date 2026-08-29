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
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setDailyChartData(data.dailyChartData || []);
        setBuyers(data.buyers || []);
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
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* 1. Admin Sticky Header */}
      <AdminHeader
        dateRange={dateRange}
        setDateRange={setDateRange}
        onRefresh={fetchAdminData}
        onExportCSV={handleExportCSV}
      />

      {/* 2. Admin Sidebar & Main Workspace Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Admin Sidebar */}
          <AdminSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
          />

          {/* Dedicated Tab Section Workspace */}
          <div className="flex-1 space-y-8 min-w-0">
            
            {/* TAB 1: Sales Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in duration-300">
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
              <div className="space-y-8 animate-in fade-in duration-300">
                <BuyersTable buyers={buyers} />
              </div>
            )}

            {/* TAB 4 & 5: Product Settings, Meta Pixel & Security */}
            {(activeTab === 'pixel' || activeTab === 'security') && (
              <div className="space-y-8 animate-in fade-in duration-300">
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
