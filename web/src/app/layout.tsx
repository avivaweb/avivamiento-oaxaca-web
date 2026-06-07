import type { Metadata } from "next";
import Script from 'next/script';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import FloatingServiceButton from "@/components/FloatingServiceButton";
import { siteConfig } from "@/config/site";

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
  keywords: ["Vida Zoé", "Oaxaca", "Pasión 2026", "Identidad", "Potencial Humano", "Transformación Territorial", "Legado", "Diseño Original"],
  title: {
    default: "Avivamiento Oaxaca | Restaurando el Diseño Original",
    template: "%s | Avivamiento Oaxaca"
  },
  description: "Descubre tu potencial y únete a un movimiento de transformación territorial. El tiempo de activar tu legado ha llegado.",
  icons: {
    icon: "/favicon-aviva.png",
    apple: "/favicon-aviva.png",
  },
  openGraph: {
    title: "Avivamiento Oaxaca | Restaurando el Diseño Original",
    description: "Descubre tu potencial y únete a un movimiento de transformación territorial. El tiempo de activar tu legado ha llegado.",
    url: 'https://www.avivamientooaxaca.com',
    siteName: 'Avivamiento Oaxaca',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: 'https://www.avivamientooaxaca.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Avivamiento Oaxaca - Legado y Transformación',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Avivamiento Oaxaca | Restaurando el Diseño Original",
    description: "Descubre tu potencial y únete a un movimiento de transformación territorial. El tiempo de activar tu legado ha llegado.",
    images: ['https://www.avivamientooaxaca.com/og-image.jpg'],
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
        {siteConfig.analytics.gaId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${siteConfig.analytics.gaId}');
            `}
            </Script>
          </>
        )}
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
                "@type": "Organization",
                "name": "Avivamiento",
                "alternateName": "Centro de Transformación Avivamiento",
                "url": "https://www.avivamientooaxaca.com",
                "logo": "https://www.avivamientooaxaca.com/logo-aviva.png",
                "description": "Una organización de alto impacto dedicada a la restauración de la identidad humana y el establecimiento de un legado generacional en Oaxaca.",
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
                  "telephone": siteConfig.contact.phone,
                  "contactType": "leadership office",
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
                    "name": "Punto de Activación Semanal",
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
