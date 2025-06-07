"use server";

import prisma from "@/lib/prisma";
import { QRType } from "@prisma/client";

export async function createQRCode(url: string, linkId: string) {
  if (!url) {
    throw new Error("URL is required");
  }

  if (!linkId) {
    throw new Error("Link ID is required");
  }

  try {
    const qrCode = await prisma.qRCode.create({
      data: {
        url,
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
