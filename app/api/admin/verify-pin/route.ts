import { admin, failure, json } from '@/lib/serverSafety';
export async function POST(req: Request) { try { const { pin } = await req.json(); const headers = new Headers(); if (typeof pin === 'string') headers.set('authorization', `Bearer ${pin}`); await admin(new Request(req.url, { headers })); return json({ success: true }); } catch (e) { return failure(e); } }
