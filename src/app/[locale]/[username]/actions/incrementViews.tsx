"use server";

import prisma from "@/lib/prisma";

export async function incrementViews(linkId: string) {
  try {
    // Create a new profile view record
    await prisma.ProfileView.create({
      data: {
        linkId,
      },
    });

    // Still update block views as before
    await prisma.block.updateMany({
      where: { linkId },
      data: { views: { increment: 1 } },
    });
  } catch (error) {
    console.error("Failed to record profile view:", error);
    throw error;
  }
}
