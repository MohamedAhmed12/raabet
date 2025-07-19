"use server";

import { createTrackedQRcodeURL } from "@/lib/createTrackedQRcodeURL";
import prisma from "@/lib/prisma";
import { QRType } from "@prisma/client";

export async function createQRCode(url: string, linkId: string) {
  try {
    // Check if QR code with this URL already exists
    const existingQRCode = await prisma.qRCode.findFirst({
      where: { url },
    });

    if (existingQRCode) {
      throw new Error(
        JSON.stringify({
          message: "QR code with this URL already exists",
          type: "duplicate",
          existingQRCode,
        })
      );
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
    console.error("Failed to create QR code:", error);
    throw error;
  }
}
