"use server";

import prisma from "@/lib/prisma";

export async function incrementSocialClicks(entityId: string, linkId: string) {
  try {
    await prisma.analytics.create({
      data: {
        entityType: "Social",
        entityId,
        linkId,
      },
    });
  } catch (error) {
    console.error("Failed to increment social clicks:", error);
    throw error;
  }
}
