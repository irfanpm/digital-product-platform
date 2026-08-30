import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { currency = 'INR', notes } = body;

    const hasOrderBump = notes?.hasOrderBump === 'Yes';
    
    // Fetch prices securely from DB/Memory
    const conn = await dbConnect();
    let basePrice = 299;
    let bumpPrice = 99;
    
    if (conn) {
      const SettingModel = (await import('@/models/Setting')).default;
      const existingSetting = await SettingModel.findOne({}).lean();
      if (existingSetting) {
        if (existingSetting.basePrice !== undefined) basePrice = existingSetting.basePrice;
        if (existingSetting.bumpPrice !== undefined) bumpPrice = existingSetting.bumpPrice;
      }
    } else if (global.globalMemorySettings) {
      if (global.globalMemorySettings.basePrice !== undefined) basePrice = global.globalMemorySettings.basePrice;
      if (global.globalMemorySettings.bumpPrice !== undefined) bumpPrice = global.globalMemorySettings.bumpPrice;
    }

    const calculatedAmount = basePrice + (hasOrderBump ? bumpPrice : 0);
    const amount = calculatedAmount;


    const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    const amountInPaise = Math.round(amount * 100);

    let orderId = '';
    let isRealRazorpayOrder = false;

    // Only create real Razorpay Order if key_secret is configured
    if (
      key_id &&
      key_secret &&
      key_id !== 'rzp_test_placeholder' &&
      key_secret !== 'PASTE_YOUR_KEY_SECRET_HERE'
    ) {
      try {
        const razorpay = new Razorpay({
          key_id: key_id,
          key_secret: key_secret,
        });

        const razorpayOrder = await razorpay.orders.create({
          amount: amountInPaise,
          currency: currency,
          receipt: `rcpt_${Date.now()}`,
          notes: notes || {},
        });

        if (razorpayOrder && razorpayOrder.id) {
          orderId = razorpayOrder.id;
          isRealRazorpayOrder = true;
        }
      } catch (rzpErr: any) {
        console.warn('Razorpay live order note:', rzpErr?.message || rzpErr);
      }
    }

    const tempOrderId = orderId || `ord_local_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    // Non-blocking background save to MongoDB
    dbConnect().then(async (conn) => {
      if (conn) {
        try {
          await Order.create({
            orderId: tempOrderId,
            paymentId: `pay_sim_${Date.now()}`,
            name: notes?.fullName || 'Anonymous Buyer',
            email: notes?.email || 'buyer@example.com',
            phone: notes?.phone || '+91 9876543210',
            amount: amount,
            hasOrderBump: notes?.hasOrderBump === 'Yes',
            package: notes?.hasOrderBump === 'Yes' 
              ? '38-Page Kit + Editable Templates' 
              : 'The AI Job Application Kit',
            status: 'Captured',
            createdAt: new Date(),
          });
        } catch (e) {
          // ignore background error
        }
      }
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      order: {
        id: tempOrderId,
        isRealRazorpayOrder,
        amount: amountInPaise,
        currency: currency,
        key: key_id,
      },
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Server error creating order',
      },
      { status: 500 }
    );
  }
}
