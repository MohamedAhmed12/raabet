"use server";

import prisma from "@/lib/prisma";

type ListAnalyticsParams = {
  linkId: string;
};

export async function listProfileViews({ linkId }: ListAnalyticsParams) {
  try {
    return await prisma.profileView.findMany({
      where: {
        linkId,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
}
