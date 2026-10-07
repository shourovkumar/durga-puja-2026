import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Noto_Serif_Bengali } from "next/font/google";
import type { ReactNode } from "react";

import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { festival } from "@/data/festival";
import { getSiteUrl, isIndexableSite, siteUrl } from "@/lib/site-url";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

const notoSerifBengali = Noto_Serif_Bengali({
  display: "swap",
  subsets: ["bengali"],
  variable: "--font-bengali-serif",
  weight: ["400", "500", "600", "700"],
});

const socialPreviewUrl = getSiteUrl(festival.seo.socialPreviewPath);

export const metadata: Metadata = {
  title: festival.seo.title,
  description: festival.seo.description,
  applicationName: festival.seo.siteName,
  authors: [{ name: festival.seo.siteName }],
  creator: festival.seo.siteName,
  publisher: festival.seo.siteName,
  keywords: [...festival.seo.keywords],
  metadataBase: siteUrl,
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    title: festival.seo.title,
    description: festival.seo.description,
    siteName: festival.seo.siteName,
    locale: festival.seo.openGraphLocale,
    type: "website",
    url: siteUrl ? "/" : undefined,
    images: socialPreviewUrl
      ? [
          {
            url: socialPreviewUrl,
            width: 1200,
            height: 630,
            alt: festival.seo.socialPreviewAlt,
          },
        ]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: festival.seo.title,
    description: festival.seo.description,
    images: socialPreviewUrl ? [socialPreviewUrl] : undefined,
  },
  robots: {
    index: isIndexableSite,
    follow: isIndexableSite,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#080707",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${manrope.variable} ${notoSerifBengali.variable}`}>
        <SmoothScroll />
        <SkipLink />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
