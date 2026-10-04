import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import dbConnect from '@/lib/dbConnect';
import Setting from '@/models/Setting';
import { pixelId } from '@/lib/serverSafety';

export const dynamic = 'force-dynamic';

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
  title: 'AI Creator Kit | Create With AI. Step by Step.',
  description: 'Create websites, posters, ad plans and resumes with beginner-friendly guided workflows. See the real AI Creator Kit. One-time purchase.',
  openGraph: {
    title: 'AI Creator Kit',
    description: 'Turn your ideas into clear instructions and practical next steps with AI.',
    images: [{ url: '/images/creator/social.webp', width: 1200, height: 630, alt: 'AI Creator Kit: real dashboard preview' }],
    locale: 'en_IN',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let metaPixelId = pixelId(process.env.NEXT_PUBLIC_META_PIXEL_ID);

  try {
    const conn = await dbConnect();
    if (conn) {
      const setting = await Setting.findOne({}).lean();
      if (setting && setting.metaPixelId) {
        metaPixelId = pixelId(setting.metaPixelId) || metaPixelId;
      }
    }
  } catch (err) {
    console.warn('Could not load dynamic Meta Pixel ID in layout, using validated environment configuration.');
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
                  if (!window.savingsPixelInitialized) {
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', ${JSON.stringify(metaPixelId)});
                  fbq('track', 'PageView');
                  window.savingsPixelInitialized = true;
                  }
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
