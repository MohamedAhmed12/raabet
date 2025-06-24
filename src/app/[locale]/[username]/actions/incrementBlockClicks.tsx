"use server";

import prisma from "@/lib/prisma";

export async function incrementBlockClicks(entityId: string, linkId: string) {
  try {
    await prisma.analytics.create({
      data: {
        entityType: "Block",
        entityId,
        linkId,
      },
    });
  } catch (error) {
    console.error("Failed to increment block clicks:", error);
    throw error;
  }
}
