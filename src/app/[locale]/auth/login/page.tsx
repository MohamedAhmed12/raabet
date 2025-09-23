"use client";
import { GalleryVerticalEnd } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

import { LoginForm } from "@/app/[locale]/auth/components/LoginForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rabetlink.com";

  return {
    title: locale === "ar" ? "تسجيل الدخول - رابط" : "Login - Rabet Link",
    description: locale === "ar" 
      ? "سجل الدخول إلى حسابك في رابط لإدارة روابطك الشخصية"
      : "Sign in to your Rabet account to manage your personal links",
    alternates: {
      canonical: `${baseUrl}/${locale}/auth/login`,
      languages: {
        en: `${baseUrl}/en/auth/login`,
        ar: `${baseUrl}/ar/auth/login`,
        "x-default": `${baseUrl}/en/auth/login`,
      },
    },
  };
}

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="\" className="flex items-center gap-2 font-medium" dir="ltr">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Rabet Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="flex-1 relative hidden bg-muted lg:block">
        <Image
          src="/images/login-bg.jpg"
          alt="login"
          fill
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
