import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { MusicProvider } from "@/contexts/MusicContext";
import AccessibilityProvider from "@/components/AccessibilityProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khalid - Data Engineer & Creative Technologist",
  description: "Portfolio of Khalid - Data Engineer, Creative Technologist, and builder of bridges between data and dreams. Featuring interactive experiences, 3D visuals, and hidden easter eggs.",
  keywords: "data engineer, creative technologist, portfolio, react, next.js, three.js, data visualization, indie games",
  authors: [{ name: "Khalid" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0c0d10",
  openGraph: {
    title: "Khalid - Data Engineer & Creative Technologist",
    description: "Building bridges between data and dreams. Interactive portfolio with 3D experiences and hidden easter eggs.",
    type: "website",
    url: "https://khalid-portfolio.netlify.app",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khalid - Data Engineer & Creative Technologist",
    description: "Building bridges between data and dreams. Interactive portfolio with 3D experiences and hidden easter eggs.",
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
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <AccessibilityProvider>
          <MusicProvider>
            {children}
          </MusicProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
