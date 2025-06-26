"use server";

import prisma from "@/lib/prisma";

export async function incrementBlockClicks(id: string, linkId: string) {  
  try {
    await prisma.analytics.create({
      data: {
        blockId: id,
        linkId,
      },
    });
  } catch (error) {
    console.error("Failed to increment block clicks:", error);
    throw error;
  }
}
