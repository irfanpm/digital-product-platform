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
 * Helper to track successful Meta Purchase event
 */
export const trackMetaPurchase = (amount: number, transactionId: string, hasOrderBump: boolean) => {
  trackMetaEvent('Purchase', {
    value: amount,
    currency: 'INR',
    content_name: hasOrderBump 
      ? '38-Page AI Kit + 10 Word/Notion Templates' 
      : 'The AI Job Application Kit (38-Page PDF)',
    content_type: 'product',
    order_id: transactionId,
  });
};
