"use server";

import { logError } from "@/lib/errorHandling";
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
  } catch (error: unknown) {
    logError(error, {
      action: "listProfileViews",
      errorType: error instanceof Error ? error.constructor.name : "UnknownError",
      linkId,
      timestamp: new Date().toISOString()
    });
    
    // Re-throw with a user-friendly message
    throw new Error("Failed to fetch profile views. Please try again later.");
  }
}
