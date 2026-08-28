import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const rawBody = await req.text();
    const razorpaySignature = req.headers.get('x-razorpay-signature');

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret || webhookSecret === 'rzp_webhook_secret_placeholder') {
      console.warn('RAZORPAY_WEBHOOK_SECRET is not configured for production HMAC check.');
    } else if (razorpaySignature) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== razorpaySignature) {
        console.error('Invalid Razorpay webhook signature match.');
        return NextResponse.json(
          { status: 'error', message: 'Invalid signature verification' },
          { status: 400 }
        );
      }
    }

    // Parse event payload
    const event = JSON.parse(rawBody);

    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const notes = payment.notes || {};

      // Update real order record in MongoDB
      await Order.findOneAndUpdate(
        { orderId: payment.order_id },
        {
          paymentId: payment.id,
          status: 'Captured',
          email: payment.email || notes.email,
          phone: payment.contact || notes.phone,
        },
        { upsert: true, new: true }
      );

      console.log('MongoDB Order Updated to Captured:', payment.id);
    }

    return NextResponse.json({ status: 'ok', received: true });
  } catch (error: any) {
    console.error('Razorpay Webhook Error:', error);
    return NextResponse.json(
      { status: 'error', message: error.message || 'Server error processing webhook' },
      { status: 500 }
    );
  }
}
