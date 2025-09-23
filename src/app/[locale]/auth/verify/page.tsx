"use client";
import { Metadata } from "next";

import { cn } from "@/lib/cn";
import { getFontClassClient } from "@/lib/fonts";
import { GalleryVerticalEnd } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import Image from "next/image";
import VerifyForm from "./verifyForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rabetlink.com";

  return {
    title: locale === "ar" ? "تأكيد الحساب - رابط" : "Verify Account - Rabet Link",
    description: locale === "ar" 
      ? "أكد حسابك في رابط"
      : "Verify your Rabet account email",
    alternates: {
      canonical: `${baseUrl}/${locale}/auth/verify`,
      languages: {
        en: `${baseUrl}/en/auth/verify`,
        ar: `${baseUrl}/ar/auth/verify`,
        "x-default": `${baseUrl}/en/auth/verify`,
      },
    },
  };
}

export default function VerifyPage() {
  const session = useSession();
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);

  // @ts-expect-error: [to access user data in session it exists in id]
  const authUser = session?.data?.user?.id;

  return (
    authUser && (
      <div className={cn("flex min-h-svh flex-col lg:flex-row", fontClass)}>
        <div className="flex flex-1 flex-col">
          <div className="flex justify-center w-full gap-2 md:justify-start">
            <a
              href="\"
              className="flex items-center h-[70px] w-full pl-8 gap-2 font-medium"
              dir="ltr"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4 " />
              </div>
              Rabet Inc.
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full h-full max-w-full max-h-screen">
              <VerifyForm email={authUser.email} />
            </div>
          </div>
        </div>
        <div className="flex-1 relative hidden bg-muted lg:block">
          <Image
            src="/images/login-bg.jpg"
            alt="verify"
            fill
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    )
  );
}
