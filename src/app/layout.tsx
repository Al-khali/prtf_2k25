import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

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
  openGraph: {
    title: "Khalid - Data Engineer & Creative Technologist",
    description: "Building bridges between data and dreams. Interactive portfolio with 3D experiences and hidden easter eggs.",
    type: "website",
    url: "https://khalid-portfolio.netlify.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khalid - Data Engineer & Creative Technologist",
    description: "Building bridges between data and dreams. Interactive portfolio with 3D experiences and hidden easter eggs.",
  }
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
        {children}
      </body>
    </html>
  );
}
