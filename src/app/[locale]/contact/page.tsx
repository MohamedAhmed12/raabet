import { PublicContainer } from "@/components/PublicContainer";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Head from "next/head";
import { ContactSection } from "./_components/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us - Rabet",
  description:
    "Get in touch with the Rabet team for support, feedback, or inquiries.",
};

export default async function ContactPage() {
  const locale = await getLocale();

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/contact`}
        />
      </Head>
      <PublicContainer>
        <ContactSection />
      </PublicContainer>
    </>
  );
}
