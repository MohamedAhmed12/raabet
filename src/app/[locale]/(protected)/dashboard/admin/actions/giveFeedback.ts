"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";

type CreateFeedbackParams = {
  linkId: string;
  rating: number;
  highlight: string;
  feedback: string;
};

export async function giveFeedback({
  linkId,
  rating,
  highlight,
  feedback,
}: CreateFeedbackParams) {
  try {
    if (rating && highlight && feedback) {
      // Create feedback
      await prisma.feedback.create({
        data: {
          linkId,
          rating,
          highlight,
          feedback,
        },
      });
    }
    // Update last_feedback_ts on Link
    await prisma.link.update({
      where: { id: linkId },
      data: { last_feedback_ts: new Date() },
    });
    return { success: true };
  } catch (error: unknown) {
    logError(error, {
      action: "createFeedback",
      errorType:
        error instanceof Error ? error.constructor.name : "UnknownError",
      linkId,
      rating,
      highlight,
      feedback,
      timestamp: new Date().toISOString(),
    });
    throw new Error("Failed to submit feedback. Please try again later.");
  }
}
