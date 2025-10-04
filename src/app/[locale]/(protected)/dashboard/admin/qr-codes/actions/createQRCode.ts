"use server";

import { createTrackedQRcodeURL } from "@/lib/createTrackedQRcodeURL";
import prisma from "@/lib/prisma";
import { QRType } from "@prisma/client";
import { logError } from "@/lib/errorHandling";
import { getTranslations } from "next-intl/server";

export async function createQRCode(url: string, linkId: string) {
  const t = await getTranslations("QR");

  try {
    // Check if QR code with this URL already exists
    const existingQRCode = await prisma.qRCode.findFirst({
      where: { url },
    });

    if (existingQRCode) {
      const err = t("duplicateError");
      logError(err, {
        action: "createQRCode",
        errorType: "DuplicationError",
        existingQRCode,
      });
      throw new Error(err, { cause: "DuplicationError" });
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
  } catch (error: unknown) {
    // If it's a duplicate error we threw, just re-throw it
    if (error instanceof Error && error.cause === "DuplicationError") {
      throw error;
    }

    // For other errors, show the general error message
    const err = t("createError") + (error instanceof Error ? error.message : String(error));
    logError(err, {
      action: "createQRCode",
      errorType: "ValidationError",
    });
    throw new Error(err);
  }
}
