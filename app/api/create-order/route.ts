import Setting from '@/models/Setting';
import Order from '@/models/Order';
import { gateway } from '@/lib/payments';
import { database, deliveryUrl, durable, failure, json, ServiceError } from '@/lib/serverSafety';
export async function POST(req: Request) {
  try {
    const body = await req.json(); const n = body.notes || {};
    const name = typeof n.fullName === 'string' ? n.fullName.trim() : '';
    const email = typeof n.email === 'string' ? n.email.trim() : '';
    const phone = typeof n.phone === 'string' ? n.phone.trim() : '';
    if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !/^[+\d\s()-]{7,25}$/.test(phone)) throw new ServiceError(400, 'Enter a valid name, email and phone number.');
    if (body.currency && body.currency !== 'INR') throw new ServiceError(400, 'Only INR is supported.');
    await database(); const setting = await Setting.findOne({}).lean();
    if (!setting) throw new ServiceError(503, 'Store settings are unavailable.');
    const bump = n.hasOrderBump === 'Yes';
    if (bump && !setting.enableOrderBump) throw new ServiceError(400, 'Extra product unavailable.');
    const amount = Number(setting.basePrice) + (bump ? Number(setting.bumpPrice) : 0);
    const paise = Math.round(amount * 100);
    if (!Number.isFinite(amount) || amount <= 0 || !Number.isSafeInteger(paise)) throw new ServiceError(503, 'Price is unavailable.');
    const url = deliveryUrl(setting.productDriveUrl); const extra = bump ? deliveryUrl(setting.orderBumpDriveUrl) : undefined;
    const g = gateway();
    const paymentOrder = await g.api.orders.create({ amount: paise, currency: 'INR', notes: { product: 'Money Saving System' } });
    if (!/^order_[A-Za-z0-9]+$/.test(paymentOrder.id) || Number(paymentOrder.amount) !== paise || paymentOrder.currency !== 'INR') throw new ServiceError(502, 'Payment gateway returned an invalid order.');
    await Order.create([{ orderId: paymentOrder.id, name, email, phone, amount: paise / 100, amountPaise: paise, currency: 'INR', hasOrderBump: bump, bumpAmount: bump ? Number(setting.bumpPrice) : 0, package: 'Money Saving System', status: 'Created', verificationVersion: 1, mode: g.mode, keyId: g.key, deliveryUrl: url, orderBumpUrl: extra, emailStatus: 'Pending' }], durable);
    return json({ success: true, order: { id: paymentOrder.id, amount: paise, currency: 'INR', key: g.key, mode: g.mode } });
  } catch (e) { return failure(e); }
}
