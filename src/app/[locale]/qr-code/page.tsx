"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackQRCodeView } from "../(protected)/dashboard/admin/qr-codes/actions/trackQRCodeView";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";

export default function QRCodePage() {
  const searchParams = useSearchParams();
  const url = searchParams?.get("url") || "";

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

  return <Loading />;
}
