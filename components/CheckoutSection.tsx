'use client';

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
  Calendar
} from 'lucide-react';
import { trackMetaEvent, trackMetaPurchase } from '@/lib/metaPixel';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const CheckoutSection: React.FC = () => {
  const [productDriveUrl, setProductDriveUrl] = useState<string>('https://drive.google.com/file/d/1_Sample_All_In_One_Digital_Planner_2026_2028/view');
  const [price, setPrice] = useState<number>(199);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Payment Confirmation State
  const [confirmedOrder, setConfirmedOrder] = useState<{
    paymentId: string;
    orderId: string;
    amount: number;
    name: string;
    email: string;
    productDriveUrl?: string;
  } | null>(null);

  // Fetch Admin Setting for Price and Google Drive URL dynamically from Database
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data.success && data.setting) {
          if (data.setting.basePrice && !isNaN(Number(data.setting.basePrice))) {
            setPrice(Number(data.setting.basePrice));
          }
          if (data.setting.productDriveUrl) {
            setProductDriveUrl(data.setting.productDriveUrl);
          }
        }
      } catch (err) {
        console.error('Error fetching checkout settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Please enter your Name, Email, and WhatsApp number to receive your Planner bundle.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address for instant digital delivery.');
      return;
    }

    setIsLoading(true);

    // Track Meta Pixel InitiateCheckout Event
    trackMetaEvent('InitiateCheckout', {
      value: price,
      currency: 'INR',
      content_name: 'All-In-One Digital Planner (2026-2028 Edition)',
      num_items: 1,
    });

    try {
      // Step 1: Call API to create order with dynamic database price
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: price,
          currency: 'INR',
          notes: {
            fullName,
            email,
            phone,
            product: 'All-In-One Digital Planner (2026-2028 Edition)'
          }
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to initialize payment gateway.');
      }

      const createdOrderId = data.order.id;

      // Step 2: Configure Razorpay SDK modal options
      const options: any = {
        key: data.order.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_TVBfC6ISeEF8o7',
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'Digital Planner Studio',
        description: 'All-In-One Digital Planner (2026-2028) + 5000 Stickers Bundle',
        prefill: {
          name: fullName,
          email: email,
          contact: phone,
        },
        theme: {
          color: '#e11d48', // Rose-600
        },
        handler: async function (response: any) {
          const paymentId = response.razorpay_payment_id || `pay_${Date.now()}`;

          // Track Meta Pixel Purchase Event
          trackMetaPurchase(price, paymentId, false);

          // Send immediate backend confirmation to guarantee database update (status: Captured)
          let liveProductUrl = productDriveUrl;

          try {
            const confirmRes = await fetch('/api/confirm-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: createdOrderId,
                paymentId: paymentId,
                status: 'Captured',
                name: fullName,
                email: email,
                phone: phone,
                amount: price,
                hasOrderBump: false,
                package: 'All-In-One Digital Planner (2026-2028 Edition)',
              }),
            });
            const confirmData = await confirmRes.json();
            if (confirmData.downloadUrl) liveProductUrl = confirmData.downloadUrl;
          } catch (confirmErr) {
            console.warn('Confirm payment background fetch error:', confirmErr);
          }

          // Set confirmed order state to render Confirmation & Direct Download Buttons
          setConfirmedOrder({
            paymentId: paymentId,
            orderId: createdOrderId,
            amount: price,
            name: fullName,
            email: email,
            productDriveUrl: liveProductUrl,
          });
        },
      };

      if (data.order.isRealRazorpayOrder && data.order.id) {
        options.order_id = data.order.id;
      }

      if (typeof window !== 'undefined' && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        
        // Listen for payment failure or modal dismissal
        rzp.on('payment.failed', async function (failedResp: any) {
          console.warn('Payment Failed event:', failedResp.error);
          
          // Log failed payment in backend database
          await fetch('/api/confirm-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: createdOrderId,
              paymentId: failedResp.error?.metadata?.payment_id || `pay_failed_${Date.now()}`,
              status: 'Failed',
              name: fullName,
              email: email,
              phone: phone,
              amount: price,
              hasOrderBump: false,
              package: 'All-In-One Digital Planner (2026-2028 Edition)',
            }),
          });

          setErrorMessage(`Payment failed: ${failedResp.error?.description || 'Transaction cancelled'}. Please try again.`);
        });

        rzp.open();
      } else {
        // Fallback simulation for local preview without SDK
        trackMetaPurchase(price, `pay_sim_${Date.now()}`, false);
        setConfirmedOrder({
          paymentId: `pay_sim_${Date.now()}`,
          orderId: createdOrderId,
          amount: price,
          name: fullName,
          email: email,
          productDriveUrl: productDriveUrl,
        });
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMessage(err.message || 'Payment gateway connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="checkout-section" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-rose-50/40 to-slate-50 border-t border-slate-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* IF PAYMENT IS CONFIRMED -> SHOW CONFIRMATION & DIRECT GOOGLE DRIVE DOWNLOAD BUTTON */}
        {confirmedOrder ? (
          <div className="clean-card rounded-3xl p-8 sm:p-12 border-2 border-emerald-500 bg-white shadow-2xl text-center space-y-8 animate-in fade-in duration-500">
            
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center border-4 border-emerald-200 shadow-md">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                🎉 PAYMENT SUCCESSFUL & CONFIRMED
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Your Digital Planner Bundle Is Ready!
              </h2>
              <p className="text-slate-600 text-sm">
                Thank you, <strong className="text-slate-900">{confirmedOrder.name}</strong>! Your order has been recorded. A confirmation receipt with your download link was sent to <strong className="text-slate-900">{confirmedOrder.email}</strong>.
              </p>
            </div>

            {/* Receipt Details Box */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Product:</span>
                <span className="font-bold text-slate-900">All-In-One Digital Planner (2026-2028)</span>
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
                <span className="font-mono font-bold text-emerald-700">₹{confirmedOrder.amount} INR</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-500">Includes:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 600+ Pages, 5,000+ Stickers & 150 Covers
                </span>
              </div>
            </div>

            {/* REAL DIRECT GOOGLE DRIVE DOWNLOAD BUTTON */}
            <div className="space-y-3 max-w-md mx-auto">
              <a
                href={confirmedOrder.productDriveUrl || productDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-black text-base sm:text-lg py-4 px-6 rounded-2xl shadow-xl shadow-rose-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer border border-rose-300/30"
              >
                <Download className="w-5 h-5" />
                <span>Open & Download Planner Bundle (Google Drive)</span>
              </a>
            </div>

          </div>
        ) : (
          /* STANDARD CLEAN CHECKOUT FORM */
          <>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 bg-rose-100 border border-rose-300 text-rose-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <Lock className="w-3.5 h-3.5 text-rose-700" /> 256-Bit SSL Encrypted Instant Checkout
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3">
                Start Planning & Achieving Today
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Get instant digital access to all 600+ pages, 100+ templates, 150 covers, 5,000+ stickers & free 2026-2028 yearly updates.
              </p>
            </div>

            <div className="clean-card rounded-3xl p-6 sm:p-10 border-2 border-rose-300 bg-white shadow-2xl relative">
              
              <form onSubmit={handleCheckout} className="space-y-8">
                
                {/* 1. Product Summary & Price Box */}
                <div className="bg-gradient-to-br from-rose-50/70 to-purple-50/50 p-5 rounded-2xl border border-rose-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-rose-200/80">
                    <div>
                      <h3 className="text-slate-900 font-black text-lg sm:text-xl flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-rose-500" />
                        All-In-One Digital Planner (2026-2028 Edition)
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium">
                        600+ Hyperlinked Pages • 100+ Templates • 150 Covers • 5,000+ Stickers
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-slate-400 line-through font-mono">Regular ₹1,999</div>
                      <div className="text-2xl sm:text-3xl font-black text-rose-600 font-mono">
                        ₹{price}
                      </div>
                    </div>
                  </div>

                  {/* Instant Perks */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700 font-semibold">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Instant Drive Access
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 2026, 2027, 2028 Included
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> iPad & Android Ready
                    </span>
                  </div>
                </div>

                {/* 2. Customer Delivery Form */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <User className="w-4 h-4 text-rose-500" /> Customer Delivery Details
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="text-xs text-slate-700 font-bold">Full Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Aanya Sharma"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <label className="text-xs text-slate-700 font-bold">Phone / WhatsApp Number *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 9876543210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-700 font-bold">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. aanya@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 transition-colors"
                      />
                    </div>
                    <p className="text-[11px] text-rose-600 font-medium pt-0.5">
                      🌸 Your full Google Drive download bundle link is sent here instantly in &lt;5 seconds.
                    </p>
                  </div>
                </div>

                {/* Error Display */}
                {errorMessage && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* 3. Total Calculation & High-Visibility Payment Button */}
                <div className="pt-4 border-t border-slate-200 space-y-4">
                  
                  <div className="flex items-center justify-between text-sm sm:text-base font-bold text-slate-800">
                    <span>Total Amount Payable:</span>
                    <span className="text-2xl sm:text-3xl font-black text-rose-600 font-mono">
                      ₹{price} INR
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-black text-lg sm:text-xl py-4 px-6 rounded-2xl shadow-xl shadow-rose-500/20 transition-all flex items-center justify-center gap-2 border border-rose-300/30 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Clock className="w-5 h-5 animate-spin" /> Connecting to Secure Gateway...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Zap className="w-5 h-5 fill-white" />
                        Pay ₹{price} & Download Planner Instantly 🌸
                      </span>
                    )}
                  </button>

                  {/* Trust Logos & SSL Indicator */}
                  <div className="space-y-3 pt-2 text-center">
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Supported Payment Methods (0% Transaction Fee):</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold text-slate-700">
                      <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-emerald-700">GPay</span>
                      <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-purple-700">PhonePe</span>
                      <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-cyan-700">Paytm</span>
                      <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-amber-700">UPI / QR</span>
                      <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-blue-700">Credit / Debit Cards</span>
                      <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-slate-700">NetBanking</span>
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
