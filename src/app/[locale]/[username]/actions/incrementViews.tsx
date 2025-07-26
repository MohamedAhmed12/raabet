"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";

export async function incrementViews(linkId: string) {
  try {
    // Create a new profile view record
    await prisma.profileView.create({
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
    logError(error, {
      action: "profile/incrementViews",
      linkId,
      errorType:
        error instanceof Error ? error.constructor.name : "UnknownError",
    });

    throw new Error("Failed to record view. Please try again.");
  }
}
