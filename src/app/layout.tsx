import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import localFont from "next/font/local";
import { Toaster } from "sonner";

import { Providers } from "@/components/providers/Providers";
import { authOptions } from "@/lib/auth";
import { customGetLocale } from "@/lib/customGetLocale";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getServerSession } from "next-auth";
import arMessages from "../messages/ar.json";
import enMessages from "../messages/en.json";
import LazySentryInit from "./lazy-sentry-init";

const notoSans = localFont({
  src: [
    {
      path: "../fonts/NotoSansDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/NotoSansDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/NotoSansDisplay-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/NotoSansDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/NotoSansDisplay-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-noto-sans-display",
  display: "swap",
  preload: true,
});

const Cairo = localFont({
  src: [
    {
      path: "../fonts/Cairo-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Cairo-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Cairo-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Cairo-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Cairo-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-cairo",
  display: "swap",
  preload: true,
});

const messages: Record<string, any> = {
  en: enMessages,
  ar: arMessages,
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: string = await customGetLocale();
  const currentLocalMessages = messages[locale];
  const metadata = currentLocalMessages.Metadata;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rabetlink.com";

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RabetLink",
    alternateName: "رابط لينك",
    url: baseUrl,
    logo: `${baseUrl}/svg/mainLogo.svg`,
    description:
      locale === "ar"
        ? "أداة رابط في السيرة الذاتية لإدارة روابط وسائل التواصل الاجتماعي. اجمع حساباتك الاجتماعية، والموسيقى، ومقاطع الفيديو، والمزيد في صفحة جميلة."
        : "Link in Bio Tool for Social Media Link Management. Gather your socials, music, videos, and more on a beautiful link-in-bio page.",
    foundingDate: "2025",
    sameAs: [
      "https://www.instagram.com/rabetlink",
      "https://www.youtube.com/@rabetlink",
      "https://twitter.com/rabetlink",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "support@rabet-link.com",
      availableLanguage: ["English", "Arabic"],
    },
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RabetLink",
    alternateName: "رابط لينك",
    url: baseUrl,
    description: organizationSchema.description,
    publisher: {
      "@type": "Organization",
      name: "RabetLink",
      url: baseUrl,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/${locale}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // Software Application Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "RabetLink",
    alternateName: "رابط لينك",
    url: baseUrl,
    description: organizationSchema.description,
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    author: {
      "@type": "Organization",
      name: "RabetLink",
    },
    offers: [
      {
        "@type": "Offer",
        name: locale === "ar" ? "خطة مجانية" : "Free Plan",
        price: "0",
        priceCurrency: "USD",
        description:
          locale === "ar"
            ? "خطة مجانية مع ميزات أساسية لإدارة الروابط"
            : "Free plan with basic link management features",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: locale === "ar" ? "خطة متميزة" : "Premium Plan",
        price: "9.99",
        priceCurrency: "USD",
        description:
          locale === "ar"
            ? "خطة متميزة مع ميزات متقدمة وتخصيص كامل"
            : "Premium plan with advanced features and full customization",
        availability: "https://schema.org/InStock",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
  };

  // Combine all schemas into a single JSON-LD script
  const combinedSchema = [organizationSchema, websiteSchema, softwareSchema];

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    icons: {
      icon: [
        "/svg/mainLogo.svg",
        { url: "/svg/mainLogo.svg", media: "(prefers-color-scheme: dark)" },
      ],
    },
    openGraph: {
      title: metadata.openGraph.title,
      description: metadata.openGraph.description,
      url: baseUrl,
      siteName: metadata.openGraph.siteName,
      images: [
        {
          url: "/images/meta-data-screenshot.png",
          width: 1200,
          height: 630,
          alt:
            locale === "ar"
              ? "رابط لينك - لوحة تحكم أداة رابط في السيرة الذاتية"
              : "RabetLink - Link in Bio Tool Dashboard",
        },
      ],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.twitter.title,
      description: metadata.twitter.description,
      images: ["/images/meta-data-screenshot.png"],
    },
    metadataBase: new URL(baseUrl),
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_KEY,
    },
    // Schema.org structured data using Next.js Metadata API
    other: {
      "application/ld+json": JSON.stringify(combinedSchema),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale: string = await customGetLocale();
  const session = await getServerSession(authOptions);
  const currentLocalMessages = messages[locale];
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body
        className={`${Cairo.variable} ${notoSans.variable} antialiased text-deep-blue-gray`}
        style={{ marginRight: "0!important" }}
      >
        <LazySentryInit />

        <NextIntlClientProvider locale={locale} messages={currentLocalMessages}>
          <Providers session={session}>
            <Toaster />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </Providers>
        </NextIntlClientProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID &&
        process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
    </html>
  );
}
