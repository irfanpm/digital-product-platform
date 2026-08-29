import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import Setting from '@/models/Setting';
import { sendProductEmail } from '@/lib/sendProductEmail';

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

    // Fetch product Google Drive URL settings from MongoDB
    let productDriveUrl = 'https://drive.google.com/file/d/1_Sample_AI_Job_Application_Kit_38Page/view';
    let orderBumpDriveUrl = 'https://notion.so/Sample_10_Word_Templates_And_Job_Tracker_Dashboard';

    if (conn) {
      const setting = await Setting.findOne({}).lean();
      if (setting) {
        productDriveUrl = setting.productDriveUrl || productDriveUrl;
        orderBumpDriveUrl = setting.orderBumpDriveUrl || orderBumpDriveUrl;
      }
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
      // Upsert order in MongoDB database
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

    // If payment is captured successfully -> Trigger automated client email with Google Drive download link!
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
      message: `Order status ${status} updated in database & email triggered`,
      order: orderData,
      downloadUrl: productDriveUrl,
      orderBumpUrl: orderBumpDriveUrl,
    });
  } catch (error: any) {
    console.error('Confirm Payment Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error updating order in database' },
      { status: 500 }
    );
  }
}
