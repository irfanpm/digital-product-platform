import { capture, signature } from '@/lib/payments';
import { failure, json, ServiceError } from '@/lib/serverSafety';
export async function POST(req: Request) {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) throw new ServiceError(503, 'Webhook unavailable.');
    const raw = Buffer.from(await req.arrayBuffer()); signature(raw, req.headers.get('x-razorpay-signature'), secret);
    const event = JSON.parse(raw.toString('utf8'));
    if (event.event === 'payment.captured') {
      const payment = event.payload?.payment?.entity;
      await capture(payment?.order_id, payment?.id);
    }
    return json({ success: true });
  } catch (e) { return failure(e); }
}
