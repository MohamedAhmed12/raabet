"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";

export async function updateFeedbackTimestamp({ linkId }: { linkId: string }) {
  try {
    await prisma.link.update({
      where: { id: linkId },
      data: { last_feedback_ts: new Date() },
    });
    return { success: true };
  } catch (error: unknown) {
    logError(error, {
      action: "updateFeedbackTimestamp",
      errorType:
        error instanceof Error ? error.constructor.name : "UnknownError",
      linkId,
      timestamp: new Date().toISOString(),
    });
    throw new Error("Failed to update feedback timestamp. Please try again later.");
  }
}
