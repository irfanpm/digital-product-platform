import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';

const sampleOrders = [
  {
    orderId: 'ord_101',
    paymentId: 'pay_live_89127491',
    name: 'Rohan Sharma',
    email: 'rohan.sharma@gmail.com',
    phone: '+91 9876543210',
    amount: 398,
    hasOrderBump: true,
    package: '38-Page Kit + Editable Templates',
    status: 'Captured',
    createdAt: new Date('2026-08-28T16:42:00Z'),
  },
  {
    orderId: 'ord_102',
    paymentId: 'pay_live_89127492',
    name: 'Ananya Verma',
    email: 'ananya.v@outlook.com',
    phone: '+91 9812345678',
    amount: 398,
    hasOrderBump: true,
    package: '38-Page Kit + Editable Templates',
    status: 'Captured',
    createdAt: new Date('2026-08-28T15:30:00Z'),
  },
  {
    orderId: 'ord_103',
    paymentId: 'pay_live_89127493',
    name: 'Karthik Nair',
    email: 'karthik.nair@techcorp.in',
    phone: '+91 9765432109',
    amount: 299,
    hasOrderBump: false,
    package: 'The AI Job Application Kit',
    status: 'Captured',
    createdAt: new Date('2026-08-28T14:15:00Z'),
  },
  {
    orderId: 'ord_104',
    paymentId: 'pay_live_89127494',
    name: 'Priya Patel',
    email: 'priya.patel@yahoo.com',
    phone: '+91 9988776655',
    amount: 398,
    hasOrderBump: true,
    package: '38-Page Kit + Editable Templates',
    status: 'Captured',
    createdAt: new Date('2026-08-28T13:05:00Z'),
  },
];

export async function GET(req: Request) {
  try {
    const conn = await dbConnect();
    let dbOrders: any[] = [];
    let dataSource = 'In-Memory Demo Store';

    if (conn) {
      dataSource = 'MongoDB Localhost (mongodb://127.0.0.1:27017/ai_job_kit)';
      dbOrders = await Order.find({}).sort({ createdAt: -1 }).lean();

      if (dbOrders.length === 0) {
        await Order.insertMany(sampleOrders);
        dbOrders = await Order.find({}).sort({ createdAt: -1 }).lean();
      }
    } else {
      dbOrders = sampleOrders;
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
      amount: o.amount,
      hasOrderBump: o.hasOrderBump,
      status: o.status,
      package: o.package,
    }));

    // Aggregate statistics
    const totalRevenue = buyers.reduce((acc, b) => acc + b.amount, 0);
    const totalOrders = buyers.length;
    const bumpOrdersCount = buyers.filter((b) => b.hasOrderBump).length;
    const bumpRevenue = bumpOrdersCount * 99;
    const bumpTakeRate = totalOrders > 0 ? Math.round((bumpOrdersCount / totalOrders) * 100) : 0;
    const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

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
      buyers,
    });
  } catch (error: any) {
    console.error('Admin Orders Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error fetching order data',
      },
      { status: 500 }
    );
  }
}
