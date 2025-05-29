"use server";

import prisma from "@/lib/prisma";

export const deleteQRCode = async (id: string) => {
  try {
    await prisma.qRCode.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to delete QR code:", error);
    return { success: false, error: "Failed to delete QR code" };
  }
};
