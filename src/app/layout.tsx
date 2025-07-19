import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Noto_Sans_Display } from "next/font/google";
import { Toaster } from "sonner";

import { customGetLocale } from "@/lib/customGetLocale";
import arMessages from "../messages/ar.json";
import enMessages from "../messages/en.json";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const notoSans = Noto_Sans_Display({
  subsets: ["latin"],
  variable: "--font-noto-sans-display",
  weight: ["400", "500", "600", "700", "800"], // Add font weights as needed
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
