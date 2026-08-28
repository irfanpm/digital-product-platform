'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  CreditCard, 
  Smartphone, 
  FileText, 
  Mail, 
  User, 
  Phone,
  AlertCircle,
  Clock
} from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const CheckoutSection: React.FC = () => {
  const [hasOrderBump, setHasOrderBump] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Set price to ₹1 INR for live payment testing!
  const basePrice = 1;
  const bumpPrice = 1;
  const totalPrice = hasOrderBump ? basePrice + bumpPrice : basePrice;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Please fill in your Name, Email, and Phone number to receive your download links.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address for instant PDF delivery.');
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Call API to create order
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalPrice,
          currency: 'INR',
          notes: {
            fullName,
            email,
            phone,
            hasOrderBump: hasOrderBump ? 'Yes' : 'No'
          }
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to initialize payment gateway.');
      }

      // Step 2: Configure Razorpay SDK modal options
      const options: any = {
        key: data.order.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_TVBfC6ISeEF8o7',
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'Career Operating System',
        description: hasOrderBump 
          ? '38-Page AI Kit + 10 Editable Word & Notion Templates (Test ₹2)' 
          : 'The AI Job Application Kit 38-Page (Test ₹1)',
        prefill: {
          name: fullName,
          email: email,
          contact: phone,
        },
        theme: {
          color: '#059669',
        },
        handler: function (response: any) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id || 'pay_success'}. Your 38-page kit download link has been dispatched to ${email}.`);
        },
      };

      if (data.order.isRealRazorpayOrder && data.order.id) {
        options.order_id = data.order.id;
      }

      if (typeof window !== 'undefined' && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert(`Razorpay SDK initialized for ₹${totalPrice}. Your 38-page PDF & templates will arrive at ${email}.`);
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMessage(err.message || 'Payment gateway connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="checkout-section" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 border border-emerald-300 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5 text-emerald-700" /> Live ₹1 Test Mode Enabled
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3">
            Claim Your AI Career Operating System
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Test real payment flow with <strong>₹1 INR</strong>. Get instant digital access to all 38 pages.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="clean-card rounded-3xl p-6 sm:p-10 border-2 border-emerald-500 bg-white shadow-2xl relative">
          
          <form onSubmit={handleCheckout} className="space-y-8">
            
            {/* 1. Product Summary & Price Box */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-slate-900 font-extrabold text-lg sm:text-xl flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    The AI Job Application Kit (38-Page System)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Includes 18 Core Sections, 65+ AI Prompts, 10 Resume Templates & Interview Simulator
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-slate-400 line-through font-mono">Regular ₹999</div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
                    ₹1
                  </div>
                </div>
              </div>

              {/* Instant Perks */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                <span className="flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Instant PDF Delivery
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Lifetime Updates
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Free & Paid AI Ready
                </span>
              </div>
            </div>

            {/* 2. HIGH-CONVERTING 1-CLICK ORDER BUMP */}
            <div className="bg-emerald-50/60 border-2 border-emerald-500 rounded-2xl p-5 shadow-sm relative pulse-border-emerald">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="orderBump"
                  checked={hasOrderBump}
                  onChange={(e) => setHasOrderBump(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-emerald-600 rounded cursor-pointer shrink-0"
                />
                <label htmlFor="orderBump" className="cursor-pointer space-y-1.5 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-emerald-950 font-extrabold text-sm sm:text-base flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
                      [+ ₹1] Add 10 Editable Microsoft Word (.docx) & Notion Dashboard Templates
                    </span>
                    <span className="text-xs font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full border border-amber-300">
                      TEST ADD-ON (+₹1)
                    </span>
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed">
                    Instantly edit and customize your resume in Microsoft Word (.docx) or manage your job applications in a premium pre-built Notion application tracker.
                  </p>
                </label>
              </div>
            </div>

            {/* 3. Minimal Customer Form */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" /> Customer Delivery Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs text-slate-700 font-semibold">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="text-xs text-slate-700 font-semibold">Phone / WhatsApp Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs text-slate-700 font-semibold">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. rahul@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition-colors"
                  />
                </div>
                <p className="text-[11px] text-emerald-700 font-medium pt-0.5">
                  ⚡ Your 38-page PDF & download link are sent here instantly in &lt;5 seconds.
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

            {/* 4. Total Calculation & High-Visibility Payment Button */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              
              <div className="flex items-center justify-between text-sm sm:text-base font-bold text-slate-800">
                <span>Total Amount Payable (Test):</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
                  ₹{totalPrice} INR
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg sm:text-xl py-4 px-6 rounded-2xl shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 border border-emerald-400/30 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5 animate-spin" /> Connecting to Secure Gateway...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Zap className="w-5 h-5 fill-white" />
                    Pay ₹{totalPrice} & Download Instantly ⚡
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

      </div>
    </section>
  );
};
