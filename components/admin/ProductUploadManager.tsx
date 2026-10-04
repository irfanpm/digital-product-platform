'use client';
import { useEffect, useState } from 'react';
import { FolderArchive, Save, ShieldCheck } from 'lucide-react';
export function ProductUploadManager() {
  const [mode, setMode] = useState('package');
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState(199);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('/api/admin/settings', { headers: { Authorization: `Bearer ${localStorage.getItem('admin_pin') || ''}` }, cache: 'no-store' }).then(r => r.json()).then(d => {
      if (!d.success) throw new Error(); setMode(d.setting.deliveryMode); setUrl(d.setting.productDriveUrl || ''); setPrice(d.setting.basePrice); setReady(true);
    }).catch(() => setMessage('Could not load protected settings. Sign in again or retry.'));
  }, []);
  async function save(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setMessage('');
    try {
      const r = await fetch('/api/admin/settings', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('admin_pin') || ''}` }, body: JSON.stringify({ deliveryMode: mode, productDriveUrl: url.trim(), basePrice: price }) });
      const d = await r.json(); if (!r.ok || !d.success) throw new Error(d.error || 'Unable to save settings.'); setMessage('AI Creator Kit delivery and price saved.');
    } catch (e: any) { setMessage(e.message); } finally { setSaving(false); }
  }
  return <div className="space-y-6"><div className="clean-card p-6 rounded-2xl"><h2 className="text-xl font-bold flex gap-3 items-center"><FolderArchive className="text-emerald-600" />AI Creator Kit Asset Manager</h2><p className="text-sm text-slate-500 mt-2">Manage delivery for new purchases. Historical orders retain their original product and delivery link.</p></div><div className="grid md:grid-cols-3 gap-6"><form onSubmit={save} className="md:col-span-2 clean-card rounded-2xl p-6 space-y-5"><div><label htmlFor="asset-mode" className="block text-sm font-bold mb-2">Delivery method</label><select id="asset-mode" value={mode} onChange={e => setMode(e.target.value)} className="w-full rounded-lg border p-3 text-sm"><option value="package">Protected AI Creator Kit ZIP (Local edition 2.0)</option><option value="drive">Seller-configured AI Creator Kit Drive link</option></select></div>{mode === 'drive' ? <div><label htmlFor="asset-url" className="block text-sm font-bold mb-2">New AI Creator Kit download link</label><input id="asset-url" type="url" required value={url} onChange={e => setUrl(e.target.value)} placeholder="https://drive.google.com/..." className="w-full border rounded-lg p-3 text-sm" /><p className="text-xs text-slate-500 mt-2">Use the complete AI Creator Kit ZIP. Confirm permissions and contents before saving. This must not point to the previous product.</p></div> : <p className="text-sm bg-emerald-50 p-4 rounded-lg flex gap-2"><ShieldCheck className="shrink-0 w-5" />The packaged kit is served through a signed download link after verified payment. It is outside the public website files.</p>}<div><label htmlFor="asset-price" className="block text-sm font-bold mb-2">One-time price (₹ INR)</label><input id="asset-price" type="number" min="1" step="0.01" required value={price} onChange={e => setPrice(Number(e.target.value))} className="border rounded-lg p-3 text-sm" /></div>{message && <p role="status" className="text-sm">{message}</p>}<button disabled={!ready || saving} type="submit" className="bg-emerald-700 text-white rounded-lg px-5 py-3 text-sm font-bold flex items-center gap-2 disabled:opacity-50"><Save size={17} />{saving ? 'Saving…' : 'Save product settings'}</button></form><aside className="rounded-2xl p-6 bg-slate-900 text-white"><h3 className="font-bold mb-4">Included package</h3><ul className="space-y-3 text-sm text-slate-300"><li>Local browser app and its assets</li><li>Website, poster and marketing workflows</li><li>Resume and interview tools</li><li>Image editing and business guides</li><li>Start Here setup guide</li></ul><p className="text-xs text-slate-400 mt-5">External AI subscriptions are separate. Project details save in the buyer’s browser.</p></aside></div></div>;
}
