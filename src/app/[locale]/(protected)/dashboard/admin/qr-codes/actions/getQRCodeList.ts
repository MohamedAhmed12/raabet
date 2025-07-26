"use server";

import prisma from "@/lib/prisma";
import { logError } from "@/lib/errorHandling";

export const getQRCodeList = async ({ linkId }: { linkId: string }) => {
  try {
    const qrcodes = await prisma.qRCode.findMany({
      where: {
        link: {
          id: linkId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return qrcodes;
  } catch (error) {
    const err = `Failed to fetch QR codes: ${error}`;
    logError(err, {
      action: "getQRCodeList",
      errorType: "ValidationError",
      linkId,
    });
    throw new Error(err);
  }
};
