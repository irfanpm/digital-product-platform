import Setting from '@/models/Setting';
import { PRODUCT } from '@/lib/product';
import { database, failure, json, ServiceError } from '@/lib/serverSafety';
export const dynamic = 'force-dynamic';
export async function GET() {
  try { await database(); const s = await Setting.findOne({}).lean(); if (!s || !(s.basePrice > 0)) throw new ServiceError(503, 'Price unavailable.'); return json({ success: true, setting: { basePrice: s.basePrice, currency: 'INR', productName: PRODUCT.name } }); } catch (e) { return failure(e); }
}
