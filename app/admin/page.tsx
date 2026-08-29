'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { RevenueStats } from '@/components/admin/RevenueStats';
import { SalesChart } from '@/components/admin/SalesChart';
import { ProductSettings } from '@/components/admin/ProductSettings';
import { BuyersTable, Buyer } from '@/components/admin/BuyersTable';
import { LegalFooter } from '@/components/LegalFooter';

export default function AdminPage() {
  const router = useRouter();
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

      {/* 2. Admin Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* KPI Revenue Stats Cards */}
        <RevenueStats stats={stats} />

        {/* Product Google Drive Links & Pricing Settings Panel */}
        <ProductSettings />

        {/* Real Sales Trend Chart */}
        <SalesChart dailyData={dailyChartData} totalOrders={stats.totalOrders} />

        {/* Customer Buyers Table */}
        <BuyersTable buyers={buyers} />

      </div>

      {/* 3. Footer */}
      <LegalFooter />

    </main>
  );
}
