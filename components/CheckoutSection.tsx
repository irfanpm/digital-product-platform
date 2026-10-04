'use client';
import { PRODUCT } from '@/lib/product';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Zap,
  Lock,
  CheckCircle2,
  Mail,
  User,
  Phone,
  AlertCircle,
  Clock,
  Download,
  Check,
  Package
} from 'lucide-react';
import { trackMetaEvent, trackMetaPurchase } from '@/lib/metaPixel';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const CheckoutSection: React.FC = () => {
  const [price, setPrice] = useState(0);
  const [priceReady, setPriceReady] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pendingProof, setPendingProof] = useState<Record<string, string> | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<{ paymentId: string; orderId: string; amount: number; name: string; email: string; productDriveUrl: string; emailStatus: string; productName?: string } | null>(null);

  useEffect(() => {
    fetch('/api/settings', { cache: 'no-store' }).then(r => r.json()).then(data => {
      if (!data.success || !Number.isFinite(data.setting?.basePrice) || data.setting.basePrice <= 0) throw new Error();
      setPrice(data.setting.basePrice); setPriceReady(true);
    }).catch(() => setErrorMessage('The current price is unavailable. Please refresh and try again.'));
    // Keep only the gateway proof in this tab so a reload can retry verification.
    try { const saved = sessionStorage.getItem('savings-payment-proof'); if (saved) setPendingProof(JSON.parse(saved)); } catch {}
  }, []);

  const confirmPayment = async (proof: Record<string, string>) => {
    setIsLoading(true); setErrorMessage('');
    try {
      const response = await fetch('/api/confirm-payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...proof, canTrackPurchase: typeof window.fbq === 'function' && !!window.savingsPixelInitialized }) });
      const data = await response.json();
      if (!response.ok || data.success !== true || data.verified !== true || !data.downloadUrl) throw new Error(data.error || 'Payment verification is not complete. Retry verification; do not pay again.');
      setConfirmedOrder({ ...data.order, productDriveUrl: data.downloadUrl, emailStatus: data.emailStatus });
      trackMetaPurchase(data.purchase);
      setPendingProof(null);
      try { sessionStorage.removeItem('savings-payment-proof'); } catch {}
    } catch (e: any) { setErrorMessage(e.message || 'Verification is temporarily unavailable. Retry verification; do not pay again.'); }
    finally { setIsLoading(false); }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault(); setErrorMessage('');
    if (pendingProof) { await confirmPayment(pendingProof); return; }
    if (!priceReady || !fullName.trim() || !email.trim() || !phone.trim()) { setErrorMessage('Enter your name, email and phone number to continue.'); return; }
    if (typeof window.Razorpay !== 'function') { setErrorMessage('The payment gateway has not loaded. Refresh and try again. No payment was started.'); return; }
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ currency: 'INR', notes: { fullName, email, phone } }) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || 'Unable to start payment.');
      const rzp = new window.Razorpay({ key: data.order.key, order_id: data.order.id, amount: data.order.amount, currency: 'INR', name: PRODUCT.name, description: PRODUCT.description, prefill: { name: fullName, email, contact: phone }, theme: { color: '#2C4A3B' },
        modal: { ondismiss: () => { setIsLoading(false); setErrorMessage('Checkout closed. No payment has been confirmed here.'); } },
        handler: async (result: Record<string, string>) => {
          const proof = { razorpay_order_id: result.razorpay_order_id, razorpay_payment_id: result.razorpay_payment_id, razorpay_signature: result.razorpay_signature };
          setPendingProof(proof);
          try { sessionStorage.setItem('savings-payment-proof', JSON.stringify(proof)); } catch {}
          await confirmPayment(proof);
        },
      });
      rzp.on('payment.failed', () => { setIsLoading(false); setErrorMessage('Payment was not completed. Please try again.'); });
      rzp.open();
      if (data.order.mode === 'live') trackMetaEvent('InitiateCheckout', { value: data.order.amount / 100, currency: 'INR', content_name: PRODUCT.name, num_items: 1 });
    } catch (e: any) { setErrorMessage(e.message || 'Unable to connect to the payment gateway.'); setIsLoading(false); }
  };

  return (
    <section id="checkout-section" className="py-16 md:py-24 bg-[#FDFBF7] border-t border-[#E8F0E9] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* IF PAYMENT IS CONFIRMED -> SHOW CONFIRMATION & DIRECT GOOGLE DRIVE DOWNLOAD BUTTON */}
        {confirmedOrder ? (
          <div className="rounded-3xl p-8 sm:p-12 border-2 border-[#2C4A3B] bg-white shadow-xl text-center space-y-8 animate-in fade-in duration-500">

            <div className="flex justify-center">
              <div className="w-16 h-16 bg-[#E8F0E9] text-[#2C4A3B] rounded-full flex items-center justify-center border-4 border-[#2C4A3B]/20 shadow-md">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-xs font-extrabold text-[#2C4A3B] bg-[#E8F0E9] px-3 py-1 rounded-full uppercase tracking-wider">
                PAYMENT CONFIRMED
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#2C4A3B] tracking-tight">
                Welcome to {confirmedOrder.productName || PRODUCT.name}
              </h2>
              <p className="text-slate-600 text-sm">
                Thank you, <strong className="text-slate-900">{confirmedOrder.name}</strong>! Your payment is verified. {confirmedOrder.emailStatus === 'Sent' ? `Your download email was sent to ${confirmedOrder.email}.` : 'Your download is ready below. Email delivery is not confirmed yet; contact support if it does not arrive.'}
              </p>
            </div>

            {(!confirmedOrder.productName || confirmedOrder.productName === PRODUCT.name) && <div className="bg-[#E8F0E9] rounded-2xl p-5 text-left text-sm max-w-md mx-auto"><h3 className="font-bold mb-2">Start here</h3><p>{PRODUCT.start}</p><p className="mt-2">For help, reply to your purchase email or contact the seller through your original purchase channel. Include your order ID.</p></div>}
            {/* Receipt Details Box */}
            <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-[#E8F0E9] max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Product:</span>
                <span className="font-bold text-slate-900">{confirmedOrder.productName || PRODUCT.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment ID:</span>
                <span className="font-mono font-bold text-slate-900">{confirmedOrder.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-mono text-slate-700">{confirmedOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-mono font-bold text-[#2C4A3B]">₹{confirmedOrder.amount} INR</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#E8F0E9]">
                <span className="text-slate-500">Includes:</span>
                <span className="font-bold text-[#2C4A3B] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified digital product access
                </span>
              </div>
            </div>

            {/* Access appears only after server verification. */}
            <div className="space-y-3 max-w-md mx-auto">
              <a
                href={confirmedOrder.productDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#2C4A3B] hover:bg-[#1a2d24] text-white font-black text-base sm:text-lg py-4 px-6 rounded-2xl shadow-xl shadow-[#2C4A3B]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>Download {confirmedOrder.productName || PRODUCT.name}</span>
              </a>
            </div>

          </div>
        ) : (
          /* STANDARD CLEAN CHECKOUT FORM */
          <>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 bg-[#E8F0E9] border border-[#2C4A3B]/20 text-[#2C4A3B] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <Lock className="w-3.5 h-3.5 text-[#2C4A3B]" /> CHECKOUT WITH RAZORPAY
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#2C4A3B] tracking-tight mb-3">
                Your next idea starts here.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                AI Creator Kit. Enter your details to continue to secure payment.
              </p>
            </div>

            <div className="rounded-3xl p-6 sm:p-10 border-2 border-[#E8F0E9] bg-white shadow-2xl relative">

              {pendingProof && <div role="status" className="mb-6 rounded-xl border border-amber-300 p-4 text-sm">A payment is awaiting verification. Do not pay again.<button type="button" disabled={isLoading} onClick={() => confirmPayment(pendingProof)} className="block mt-3 underline font-bold">{isLoading ? 'Verifying…' : 'Retry payment verification'}</button></div>}
              <form onSubmit={handleCheckout} className="space-y-8">

                {/* 1. Product Summary & Price Box */}
                <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-[#E8F0E9] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8F0E9]">
                    <div>
                      <img src="/images/creator/dashboard.webp" alt="AI Creator Kit dashboard preview" width="140" height="67" loading="lazy" className="rounded-lg border border-[#d8dfce] mb-3" />
                      <h3 className="text-[#2C4A3B] font-black text-lg sm:text-xl flex items-center gap-2">
                        <Package className="w-5 h-5 text-[#C6A87C]" />
                        AI Creator Kit
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium">
                        Guided workflows · Customized instructions · Visual guides
                      </p>
                    </div>

                    <div className="text-right">

                      <div className="text-2xl sm:text-3xl font-black text-[#2C4A3B] font-mono">
                        {priceReady ? `₹${price}` : 'Loading…'}
                      </div>
                    </div>
                  </div>

                  {/* Instant Perks */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-700 font-semibold">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#728A7C]" /> Digital Delivery
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#728A7C]" /> Secure Payment
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#728A7C]" /> Local App + Guides
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#728A7C]" /> One-Time Purchase
                    </span>
                  </div>
                </div>

                {/* 2. Customer Delivery Form */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <User className="w-4 h-4 text-[#C6A87C]" /> Customer Delivery Details
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label htmlFor="checkout-name" className="text-xs text-slate-700 font-bold">Full Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        <input
                          id="checkout-name"
                          autoComplete="name"
                          type="text"
                          required
                          placeholder="e.g. Aanya Sharma"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-[#FDFBF7] border border-[#E8F0E9] rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2C4A3B] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <label htmlFor="checkout-phone" className="text-xs text-slate-700 font-bold">Phone / WhatsApp Number *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        <input
                          id="checkout-phone"
                          autoComplete="tel"
                          type="tel"
                          required
                          placeholder="e.g. +91 9876543210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#FDFBF7] border border-[#E8F0E9] rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2C4A3B] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="checkout-email" className="text-xs text-slate-700 font-bold">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        id="checkout-email"
                        autoComplete="email"
                        type="email"
                        required
                        placeholder="e.g. aanya@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#FDFBF7] border border-[#E8F0E9] rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2C4A3B] transition-colors"
                      />
                    </div>
                    <p className="text-[11px] text-[#728A7C] font-medium pt-0.5">
                      Use the email address where you want to receive your download link.
                    </p>
                  </div>
                </div>

                {/* Error Display */}
                {errorMessage && (
                  <div role="alert" className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* 3. Total Calculation & High-Visibility Payment Button */}
                <div className="pt-4 border-t border-[#E8F0E9] space-y-4">

                  <div className="flex items-center justify-between text-sm sm:text-base font-bold text-[#2C4A3B]">
                    <span>Total Amount Payable:</span>
                    <span className="text-2xl sm:text-3xl font-black text-[#2C4A3B] font-mono">
                      {priceReady ? `₹${price}` : 'Loading…'} INR
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !priceReady}
                    className="w-full bg-[#2C4A3B] hover:bg-[#1a2d24] text-white font-black text-lg sm:text-xl py-4 px-6 rounded-2xl shadow-xl shadow-[#2C4A3B]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Clock className="w-5 h-5 animate-spin" /> Connecting to Secure Gateway...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Zap className="w-5 h-5 fill-white" />
                        Get AI Creator Kit
                      </span>
                    )}
                  </button>

                  {/* Trust Logos & SSL Indicator */}
                  <div className="space-y-3 pt-2 text-center">
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                      <ShieldCheck className="w-4 h-4 text-[#728A7C]" />
                      <span>Payment methods available through Razorpay:</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold text-slate-700">
                      <span className="bg-[#FDFBF7] border border-[#E8F0E9] px-3 py-1 rounded-lg text-emerald-700">GPay</span>
                      <span className="bg-[#FDFBF7] border border-[#E8F0E9] px-3 py-1 rounded-lg text-purple-700">PhonePe</span>
                      <span className="bg-[#FDFBF7] border border-[#E8F0E9] px-3 py-1 rounded-lg text-cyan-700">Paytm</span>
                      <span className="bg-[#FDFBF7] border border-[#E8F0E9] px-3 py-1 rounded-lg text-amber-700">UPI / QR</span>
                      <span className="bg-[#FDFBF7] border border-[#E8F0E9] px-3 py-1 rounded-lg text-blue-700">Credit / Debit Cards</span>
                      <span className="bg-[#FDFBF7] border border-[#E8F0E9] px-3 py-1 rounded-lg text-slate-700">NetBanking</span>
                    </div>
                  </div>

                </div>

              </form>

            </div>
          </>
        )}

      </div>
    </section>
  );
};
