import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';

export async function GET(req: Request) {
  try {
    const conn = await dbConnect();
    let dbOrders: any[] = [];
    let dataSource = 'MongoDB Database';

    if (conn) {
      dataSource = 'MongoDB Localhost (mongodb://127.0.0.1:27017/ai_job_kit)';
      // Fetch ONLY real buyer orders stored in MongoDB (sorted newest first)
      dbOrders = await Order.find({}).sort({ createdAt: -1 }).lean();
    }

    // Format buyers data for Admin UI
    const buyers = dbOrders.map((o: any) => ({
      id: o.orderId,
      paymentId: o.paymentId || o.orderId,
      name: o.name,
      email: o.email,
      phone: o.phone,
      date: new Date(o.createdAt || Date.now()).toLocaleString('en-IN', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
      rawDate: o.createdAt || new Date(),
      amount: o.amount,
      hasOrderBump: o.hasOrderBump,
      status: o.status || 'Captured',
      package: o.package || 'The AI Job Application Kit',
    }));

    // Aggregate real statistics directly from actual MongoDB documents
    const totalRevenue = buyers.reduce((acc, b) => acc + b.amount, 0);
    const totalOrders = buyers.length;
    const bumpOrdersCount = buyers.filter((b) => b.hasOrderBump).length;
    const bumpRevenue = bumpOrdersCount * (buyers.find(b => b.hasOrderBump)?.amount ? 99 : 1);
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
