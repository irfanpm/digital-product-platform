import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The AI Job Application Kit (2026 Edition) — Beat ATS & Land 3x Interviews',
  description:
    'The complete 38-page AI Career Operating System. 10 ATS-optimized templates, 65+ AI prompts, 50-master interview question bank, STAR Framework, salary negotiation scripts, and 30-day action plan.',
  openGraph: {
    title: 'The AI Job Application Kit (2026 Edition)',
    description: '38-Page Complete System for Resume ATS Optimization & AI Mock Interviews.',
    type: 'website',
  },
};

import dbConnect from '@/lib/dbConnect';
import Setting from '@/models/Setting';

async function getMetaPixelId() {
  try {
    const conn = await dbConnect();
    if (conn) {
      const setting = await Setting.findOne({}).lean() as any;
      if (setting?.metaPixelId) return setting.metaPixelId;
    }
  } catch (err) {
    console.warn('Error fetching meta pixel:', err);
  }
  
  const globalSettings = (global as any).globalMemorySettings;
  if (globalSettings?.metaPixelId) return globalSettings.metaPixelId;

  return process.env.NEXT_PUBLIC_META_PIXEL_ID || '123456789012345';
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const metaPixelId = await getMetaPixelId();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Razorpay Checkout SDK */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />

        {/* Meta Pixel (Facebook Ads Pixel Tracking) */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
            fbq('track', 'ViewContent', {
              content_name: 'The AI Job Application Kit 38-Page System',
              currency: 'INR',
              value: 199
            });
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            alt="Meta Pixel"
          />
        </noscript>
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
