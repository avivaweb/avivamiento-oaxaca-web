import type { Metadata } from "next";
import Script from 'next/script';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import FloatingServiceButton from "@/components/FloatingServiceButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.avivamientooaxaca.com'),
  keywords: ["Vida Zoé", "Oaxaca", "Nueva Realidad", "Iglesia Cristiana", "Avivamiento", "Thissis Kainós", "Tetelestai"],
  title: {
    default: "Avivamiento Oaxaca | El Lugar de Su Presencia",
    template: "%s | Avivamiento Oaxaca"
  },
  description: "Una casa apostólica donde se manifiesta la Vida Zoé. Somos una Nueva Creación (Thissis Kainós) levantada para establecer el Reino de Dios en Oaxaca.",
  icons: {
    icon: "/favicon-aviva.png",
    apple: "/favicon-aviva.png",
  },
  openGraph: {
    title: "Avivamiento Oaxaca | El Lugar de Su Presencia",
    description: "El tiempo de la canción ha llegado. Una atmósfera de adoración y milagros donde el Cielo toca la Tierra.",
    url: 'https://www.avivamientooaxaca.com',
    siteName: 'Avivamiento Oaxaca',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: 'https://www.avivamientooaxaca.com/logo-aviva.png',
        width: 1200,
        height: 630,
        alt: 'Avivamiento Oaxaca - El tiempo de la canción ha llegado',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* CRÍTICO: PIXELES EN EL HEAD PARA CARGA RÁPIDA */}
      <head>
        {/* 1. GA4 (Google Analytics) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1R8W0K0X0T"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1R8W0K0X0T');
          `}
        </Script>

        {/* 2. META PIXEL (Facebook/Instagram) */}
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
            fbq('init', '799070049801997');
            fbq('track', 'PageView');
          `}
        </Script>
        {/* 3. TIKTOK PIXEL (Se coloca en el body o al final del head) */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","load","ready","alias","pageLoad","trackHttpStream","untrack"],ttq.instance=function(t){return ttq.setAndTrack=function(t, e, n){ttq.track(t, e, n)},t in w?w[t]:(w[t]=ttq,w[t].push=ttq.push.bind(w[t]),w[t])};
              w[t]=ttq;
              var s=d.createElement('script');s.src='https://sf16-scmcdn-va.ibytedtos.com/goofy/ttobj/tag.js';s.async=true;
              d.getElementsByTagName('head')[0].appendChild(s);
            }(window, document, 'ttq');
            ttq.load('C2147483648'); // ID de TikTok Pixel
            ttq.page();
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ReligiousOrganization",
                "name": "Avivamiento Oaxaca",
                "url": "https://www.avivamientooaxaca.com",
                "logo": "https://www.avivamientooaxaca.com/logo-aviva.png",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Oaxaca",
                  "addressRegion": "OAX",
                  "addressCountry": "MX"
                },
                "event": [
                  {
                    "@type": "Event",
                    "name": "Reunión de Oración",
                    "startDate": "2024-01-01T18:30",
                    "eventSchedule": {
                      "@type": "Schedule",
                      "byDay": "https://schema.org/Tuesday",
                      "startTime": "18:30"
                    }
                  },
                  {
                    "@type": "Event",
                    "name": "Reunión General",
                    "startDate": "2024-01-01T11:00",
                    "eventSchedule": {
                      "@type": "Schedule",
                      "byDay": "https://schema.org/Sunday",
                      "startTime": "11:00"
                    }
                  }
                ]
              })
            }}
          />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <FloatingServiceButton />
        </AuthProvider>
      </body>
    </html >
  );
}
