"use server";

import prisma from "@/lib/prisma";
import { logError } from "@/lib/errorHandling";

export const deleteQRCode = async (id: string) => {
  try {
    await prisma.qRCode.delete({
      where: { id },
    });
  } catch (error) {
    const err = `Failed to delete QR code:${error}`;
    logError(err, {
      action: "deleteQRCode",
      errorType: "ValidationError",
      id,
    });
    throw error;
  }
};
