import Razorpay from 'razorpay';
import { createHmac, randomUUID } from 'crypto';
import Order from '@/models/Order';
import { database, durable, equal, ServiceError } from './serverSafety';
import { sendProductEmail } from './sendProductEmail';
export function gateway() {
  const key = process.env.RAZORPAY_KEY_ID?.trim(); const secret = process.env.RAZORPAY_KEY_SECRET?.trim();
  if (!key || !/^rzp_(live|test)_/.test(key) || !secret) throw new ServiceError(503, 'Payments are temporarily unavailable.');
  return { api: new Razorpay({ key_id: key, key_secret: secret }), key, secret, mode: key.startsWith('rzp_live_') ? 'live' : 'test' };
}
export function signature(body: string | Buffer, signature: unknown, secret: string) {
  if (typeof signature !== 'string' || !/^[a-f0-9]{64}$/i.test(signature) || !equal(createHmac('sha256', secret).update(body).digest('hex'), signature.toLowerCase())) throw new ServiceError(401, 'Invalid payment signature.');
}
export async function fulfil(orderId: string, retry = false) {
  const claim = randomUUID();
  const order = await Order.findOneAndUpdate({ orderId, status: 'Captured', verifiedAt: { $exists: true }, emailStatus: { $in: retry ? ['Pending', 'Failed'] : ['Pending'] } }, { $set: { emailStatus: 'Sending', emailClaim: claim } }, { new: true, ...durable }).lean();
  if (order) {
    const result = await sendProductEmail({ toEmail: order.email, customerName: order.name, paymentId: order.paymentId, amount: order.amount, productDriveUrl: order.deliveryUrl, orderBumpDriveUrl: order.orderBumpUrl, productName: order.package });
    await Order.updateOne({ orderId, emailClaim: claim, emailStatus: 'Sending' }, { $set: { emailStatus: result.success ? 'Sent' : result.uncertain ? 'Unknown' : 'Failed', ...(result.success ? { emailSentAt: new Date(), emailMessageId: result.messageId } : {}) } }, durable);
  }
  return Order.findOne({ orderId }).lean();
}
export async function capture(orderId: unknown, paymentId: unknown, checkoutSignature?: unknown, deliver = true) {
  if (typeof orderId !== 'string' || !/^order_[A-Za-z0-9]+$/.test(orderId) || typeof paymentId !== 'string' || !/^pay_[A-Za-z0-9]+$/.test(paymentId)) throw new ServiceError(400, 'Invalid payment details.');
  await database();
  const order = await Order.findOne({ orderId }).lean();
  if (!order || order.verificationVersion !== 1) throw new ServiceError(404, 'Order unavailable for automatic verification. Contact support.');
  const g = gateway();
  if (g.key !== order.keyId) throw new ServiceError(503, 'Payment configuration changed. Contact support.');
  if (checkoutSignature !== undefined) signature(`${order.orderId}|${paymentId}`, checkoutSignature, g.secret);
  const payment = await g.api.payments.fetch(paymentId);
  if (payment.order_id !== order.orderId || payment.status !== 'captured' || payment.captured !== true || Number(payment.amount) !== order.amountPaise || payment.currency !== 'INR' || Number(payment.amount_refunded || 0) !== 0) throw new ServiceError(409, 'Payment is not a matching captured payment. Access has not been granted.');
  await Order.updateOne({ orderId, status: 'Created', verifiedAt: { $exists: false } }, { $set: { status: 'Captured', paymentId, verifiedAt: new Date() } }, durable);
  const verified = await Order.findOne({ orderId }).lean();
  if (!verified?.verifiedAt || verified.status !== 'Captured' || verified.paymentId !== paymentId) throw new ServiceError(409, 'Payment could not be confirmed.');
  return deliver ? fulfil(orderId) : verified;
}
