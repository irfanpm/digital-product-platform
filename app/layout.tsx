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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://digital-product-platform-ten.vercel.app')),
  title: 'The Money Saving System | Plan. Save. See Progress.',
  description: 'A complete savings system: printable challenges, a smart Excel Savings Goal Tracker and a step-by-step guide. Try the interactive preview and see the real product.',
  openGraph: {
    title: 'The Money Saving System',
    description: 'Give your savings a clearer place to plan, record and understand progress.',
    images: [{ url: '/images/savings/dashboard.png', width: 1536, height: 1024, alt: 'Real Savings Goal Tracker dashboard' }],
    locale: 'en_IN',
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
