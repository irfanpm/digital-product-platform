declare global {
  interface Window {
    fbq: any;
  }
}

/**
 * Track standard Meta Pixel events (e.g. PageView, ViewContent, InitiateCheckout, Purchase)
 */
export const trackMetaEvent = (eventName: string, options: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      window.fbq('track', eventName, options);
      console.log(`[Meta Pixel Event Tracked]: ${eventName}`, options);
    } catch (err) {
      console.warn('Meta Pixel tracking error:', err);
    }
  } else {
    console.log(`[Meta Pixel Event Simulated]: ${eventName}`, options);
  }
};

/**
 * Helper to track successful Meta Purchase event with exact revenue value
 */
export const trackMetaPurchase = (amount: number, transactionId: string, hasOrderBump?: boolean) => {
  trackMetaEvent('Purchase', {
    value: amount,
    currency: 'INR',
    content_name: 'All-In-One Digital Planner (2026-2028 Edition)',
    content_type: 'product',
    order_id: transactionId,
  });
};
