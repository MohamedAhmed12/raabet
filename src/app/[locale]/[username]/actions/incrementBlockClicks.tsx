"use server";

import { logError } from "@/lib/errorHandling";
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
    logError(error, {
      action: "incrementBlockClicks",
      errorType: error instanceof Error ? error.constructor.name : "UnknownError",
      blockId: id,
      linkId
    });
    
    // Re-throw with a user-friendly message
    throw new Error("Failed to track block click. Please try again.");
  }
}
