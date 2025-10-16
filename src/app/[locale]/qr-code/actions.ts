"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { trackQRAnalytics } from "@/app/[locale]/(protected)/dashboard/admin/analytics/metrics/actions/trackQRAnalytics";
import { logError } from "@/lib/errorHandling";

export async function handleQRCodeRedirect(trackedUrl: string) {
  try {
    // Find the QR code by its tracked URL
    const qrCode = await prisma.qRCode.findUnique({
      where: { url: trackedUrl },
    });

    if (!qrCode) {
      // Redirect to home if QR code not found
      throw new Error("QR code not found");
    }

    // Track the QR code scan
    try {
      trackQRAnalytics(qrCode.id);
    } catch (trackingError) {
      logError(trackingError, {
        action: "trackQRAnalytics",
        errorType:
          trackingError instanceof Error
            ? trackingError.constructor.name
            : "UnknownError",
        qrCodeId: qrCode.id,
      });
    }

    // Add https:// if URL doesn't have a protocol
    var urlWithProtocol = qrCode.destination_url.startsWith("http")
      ? qrCode.destination_url
      : `https://${qrCode.destination_url}`;
  } catch (error) {
    logError(error, {
      action: "handleQRCodeRedirect",
      errorType:
        error instanceof Error ? error.constructor.name : "UnknownError",
      trackedUrl,
    });
    redirect("/");
  }

  // Redirect to the actual destination URL
  redirect(urlWithProtocol);
}
