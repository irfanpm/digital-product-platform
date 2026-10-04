declare global { interface Window { fbq: any; savingsPixelInitialized?: boolean; creatorViewContentTracked?: boolean; } }
export function trackMetaViewContent() {
  if (typeof window === 'undefined' || !window.savingsPixelInitialized || typeof window.fbq !== 'function') return false;
  if (!window.creatorViewContentTracked) {
    window.creatorViewContentTracked = true;
    trackMetaEvent('ViewContent', { content_name: 'AI Creator Kit', content_type: 'product' });
  }
  return true;
}
export function trackMetaEvent(eventName: string, options: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && window.savingsPixelInitialized && typeof window.fbq === 'function') {
    try { window.fbq('track', eventName, options); } catch {}
  }
}
const emitted = new Set<string>();
export function trackMetaPurchase(purchase: { shouldEmit: boolean; mode: string; eventId: string; value: number; currency: string; productName?: string }) {
  if (!purchase?.shouldEmit || purchase.mode !== 'live' || purchase.currency !== 'INR' || !Number.isFinite(purchase.value) || purchase.value <= 0 || !/^purchase_order_[A-Za-z0-9]+$/.test(purchase.eventId) || typeof window === 'undefined' || !window.savingsPixelInitialized || typeof window.fbq !== 'function') return;
  const key = `savings:${purchase.eventId}`;
  if (emitted.has(key)) return;
  try { if (localStorage.getItem(key)) return; localStorage.setItem(key, '1'); } catch {}
  emitted.add(key);
  try { window.fbq('track', 'Purchase', { value: purchase.value, currency: 'INR', content_name: purchase.productName || 'AI Creator Kit', content_type: 'product' }, { eventID: purchase.eventId }); } catch {}
}
