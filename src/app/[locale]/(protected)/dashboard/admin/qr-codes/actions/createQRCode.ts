"use server";

import { createTrackedQRcodeURL } from "@/lib/createTrackedQRcodeURL";
import prisma from "@/lib/prisma";
import { QRType } from "@prisma/client";
import { logError } from "@/lib/errorHandling";

export async function createQRCode(url: string, linkId: string) {
  try {
    // Check if QR code with this URL already exists
    const existingQRCode = await prisma.qRCode.findFirst({
      where: { url },
    });

    if (existingQRCode) {
      const err = `QR code with this URL already exists`;
      logError(err, {
        action: "createQRCode",
        errorType: "DuplicationError",
        existingQRCode,
      });
      throw new Error(err);
    }

    const qrCode = await prisma.qRCode.create({
      data: {
        url: url,
        display_url: createTrackedQRcodeURL(url),
        linkId,
        type: QRType.url,
      },
    });

    return qrCode;
  } catch (error) {
    const err = `Failed to create QR code:${error}`;
    logError(err, {
      action: "createQRCode",
      errorType: "ValidationError",
    });
    throw error;
  }
}
