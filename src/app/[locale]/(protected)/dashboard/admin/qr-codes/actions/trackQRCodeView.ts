"use server";

import prisma from "@/lib/prisma";

export async function trackQRCodeView(url: string) {
  try {
    const qrCode = await prisma.qRCode.update({
      where: { url },
      data: { views: { increment: 1 } },
    });

    return qrCode?.url || "/";
  } catch (error) {
    console.error("Error tracking QR code view:", error);
    return "/";
  }
}
