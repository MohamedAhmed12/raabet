"use client";

import Loading from "@/app/loading";
import { useLocale } from "next-intl";
import Head from "next/head";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { trackQRCodeView } from "../(protected)/dashboard/admin/qr-codes/actions/trackQRCodeView";

export default function QRCodePage() {
  const searchParams = useSearchParams();
  const url = searchParams?.get("url") || "";
  const locale = useLocale();

  useEffect(() => {
    if (!url) {
      console.error("No URL parameter provided");
      redirect("/");
      return;
    }

    // Track the view and get the redirect URL
    async function handleRedirect() {
      try {
        const redirectUrl = await trackQRCodeView(url);

        // Redirect to the target URL
        window.location.href = redirectUrl;
      } catch (error) {
        console.error("Error processing QR code:", error);
        // Redirect to home if something goes wrong
        redirect("/");
      }
    }

    handleRedirect();
  }, [url]);

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/qr-code`}
        />
      </Head>
      <Loading />
    </>
  );
}
