"use server";

import prisma from "@/lib/prisma";

export const deleteQRCode = async (id: string) => {
  try {
    await prisma.qRCode.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to delete QR code:", error);
    throw error;
  }
};
