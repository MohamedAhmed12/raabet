import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import localFont from "next/font/local";
import { Toaster } from "sonner";

import { Providers } from "@/components/providers/Providers";
import { customGetLocale } from "@/lib/customGetLocale";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
});

export const metadata: Metadata = {
  title: "Rabet",
  description:
    "Your link in bio tool to share all your important links in one place",
  icons: {
    icon: [
      "/svg/mainLogo.svg",
      { url: "/svg/mainLogo.svg", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    title: "Rabet - Your Link in Bio Tool",
    description: "Share all your important links in one beautiful profile",
    url: "https://rabetlink.com",
    siteName: "Rabet",
    images: [
      {
        url: "/images/meta-data-screenshot.png", // You need to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Rabet - Your Link in Bio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rabet - Your Link in Bio Tool",
    description: "Share all your important links in one beautiful profile",
    images: ["/images/meta-data-screenshot.png"], // Same image as above
  },
  metadataBase: new URL("https://rabetlink.com"),
};

const messages: Record<string, any> = {
  en: enMessages,
  ar: arMessages,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale: string = await customGetLocale();
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
          <Providers>
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
