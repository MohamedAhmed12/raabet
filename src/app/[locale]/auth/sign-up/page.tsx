import Image from "next/image";
import { Metadata } from "next";
import SignUpForm from "../components/SignupForm";
import { GalleryVerticalEnd } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rabetlink.com";

  return {
    title: locale === "ar" ? "إنشاء حساب - رابط" : "Sign Up - Rabet Link",
    description:
      locale === "ar"
        ? "أنشئ حسابك في رابط وابدأ في إدارة روابطك الشخصية"
        : "Create your Rabet account and start managing your personal links",
    alternates: {
      canonical: `${baseUrl}/${locale}/auth/sign-up`,
      languages: {
        en: `${baseUrl}/en/auth/sign-up`,
        ar: `${baseUrl}/ar/auth/sign-up`,
        "x-default": `${baseUrl}/en/auth/sign-up`,
      },
    },
  };
}

export default function SignUp() {
  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <div className="flex flex-1/2 flex-col gap-4 p-6 md:p-10">
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
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="flex-1/2 relative hidden lg:block">
        <Image src="/images/login-bg.jpg" alt="Sign-up" fill priority />
      </div>
    </div>
  );
}
