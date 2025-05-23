"use server";

import prisma from "@/lib/prisma";

export const getQRCodeList = async ({ LinkId }: { LinkId: string }) => {
  try {
    const qrcodes = await prisma.qRCode.findMany({
      where: {
        link: {
          id: LinkId,
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
