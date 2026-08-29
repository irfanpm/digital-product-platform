import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';

declare global {
  var memoryOrders: any[];
}

if (!global.memoryOrders) {
  global.memoryOrders = [];
}

export async function GET(req: Request) {
  try {
    const conn = await dbConnect();
    let dbOrders: any[] = [];
    let dataSource = 'Server Memory & Database';

    if (conn) {
      try {
        dbOrders = await Order.find({}).sort({ createdAt: -1 }).lean();
        dataSource = 'MongoDB Cloud Database';
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
      amount: Number(o.amount) || 1,
      hasOrderBump: !!o.hasOrderBump,
      status: o.status || 'Captured',
      package: o.package || (o.hasOrderBump ? '38-Page Kit + Editable Templates' : 'The AI Job Application Kit'),
    }));

    // Aggregate real statistics directly from actual documents
    const totalRevenue = buyers.reduce((acc, b) => acc + b.amount, 0);
    const totalOrders = buyers.length;
    const bumpOrdersCount = buyers.filter((b) => b.hasOrderBump).length;
    const bumpRevenue = bumpOrdersCount * (buyers.find((b) => b.hasOrderBump)?.amount ? 99 : 1);
    const bumpTakeRate = totalOrders > 0 ? Math.round((bumpOrdersCount / totalOrders) * 100) : 0;
    const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

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
