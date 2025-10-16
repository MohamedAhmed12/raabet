"use server";

import prisma from "@/lib/prisma";
import { logError } from "@/lib/errorHandling";

export async function trackQRAnalytics(qrCodeId: string) {
  try {
    // Create QR scan record in dedicated table
    await prisma.qRScan.create({
      data: {
        qrCodeId,
      },
    });

    return { success: true };
  } catch (error) {
    logError(error, {
      action: "trackQRAnalytics",
      errorType:
        error instanceof Error ? error.constructor.name : "UnknownError",
      qrCodeId,
    });

    throw new Error("Failed to track QR code analytics");
  }
}
