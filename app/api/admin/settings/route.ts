import Setting from '@/models/Setting';
import { admin, deliveryUrl, durable, failure, json, pixelId, ServiceError } from '@/lib/serverSafety';
const visible = (s: any) => ({ productDriveUrl: s.productDriveUrl, orderBumpDriveUrl: s.orderBumpDriveUrl, basePrice: s.basePrice, bumpPrice: s.bumpPrice, metaPixelId: pixelId(s.metaPixelId), enableOrderBump: s.enableOrderBump });
export async function GET(req: Request) { try { return json({ success: true, setting: visible(await admin(req)) }); } catch (e) { return failure(e); } }
export async function POST(req: Request) {
  try {
    const s = await admin(req); const body = await req.json(); const update: Record<string, unknown> = {};
    for (const key of ['basePrice', 'bumpPrice']) if (body[key] !== undefined) { const n = body[key]; if (typeof n !== 'number' || !Number.isFinite(n) || n <= 0 || Math.round(n * 100) / 100 !== n) throw new ServiceError(400, 'Invalid price.'); update[key] = n; }
    for (const key of ['productDriveUrl', 'orderBumpDriveUrl'] as const) if (body[key] !== undefined && body[key] !== s[key]) update[key] = body[key] === '' && key === 'orderBumpDriveUrl' ? '' : deliveryUrl(body[key]);
    if (body.metaPixelId !== undefined) { if (typeof body.metaPixelId !== 'string') throw new ServiceError(400, 'Invalid Pixel ID.'); const id = pixelId(body.metaPixelId); if (body.metaPixelId.trim() && !id) throw new ServiceError(400, 'Pixel ID must contain only digits.'); update.metaPixelId = id; }
    if (body.adminPin) { if (typeof body.adminPin !== 'string' || body.adminPin.length < 8) throw new ServiceError(400, 'Use at least 8 characters for the admin PIN.'); update.adminPin = body.adminPin; }
    if (body.enableOrderBump !== undefined) { if (typeof body.enableOrderBump !== 'boolean') throw new ServiceError(400, 'Invalid extra product setting.'); update.enableOrderBump = body.enableOrderBump; }
    const saved = await Setting.findOneAndUpdate({ _id: s._id }, { $set: update }, { new: true, runValidators: true, ...durable }).lean();
    if (!saved) throw new ServiceError(503, 'Settings could not be saved.');
    return json({ success: true, setting: visible(saved) });
  } catch (e) { return failure(e); }
}
