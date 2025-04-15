// app/layout.tsx
import './globals.css'
import Script from 'next/script'
import { ReactNode } from 'react'
import RouteChangeTracker from './providers'

export const metadata = {
  title: 'FURTHER',
  description: 'Next.js GTM Setup',
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Tag Manager Script */}
        {GTM_ID && (
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}
      </head>
      <body>
        {/* ✅ GTM Fallback for NoScript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* ✅ Page view tracker */}
        <RouteChangeTracker />
        {children}
      </body>
    </html>
  )
}
