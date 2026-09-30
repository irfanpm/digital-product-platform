import Order from '@/models/Order';
import { capture } from '@/lib/payments';
import { durable, failure, json, ServiceError } from '@/lib/serverSafety';
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.razorpay_signature) throw new ServiceError(401, 'Payment signature is required.');
    const order = await capture(body.razorpay_order_id, body.razorpay_payment_id, body.razorpay_signature);
    const claim = order.mode === 'live' && body.canTrackPurchase === true ? await Order.findOneAndUpdate({ orderId: order.orderId, purchaseEventClaimedAt: { $exists: false }, status: 'Captured', verifiedAt: { $exists: true } }, { $set: { purchaseEventClaimedAt: new Date() } }, { new: true, ...durable }).lean() : null;
    return json({ success: true, verified: true, order: { orderId: order.orderId, paymentId: order.paymentId, amount: order.amount, name: order.name, email: order.email }, downloadUrl: order.deliveryUrl, orderBumpUrl: order.orderBumpUrl, emailStatus: order.emailStatus, purchase: { shouldEmit: !!claim, mode: order.mode, eventId: `purchase_${order.orderId}`, value: order.amount, currency: 'INR' } });
  } catch (e) { return failure(e); }
}
