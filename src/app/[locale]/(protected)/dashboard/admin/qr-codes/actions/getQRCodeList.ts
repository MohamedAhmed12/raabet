"use server";

import prisma from "@/lib/prisma";

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
    console.error("Failed to fetch QR codes:", error);
    throw new Error(`Failed to fetch QR codes: ${error}`);
  }
};
