# digital-product-platform

High-converting single-page digital product checkout platform for **"The AI Job Application Kit (Career Operating System)"** built with Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide Icons, MongoDB, and Razorpay.

## 🚀 Features

- **Scribblit/Notely Minimalist SaaS Theme**: Clean, responsive, mobile-first design.
- **18-Section PDF Blueprint Integration**: Deep hooks covering ATS optimization, 10 templates, 65+ AI prompts, STAR answers, mock interview simulator, 10 salary scripts, 30-day roadmap, and 15 worksheets.
- **Frictionless Checkout & Order Bump**: ₹1 / ₹299 product pricing with 1-click Order Bump `[+ ₹99]`.
- **Razorpay Payment Gateway**: Integration with GPay, PhonePe, Paytm, UPI, Cards, NetBanking, and HMAC SHA256 Webhook listener (`/api/webhook/razorpay`).
- **MongoDB Localhost Persistence**: Mongoose Schema & connection manager storing real customer orders (`mongodb://127.0.0.1:27017/ai_job_kit`).
- **Seller Admin Dashboard (`/admin`)**: Real-time sales stats, order bump performance, customer ledger table, search/filters, resend download link trigger, and CSV export.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB & Mongoose
- **Payments**: Razorpay Node SDK & Client JS SDK
- **Icons**: Lucide React

## 🏃 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env.local`:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/ai_job_kit
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

3. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the main checkout page or [http://localhost:3000/admin](http://localhost:3000/admin) for the Admin Dashboard.
