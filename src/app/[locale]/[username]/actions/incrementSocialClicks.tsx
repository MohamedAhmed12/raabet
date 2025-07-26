"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";

export async function incrementSocialClicks(socialId: string, linkId: string) {
  try {
    await prisma.analytics.create({
      data: {
        socialId,
        linkId,
      },
    });
  } catch (error) {
    logError(error, {
      action: "incrementSocialClicks",
      errorType: error instanceof Error ? error.constructor.name : "UnknownError",
      socialId,
      linkId
    });
    
    // Re-throw with a user-friendly message
    throw new Error("Failed to track social click. Please try again.");
  }
}
