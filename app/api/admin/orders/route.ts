import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import Setting from '@/models/Setting';
import Analytics from '@/models/Analytics';

declare global {
  var memoryOrders: any[];
  var globalAnalytics: {
    pageViews: number;
    uniqueVisitors: number;
    ctaClicks: number;
    daily: { [date: string]: { views: number; clicks: number } };
  };
}

if (!global.memoryOrders) {
  global.memoryOrders = [];
}

if (!global.globalAnalytics) {
  global.globalAnalytics = {
    pageViews: 0,
    uniqueVisitors: 0,
    ctaClicks: 0,
    daily: {},
  };
}

export async function GET(req: Request) {
  try {
    const conn = await dbConnect();
    
    // Auth Check
    const authHeader = req.headers.get('authorization');
    const providedPin = authHeader?.split(' ')[1];
    
    let currentValidPin = 'admin123';
    if (conn) {
      const existingSetting = await Setting.findOne({}).lean();
      if (existingSetting?.adminPin) currentValidPin = existingSetting.adminPin;
    } else if (global.globalMemorySettings?.adminPin) {
      currentValidPin = global.globalMemorySettings.adminPin;
    }
    
    if (providedPin !== currentValidPin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    let dbOrders: any[] = [];
    let dataSource = 'Server Memory & Database';

    // Retrieve analytics counts
    let totalPageViews = global.globalAnalytics.pageViews;
    let totalCtaClicks = global.globalAnalytics.ctaClicks;

    if (conn) {
      try {
        dbOrders = await Order.find({}).sort({ createdAt: -1 }).lean();
        dataSource = 'MongoDB Cloud Database';

        const allAnalytics = await Analytics.find({}).lean();
        if (allAnalytics && allAnalytics.length > 0) {
          const dbViews = allAnalytics.reduce((acc, a) => acc + (a.pageViews || 0), 0);
          const dbClicks = allAnalytics.reduce((acc, a) => acc + (a.ctaClicks || 0), 0);
          totalPageViews = Math.max(totalPageViews, dbViews);
          totalCtaClicks = Math.max(totalCtaClicks, dbClicks);
        }
      } catch (err) {
        console.warn('MongoDB query warning, using memory fallback:', err);
      }
    }

    // Combine MongoDB orders with in-memory fallback orders and deduplicate by paymentId/orderId
    const allRawOrdersMap = new Map();

    // First add memory orders
    (global.memoryOrders || []).forEach((o) => {
      const key = o.paymentId || o.orderId;
      if (key) allRawOrdersMap.set(key, o);
    });

    // Then add DB orders (DB takes precedence if available)
    dbOrders.forEach((o) => {
      const key = o.paymentId || o.orderId;
      if (key) allRawOrdersMap.set(key, o);
    });

    const combinedOrders = Array.from(allRawOrdersMap.values()).sort(
      (a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );

    // Format buyers data for Admin UI
    const buyers = combinedOrders.map((o: any) => ({
      id: o.orderId || `ord_${Date.now()}`,
      paymentId: o.paymentId || o.orderId || `pay_${Date.now()}`,
      name: o.name || 'Valued Buyer',
      email: o.email || 'buyer@example.com',
      phone: o.phone || '+91 9876543210',
      date: new Date(o.createdAt || Date.now()).toLocaleString('en-IN', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
      rawDate: o.createdAt || new Date(),
      amount: Number(o.amount) || 199,
      hasOrderBump: !!o.hasOrderBump,
      status: o.status || 'Captured',
      package: o.package || 'All-In-One Digital Planner (2026-2028 Edition)',
    }));

    // Aggregate real statistics directly from actual documents
    const totalRevenue = buyers.reduce((acc, b) => acc + b.amount, 0);
    const totalOrders = buyers.length;
    const bumpOrdersCount = buyers.filter((b) => b.hasOrderBump).length;
    const bumpRevenue = bumpOrdersCount * (buyers.find((b) => b.hasOrderBump)?.amount ? 99 : 1);
    const bumpTakeRate = totalOrders > 0 ? Math.round((bumpOrdersCount / totalOrders) * 100) : 0;
    const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    // Conversion & Traffic Rates
    const conversionRate = totalPageViews > 0 
      ? Number(((totalOrders / totalPageViews) * 100).toFixed(1)) 
      : 0;
    const clickThroughRate = totalPageViews > 0 
      ? Number(((totalCtaClicks / totalPageViews) * 100).toFixed(1)) 
      : 0;

    // Build real 7-day revenue grouping
    const daysMap: { [key: string]: { revenue: number; orders: number; bumpOrders: number } } = {};
    
    // Initialize last 7 days with 0
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateKey = d.toLocaleDateString('en-US', { weekday: 'short' });
      daysMap[dateKey] = { revenue: 0, orders: 0, bumpOrders: 0 };
    }

    // Group real orders by day
    buyers.forEach((b) => {
      const dayKey = new Date(b.rawDate).toLocaleDateString('en-US', { weekday: 'short' });
      if (daysMap[dayKey]) {
        daysMap[dayKey].revenue += b.amount;
        daysMap[dayKey].orders += 1;
        if (b.hasOrderBump) daysMap[dayKey].bumpOrders += 1;
      }
    });

    const dailyChartData = Object.keys(daysMap).map((day) => ({
      day,
      revenue: daysMap[day].revenue,
      orders: daysMap[day].orders,
      bumpOrders: daysMap[day].bumpOrders,
    }));

    return NextResponse.json({
      success: true,
      source: dataSource,
      stats: {
        totalRevenue,
        totalOrders,
        bumpOrdersCount,
        bumpRevenue,
        bumpTakeRate,
        averageOrderValue,
        pageViews: totalPageViews,
        ctaClicks: totalCtaClicks,
        conversionRate,
        clickThroughRate,
      },
      dailyChartData,
      buyers,
    });
  } catch (error: any) {
    console.error('Admin Orders Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error fetching real order data',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const conn = await dbConnect();
    
    // Auth Check
    const authHeader = req.headers.get('authorization');
    const providedPin = authHeader?.split(' ')[1];
    
    let currentValidPin = 'admin123';
    if (conn) {
      const existingSetting = await Setting.findOne({}).lean();
      if (existingSetting?.adminPin) currentValidPin = existingSetting.adminPin;
    } else if (global.globalMemorySettings?.adminPin) {
      currentValidPin = global.globalMemorySettings.adminPin;
    }
    
    if (providedPin !== currentValidPin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Clear in-memory orders & analytics
    global.memoryOrders = [];
    global.globalAnalytics = {
      pageViews: 0,
      uniqueVisitors: 0,
      ctaClicks: 0,
      daily: {},
    };

    // Clear MongoDB orders & analytics if connected
    if (conn) {
      await Order.deleteMany({});
      await Analytics.deleteMany({});
    }

    return NextResponse.json({
      success: true,
      message: 'All test orders, page views, and customer ledger records cleared successfully!',
    });
  } catch (error: any) {
    console.error('Clear Orders Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error clearing orders' },
      { status: 500 }
    );
  }
}
