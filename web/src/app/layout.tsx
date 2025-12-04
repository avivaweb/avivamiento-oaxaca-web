import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // 1. EL TÍTULO DE LA PESTAÑA
  title: "Avivamiento Oaxaca | El Lugar de Su Presencia",

  description: "Descubre tu lugar para conectar, crecer y encontrar comunidad en Avivamiento Oaxaca.",

  // 2. LA REFERENCIA AL FAVICON
  icons: {
    // Apunta al archivo en la carpeta /public
    icon: "/favicon-aviva.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
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
                "url": "https://avivamiento.com",
                "logo": "https://avivamiento.com/logo-aviva.png",
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
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
