import { PublicContainer } from "@/components/PublicContainer";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Head from "next/head";
import { ContactSection } from "./_components/ContactSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rabetlink.com";

  return {
    title: locale === "ar" ? "اتصل بنا - رابط" : "Contact Us - Rabet Link",
    description:
      locale === "ar"
        ? "تواصل مع فريق رابط للحصول على الدعم أو الملاحظات أو الاستفسارات"
        : "Get in touch with the Rabet team for support, feedback, or inquiries.",
    openGraph: {
      title: locale === "ar" ? "اتصل بنا - رابط" : "Contact Us - Rabet Link",
      description:
        locale === "ar"
          ? "تواصل مع فريق رابط للحصول على الدعم أو الملاحظات أو الاستفسارات"
          : "Get in touch with the Rabet team for support, feedback, or inquiries.",
      url: `${baseUrl}/${locale}/contact`,
      siteName: "Rabet Link",
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: {
        en: `${baseUrl}/en/contact`,
        ar: `${baseUrl}/ar/contact`,
        "x-default": `${baseUrl}/en/contact`,
      },
    },
  };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rabetlink.com';

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${baseUrl}/${locale}/contact`}
        />
      </Head>
      <PublicContainer>
        <ContactSection />
      </PublicContainer>
    </>
  );
}
