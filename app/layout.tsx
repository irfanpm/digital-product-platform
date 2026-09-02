import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import dbConnect from '@/lib/dbConnect';
import Setting from '@/models/Setting';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'All-In-One Digital Planner (2026-2028) | 600+ Pages, 5,000+ Stickers & Templates',
  description:
    'Plan better, stay organized, and achieve more with the Ultimate All-In-One Hyperlinked Digital Planner (2026, 2027 & 2028). Features Rainbow Theme, 100+ Templates, 150 Covers, and 5000+ Aesthetic Digital Stickers for GoodNotes, Notability & iPad/Android.',
  keywords: [
    'Digital Planner 2026',
    'GoodNotes Planner',
    'iPad Planner',
    'All In One Digital Planner',
    'Notability Planner',
    'Penly Android Planner',
    'Digital Stickers',
    'Budget Planner',
    'Habit Tracker',
  ],
  authors: [{ name: 'Digital Planner Studio' }],
  openGraph: {
    title: 'All-In-One Digital Planner (2026-2028 Edition)',
    description:
      'The complete 600+ page hyperlinked digital life planner with 5,000+ stickers, 100+ templates, and free lifetime yearly updates.',
    url: 'https://digital-product-platform-ten.vercel.app',
    siteName: 'Digital Planner Studio',
    images: [
      {
        url: '/images/digital_planner_main_mockup.jpg',
        width: 1200,
        height: 630,
        alt: 'All-In-One Digital Planner 2026-2028 Mockup',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || '123456789012345';

  try {
    const conn = await dbConnect();
    if (conn) {
      const setting = await Setting.findOne({}).lean();
      if (setting && setting.metaPixelId) {
        metaPixelId = setting.metaPixelId;
      }
    }
  } catch (err) {
    console.warn('Could not load dynamic Meta Pixel ID in layout, using default fallback.');
  }

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        {/* Dynamic Meta Pixel Script */}
        {metaPixelId && (
          <>
            <Script
              id="meta-pixel-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
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
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
                alt="Meta Pixel"
              />
            </noscript>
          </>
        )}
      </head>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 selection:bg-pink-500 selection:text-white">
        {children}
        
        {/* Razorpay Checkout SDK */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
