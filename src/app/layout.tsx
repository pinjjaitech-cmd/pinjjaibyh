import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono, Lexend_Deca } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import SessionProvider from "@/components/providers/SessionProvider";
import StructuredData from "@/components/StructuredData";
import { cookies } from "next/headers";

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pinjjai by H - Handcrafted Crochet Bags | Empowering Women Artisans",
    template: "%s | Pinjjai by H"
  },
  description: "Discover handcrafted crochet bags made by women artisans in Punjab. Pinjjai by H preserves traditional craftsmanship while empowering rural communities through fair wages and sustainable fashion.",
  keywords: ["handcrafted bags", "crochet bags", "artisan crafts", "women empowerment", "sustainable fashion", "traditional crafts", "Punjab artisans", "fair trade", "ethical fashion"],
  authors: [{ name: "Harman Seera" }],
  creator: "Pinjjai by H",
  publisher: "Pinjjai by H",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pinjjai.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    title: 'Pinjjai by H - Handcrafted Crochet Bags | Empowering Women Artisans',
    description: 'Discover handcrafted crochet bags made by women artisans in Punjab. Each bag tells a story of tradition, empowerment, and sustainable craftsmanship.',
    siteName: 'Pinjjai by H',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pinjjai by H - Handcrafted Crochet Bags',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pinjjai by H - Handcrafted Crochet Bags',
    description: 'Empowering women artisans in Punjab through traditional crochet craftsmanship. Each bag is a story of heritage and hope.',
    images: ['/twitter-image.jpg'],
    creator: '@pinjjai_by_h',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData type="organization" />
        <StructuredData type="website" />
      </head>
      <body
        className={`${lexendDeca.variable} ${cormorantGaramond.variable} ${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        <SessionProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            {children}
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
