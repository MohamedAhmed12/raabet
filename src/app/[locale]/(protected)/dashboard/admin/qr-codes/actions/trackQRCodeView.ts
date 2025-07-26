"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";

export async function trackQRCodeView(url: string) {
  try {
    const qrCode = await prisma.qRCode.update({
      where: { url },
      data: { views: { increment: 1 } },
    });

    return qrCode?.url || "/";
  } catch (error: unknown) {
    logError(error, {
      action: "trackQRCodeView",
      errorType: error instanceof Error ? error.constructor.name : "UnknownError",
      url,
      timestamp: new Date().toISOString()
    });
    
    // Return default URL on error
    return "/";
  }
}
