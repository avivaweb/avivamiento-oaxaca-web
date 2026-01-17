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
  keywords: ["Vida Zoé", "Oaxaca", "Pasión 2026", "Iglesia Cristiana", "Avivamiento", "Thissis Kainós", "Nueva Raza", "Reforma"],
  title: {
    default: "Avivamiento Oaxaca | Pasión 2026: Nueva Raza",
    template: "%s | Avivamiento Oaxaca"
  },
  description: "Una casa apostólica donde se manifiesta la Vida Zoé. Somos una Nueva Creación (Thissis Kainós) levantada para establecer el gobierno de Dios a través de la Comunión, Autoridad y Hogar.",
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
        alt: 'Avivamiento Oaxaca - Pasión 2026',
      },
      {
        url: 'https://www.avivamientooaxaca.com/images/og-social.jpg',
        width: 1200,
        height: 630,
        alt: 'Comunidad de Fe en Oaxaca',
      }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* CRÍTICO: PIXELES EN EL HEAD PARA CARGA RÁPIDA */}
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
                "alternateName": "Centro Cristiano Avivamiento",
                "url": "https://www.avivamientooaxaca.com",
                "logo": "https://www.avivamientooaxaca.com/logo-aviva.png",
                "description": "Una casa apostólica donde se manifiesta la Vida Zoé. Somos una Nueva Creación levantada para establecer el gobierno de Dios en Oaxaca.",
                "foundingDate": "2015",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Símbolos Patrios 404, Col. Reforma Agraria",
                  "addressLocality": "Oaxaca de Juárez",
                  "addressRegion": "Oaxaca",
                  "postalCode": "68130",
                  "addressCountry": "MX"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "17.0371",
                  "longitude": "-96.7265"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+52-951-428-3375",
                  "contactType": "pastoral care",
                  "areaServed": "MX",
                  "availableLanguage": "Spanish"
                },
                "sameAs": [
                  "https://www.facebook.com/avivamientooaxaca",
                  "https://www.instagram.com/avivamiento_oaxaca",
                  "https://www.youtube.com/@AvivamientoOaxacaOficial"
                ],
                "event": [
                  {
                    "@type": "Event",
                    "name": "Servicio de Adoración y Milagros",
                    "eventSchedule": {
                      "@type": "Schedule",
                      "byDay": "https://schema.org/Sunday",
                      "startTime": "11:00",
                      "endTime": "13:30",
                      "repeatFrequency": "Weekly"
                    },
                    "location": {
                      "@type": "Place",
                      "name": "Auditorio Avivamiento",
                      "address": "Símbolos Patrios 404, Oaxaca"
                    }
                  },
                  {
                    "@type": "Event",
                    "name": "Martes de Fuego",
                    "eventSchedule": {
                      "@type": "Schedule",
                      "byDay": "https://schema.org/Tuesday",
                      "startTime": "19:00",
                      "endTime": "20:30",
                      "repeatFrequency": "Weekly"
                    },
                    "location": {
                      "@type": "Place",
                      "name": "Auditorio Avivamiento",
                      "address": "Símbolos Patrios 404, Oaxaca"
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
