import { createHmac } from 'crypto';
import { access } from 'fs/promises';
import path from 'path';
import { deliveryUrl, equal, ServiceError } from './serverSafety';
import { PRODUCT } from './product';

// The paid archive never lives under public/. A versioned file preserves order fulfilment.
export const KIT_FILE = path.join(process.cwd(), 'private', 'AI-Creator-Kit-v2.zip');
function signingSecret() {
  const secret = process.env.DOWNLOAD_SIGNING_SECRET || process.env.RAZORPAY_KEY_SECRET;
  if (!secret) throw new ServiceError(503, 'Product delivery is temporarily unavailable.');
  return secret;
}
export function downloadSignature(orderId: string) {
  return createHmac('sha256', signingSecret()).update(`ai-creator-kit:v2:download:${orderId}`).digest('hex');
}
export function validDownloadSignature(orderId: string, token: string) {
  return /^[a-f0-9]{64}$/.test(token) && equal(downloadSignature(orderId), token);
}
export async function prepareDelivery(setting: any) {
  // An old product's Drive URL must never become the AI kit by relabelling it.
  if (setting.productSlug === PRODUCT.slug && setting.deliveryMode === 'drive') return deliveryUrl(setting.productDriveUrl);
  try { await access(KIT_FILE); signingSecret(); return null; }
  catch { throw new ServiceError(503, 'AI Creator Kit delivery is unavailable. Please contact the seller.'); }
}
export function privateDownloadUrl(orderId: string, requestUrl: string) {
  const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL || requestUrl).origin;
  return `${origin}/api/download?order=${encodeURIComponent(orderId)}&token=${downloadSignature(orderId)}`;
}
