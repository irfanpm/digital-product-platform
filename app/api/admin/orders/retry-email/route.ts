import Order from '@/models/Order';
import { capture, fulfil } from '@/lib/payments';
import { admin, failure, json, ServiceError } from '@/lib/serverSafety';
export async function POST(req: Request) {
  try {
    await admin(req); const { orderId } = await req.json();
    if (typeof orderId !== 'string') throw new ServiceError(400, 'Order ID required.');
    const existing = await Order.findOne({ orderId }).lean();
    if (!existing?.verifiedAt || existing.status !== 'Captured') throw new ServiceError(409, 'Only verified paid orders can be fulfilled.');
    if (['Sending', 'Unknown'].includes(existing.emailStatus)) throw new ServiceError(409, 'Delivery outcome is uncertain. Check the SMTP provider before retrying.');
    // Recheck capture/refunds before an administrator retries delivery.
    await capture(orderId, existing.paymentId, undefined, false);
    const order = await fulfil(orderId, true);
    if (order.emailStatus !== 'Sent') throw new ServiceError(503, 'Email delivery has not been confirmed. Check delivery status before retrying.');
    return json({ success: true, emailStatus: order.emailStatus });
  } catch (e) { return failure(e); }
}
