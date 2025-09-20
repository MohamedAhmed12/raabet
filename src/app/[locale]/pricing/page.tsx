import { PublicContainer } from "@/components/PublicContainer";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import Head from "next/head";
import { Metadata } from "next";
import { FeaturesCard } from "./FeaturesCard";
import { PlansCard } from "./PlansCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rabetlink.com";

  return {
    title: locale === "ar" ? "الأسعار والخطط - رابط" : "Pricing & Plans - Rabet Link",
    description:
      locale === "ar"
        ? "اختر الخطة المناسبة لك من خطط رابط لينك. خطط مجانية ومتميزة لإدارة روابطك الشخصية"
        : "Choose the right plan for you from Rabet Link plans. Free and premium plans for managing your personal links",
    openGraph: {
      title: locale === "ar" ? "الأسعار والخطط - رابط" : "Pricing & Plans - Rabet Link",
      description:
        locale === "ar"
          ? "اختر الخطة المناسبة لك من خطط رابط لينك. خطط مجانية ومتميزة لإدارة روابطك الشخصية"
          : "Choose the right plan for you from Rabet Link plans. Free and premium plans for managing your personal links",
      url: `${baseUrl}/${locale}/pricing`,
      siteName: "Rabet Link",
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/pricing`,
      languages: {
        en: `${baseUrl}/en/pricing`,
        ar: `${baseUrl}/ar/pricing`,
        "x-default": `${baseUrl}/en/pricing`,
      },
    },
  };
}

export default async function Pricing() {
  const t = await getTranslations();
  const locale = await getLocale();
  const fontClass = getFontClassClient(locale);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rabetlink.com';

  return (
    <>
      <Head>
        <link rel="canonical" href={`${baseUrl}/${locale}/pricing`} />
      </Head>
      <PublicContainer>
      <div className="flex flex-col px-[7vw] pb-16">
        <div
          className={cn(
            "flex flex-col justify-center items-center mt-16",
            fontClass
          )}
        >
          <div
            className={cn(
              "flex flex-col justify-center items-center text-[2.9rem] leading-[.8] font-extrabold text-deep-blue-gray text-center mb-8 capitalize",
              "lg:flex-row gap-5 lg:text-[4.2rem]"
            )}
          >
            <span className="relative max-w-max">
              <span className="relative inline-block z-[4]">
                {t("Pricing.plans")}
              </span>
              <div
                className={cn(
                  "h-[17px] absolute inset-0 bottom-[0.15em] left-[-3%] right-[-3%] bg-light-orange z-[0]",
                  locale == "ar" ? "top-[0.54em]" : "top-[0.60em]",
                  "lg:h-[23px]"
                )}
              ></div>
            </span>
            <div className="flex gap-3">
              <span>{t("Shared.and")}</span>
              <span>{t("Shared.pricing")}</span>
            </div>
          </div>
          <span className="text-lg text-center max-w-[625px] mb-8">
            {t("Pricing.description")}
          </span>
        </div>
        <div className="flex justify-center mt-[50px]">
          <FeaturesCard />
          <PlansCard />
        </div>
      </div>
      </PublicContainer>
    </>
  );
}
