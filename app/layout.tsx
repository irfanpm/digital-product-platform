import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta'
});

export const metadata: Metadata = {
  title: 'The AI Job Application Kit 2026 | Beat ATS & Land 3x More Interviews',
  description: 'Complete 38-page AI Career Operating System. Includes 10 ATS templates, 65+ copy-paste AI prompts, STAR interview bank & salary negotiation scripts for ₹299.',
  keywords: 'AI job application kit, ATS resume templates, ChatGPT prompts for resume, STAR interview bank, salary negotiation scripts',
  openGraph: {
    title: 'The AI Job Application Kit (Career Operating System)',
    description: 'Stop sending 50+ blind applications to get ghosted. Get the complete 38-page toolkit for ₹299.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <head>
        {/* Razorpay SDK Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />

        {/* Meta Pixel Client Script Snippet */}
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
            fbq('init', '1234567890123456');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="font-sans bg-slate-50 text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
