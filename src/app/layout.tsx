import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import { headers } from "next/headers";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { homeDescription, homeTitle, ogImage } from "@/config/seo";
import { site } from "@/config/site";
import { contractorJsonLd } from "@/lib/jsonld";
import { publicEnv } from "@/lib/env.public";

import "./globals.css";

export const dynamic = "force-dynamic";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.NEXT_PUBLIC_SITE_URL),
  title: {
    default: homeTitle,
    template: `%s | ${site.name}`,
  },
  description: homeDescription,
  applicationName: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
    siteName: site.name,
    locale: "en_CA",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [ogImage.url],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Force a request so Next.js can copy the middleware CSP nonce onto its scripts.
  await headers();

  return (
    <html lang="en">
      <body
        className={`${sourceSans.variable} ${oswald.variable} flex min-h-screen flex-col bg-cream font-sans text-ink antialiased`}
      >
        <JsonLd data={contractorJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1 pb-[calc(5.5rem+env(safe-area-inset-bottom))] xl:pb-0">
          {children}
        </main>
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  );
}
