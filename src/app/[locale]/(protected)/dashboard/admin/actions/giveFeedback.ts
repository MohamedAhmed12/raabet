"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";
import { CreateFeedbackParams } from "../hooks/useGiveFeedback";
import { generatePromoCode } from "../subscription/actions/generatePromoCode";

export async function giveFeedback({
  userStripeCustomerId,
  linkId,
  rating,
  highlight,
  feedback,
}: CreateFeedbackParams) {
  let promoCode: string | null = null;

  try {
    if (rating && highlight && feedback) {
      // Use a transaction to ensure all operations complete successfully
      await prisma.$transaction(async (prisma) => {
        // Create feedback
        await prisma.feedback.create({
          data: {
            linkId,
            rating,
            highlight,
            feedback,
          },
        });

        // Get the user's subscription
        const subscription = await prisma.subscription.findFirst();
        if (subscription) {
          promoCode = await generatePromoCode(subscription.userId);
        }
      });

      return {
        success: true,
        promoCode: userStripeCustomerId ? promoCode : null,
      };
    } else {
      throw new Error("rating and highlight and feedback are required");
    }
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
