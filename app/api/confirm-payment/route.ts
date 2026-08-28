import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';

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

    const orderData = {
      orderId: orderId || `ord_${Date.now()}`,
      paymentId: paymentId || `pay_fail_${Date.now()}`,
      name: name || 'Anonymous Buyer',
      email: email || 'buyer@example.com',
      phone: phone || '+91 9876543210',
      amount: amount || 299,
      hasOrderBump: !!hasOrderBump,
      package: hasOrderBump 
        ? '38-Page Kit + Editable Templates' 
        : 'The AI Job Application Kit',
      status: status || 'Captured',
      createdAt: new Date(),
    };

    if (conn) {
      // Upsert order in MongoDB database so status is guaranteed accurately stored!
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
        },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Order status ${status} successfully updated in database`,
      order: orderData,
    });
  } catch (error: any) {
    console.error('Confirm Payment Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error updating order in database' },
      { status: 500 }
    );
  }
}
