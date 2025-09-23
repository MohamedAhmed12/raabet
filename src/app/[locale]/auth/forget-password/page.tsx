"use client";

import { Metadata } from "next";

import { ForgetPasswordForm } from "../components/ForgerPasswordForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rabetlink.com";

  return {
    title: locale === "ar" ? "نسيان كلمة المرور - رابط" : "Forgot Password - Rabet Link",
    description: locale === "ar" 
      ? "استعد كلمة مرورك في رابط"
      : "Reset your Rabet account password",
    alternates: {
      canonical: `${baseUrl}/${locale}/auth/forget-password`,
      languages: {
        en: `${baseUrl}/en/auth/forget-password`,
        ar: `${baseUrl}/ar/auth/forget-password`,
        "x-default": `${baseUrl}/en/auth/forget-password`,
      },
    },
  };
}
  
export default function ForgetPassword() {
  return (
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl">
            <ForgetPasswordForm />
          </div>
        </div>
      </div>
  )
}
