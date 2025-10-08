import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { MusicProvider } from "@/contexts/MusicContext";
import { AmbientMusicProvider } from "@/contexts/AmbientMusicContext";
import AccessibilityProvider from "@/components/AccessibilityProvider";
import { criticalCSS } from "@/lib/critical-css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khalid | Data Engineer & Creative Technologist",
  description:
    "Portfolio futuriste de Khalid, Data Engineer & Creative Technologist, spécialisé en pipelines scalables, IA et expériences immersives.",
  keywords:
    "data engineer, creative technologist, portfolio, next.js, tailwind, data pipeline, IA, expérience immersive",
  authors: [{ name: "Khalid" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#05050A",
  openGraph: {
    title: "Khalid | Data Engineer & Creative Technologist",
    description:
      "Plateforme portfolio sur-mesure pour projets data, IA et expériences interactives futuristes.",
    type: "website",
    url: "https://khalid-portfolio.netlify.app",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khalid | Data Engineer & Creative Technologist",
    description:
      "Portfolio futuriste pour pipelines data, IA et expériences interactives.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Critical CSS inlined for immediate render */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
  {/* DNS prefetch for API usage */}
  <link rel="dns-prefetch" href="https://api.openai.com" />
  <link rel="dns-prefetch" href="https://generativelanguage.googleapis.com" />
        
        {/* Prefetch likely next pages */}
        <link rel="prefetch" href="/projects" />
        <link rel="prefetch" href="/about" />
      </head>
      <body
        className={`${inter.className} antialiased`}
      >
        <AccessibilityProvider>
          <AmbientMusicProvider>
            <MusicProvider>
              {children}
            </MusicProvider>
          </AmbientMusicProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
