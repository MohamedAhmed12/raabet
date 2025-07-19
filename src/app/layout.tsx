import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "sonner";
import localFont from "next/font/local";

import { customGetLocale } from "@/lib/customGetLocale";
import arMessages from "../messages/ar.json";
import enMessages from "../messages/en.json";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const notoSans = localFont({
  src: [
    { path: "../fonts/NotoSansDisplay-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/NotoSansDisplay-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/NotoSansDisplay-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/NotoSansDisplay-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/NotoSansDisplay-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-noto-sans-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rabet",
  description: "Created by Gad",
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
        className={`${notoSans.variable} antialiased text-deep-blue-gray`}
        style={{ marginRight: "0!important" }}
      >
        <NextIntlClientProvider locale={locale} messages={currentLocalMessages}>
          <ReactQueryProvider>
            <TooltipProvider>
              <Toaster />
              {children}
            </TooltipProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID &&
        process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
    </html>
  );
}
