import { readFile } from 'fs/promises';
import Order from '@/models/Order';
import { database, failure, ServiceError } from '@/lib/serverSafety';
import { KIT_FILE, validDownloadSignature } from '@/lib/productDelivery';
import { PRODUCT } from '@/lib/product';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  try {
    const url = new URL(req.url), orderId = url.searchParams.get('order') || '', token = url.searchParams.get('token') || '';
    if (!/^order_[A-Za-z0-9]+$/.test(orderId) || !validDownloadSignature(orderId, token)) throw new ServiceError(403, 'Download access is unavailable. Use the link from your verified purchase.');
    await database();
    const order = await Order.findOne({ orderId }).lean();
    if (!order || order.status !== 'Captured' || !order.verifiedAt || order.package !== PRODUCT.name || !order.deliveryUrl || new URL(order.deliveryUrl).pathname !== '/api/download' || new URL(order.deliveryUrl).searchParams.get('token') !== token) throw new ServiceError(403, 'Payment must be verified before downloading.');
    const bytes = await readFile(KIT_FILE);
    return new Response(new Uint8Array(bytes), { headers: { 'Content-Type': 'application/zip', 'Content-Disposition': 'attachment; filename="AI-Creator-Kit.zip"', 'Content-Length': String(bytes.length), 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'X-Robots-Tag': 'noindex, nofollow' } });
  } catch (e) { return failure(e); }
}
