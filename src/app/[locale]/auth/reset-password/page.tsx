import { Metadata } from "next";
import ResetPasswordForm from "../components/ResetPasswordForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rabetlink.com";

  return {
    title: locale === "ar" ? "إعادة تعيين كلمة المرور - رابط" : "Reset Password - Rabet Link",
    description: locale === "ar" 
      ? "أعد تعيين كلمة مرورك في رابط"
      : "Set a new password for your Rabet account",
    alternates: {
      canonical: `${baseUrl}/${locale}/auth/reset-password`,
      languages: {
        en: `${baseUrl}/en/auth/reset-password`,
        ar: `${baseUrl}/ar/auth/reset-password`,
        "x-default": `${baseUrl}/en/auth/reset-password`,
      },
    },
  };
}

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 md:p-10 h-screen">
      <ResetPasswordForm />
    </div>
  );
}
