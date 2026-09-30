import { createHash, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Setting from '@/models/Setting';
export class ServiceError extends Error { constructor(public status: number, message: string) { super(message); } }
export const durable = { writeConcern: { w: 'majority' as const, j: true } };
export async function database() { if (!await dbConnect()) throw new ServiceError(503, 'Service temporarily unavailable. Please retry.'); }
export function equal(a: string, b: string) { return timingSafeEqual(createHash('sha256').update(a).digest(), createHash('sha256').update(b).digest()); }
export async function admin(req: Request) {
  const token = req.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1];
  if (!token) throw new ServiceError(401, 'Unauthorized');
  await database();
  const settings = await Setting.findOne({}).lean();
  if (!settings?.adminPin || !equal(token, settings.adminPin)) throw new ServiceError(401, 'Unauthorized');
  return settings;
}
export function failure(error: unknown) { return NextResponse.json({ success: false, error: error instanceof ServiceError ? error.message : 'Service temporarily unavailable. Please retry.' }, { status: error instanceof ServiceError ? error.status : 503, headers: { 'Cache-Control': 'no-store' } }); }
export function json(value: unknown) { return NextResponse.json(value, { headers: { 'Cache-Control': 'no-store' } }); }
export function pixelId(value: unknown): string { const id = typeof value === 'string' ? value.trim() : ''; return /^\d{5,25}$/.test(id) && id !== '123456789012345' ? id : ''; }
export function deliveryUrl(value: unknown): string {
  if (typeof value !== 'string' || /sample/i.test(value)) throw new ServiceError(503, 'Product delivery is not configured.');
  try { const url = new URL(value); if (url.protocol === 'https:' && ['drive.google.com', 'docs.google.com'].includes(url.hostname) && !url.username && !url.password) return url.href; } catch {}
  throw new ServiceError(503, 'Product delivery is not configured.');
}
