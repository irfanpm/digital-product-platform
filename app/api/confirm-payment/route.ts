import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import Setting from '@/models/Setting';
import { sendProductEmail } from '@/lib/sendProductEmail';

declare global {
  var memoryOrders: any[];
  var globalMemorySettings: any;
}

if (!global.memoryOrders) {
  global.memoryOrders = [];
}

export async function POST(req: Request) {
  try {
    const conn = await dbConnect();
    const body = await req.json();

    const {
      orderId,
      paymentId,
      status, // 'Captured' | 'Failed'
      name,
      email,
      phone,
      amount,
      hasOrderBump,
    } = body;

    if (!orderId && !paymentId) {
      return NextResponse.json(
        { success: false, error: 'Missing orderId or paymentId' },
        { status: 400 }
      );
    }

    // Fetch product Google Drive URL settings
    let productDriveUrl = global.globalMemorySettings?.productDriveUrl || 'https://drive.google.com/file/d/1_Sample_AI_Job_Application_Kit_38Page/view';
    let orderBumpDriveUrl = global.globalMemorySettings?.orderBumpDriveUrl || 'https://notion.so/Sample_10_Word_Templates_And_Job_Tracker_Dashboard';

    if (conn) {
      try {
        const setting = await Setting.findOne({}).lean();
        if (setting) {
          productDriveUrl = setting.productDriveUrl || productDriveUrl;
          orderBumpDriveUrl = setting.orderBumpDriveUrl || orderBumpDriveUrl;
        }
      } catch (err) {
        console.warn('Error reading settings from DB:', err);
      }
    }

    const orderData = {
      orderId: orderId || `ord_${Date.now()}`,
      paymentId: paymentId || `pay_${Date.now()}`,
      name: name || 'Valued Buyer',
      email: email || 'buyer@example.com',
      phone: phone || '+91 9876543210',
      amount: Number(amount) || 1,
      hasOrderBump: !!hasOrderBump,
      package: hasOrderBump 
        ? '38-Page Kit + Editable Templates' 
        : 'The AI Job Application Kit',
      status: status || 'Captured',
      createdAt: new Date(),
    };

    // 1. Save to in-memory order cache (guarantees Customer Ledger shows buyer even if cloud DB is offline)
    const existingMemoryIdx = global.memoryOrders.findIndex(
      (o) => o.orderId === orderData.orderId || o.paymentId === orderData.paymentId
    );

    if (existingMemoryIdx >= 0) {
      global.memoryOrders[existingMemoryIdx] = {
        ...global.memoryOrders[existingMemoryIdx],
        ...orderData,
      };
    } else {
      global.memoryOrders.unshift(orderData);
    }

    // 2. Save to MongoDB database if connection exists
    if (conn) {
      try {
        await Order.findOneAndUpdate(
          { orderId: orderData.orderId },
          {
            paymentId: orderData.paymentId,
            status: orderData.status,
            name: orderData.name,
            email: orderData.email,
            phone: orderData.phone,
            amount: orderData.amount,
            hasOrderBump: orderData.hasOrderBump,
            package: orderData.package,
            createdAt: orderData.createdAt,
          },
          { upsert: true, new: true }
        );
      } catch (dbErr) {
        console.warn('MongoDB order save warning (order stored in memory fallback):', dbErr);
      }
    }

    // 3. If payment is captured -> Trigger automated client email with Google Drive download link!
    if (status === 'Captured' && email && email.includes('@')) {
      sendProductEmail({
        toEmail: email,
        customerName: name || 'Valued Customer',
        paymentId: orderData.paymentId,
        amount: orderData.amount,
        productDriveUrl: productDriveUrl,
        hasOrderBump: !!hasOrderBump,
        orderBumpDriveUrl: orderBumpDriveUrl,
      }).catch((e) => console.error('Email send error:', e));
    }

    return NextResponse.json({
      success: true,
      message: `Order status ${status} updated in database & memory ledger`,
      order: orderData,
      downloadUrl: productDriveUrl,
      orderBumpUrl: orderBumpDriveUrl,
    });
  } catch (error: any) {
    console.error('Confirm Payment Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error updating order' },
      { status: 500 }
    );
  }
}
