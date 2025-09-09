"use server";

import { authOptions } from "@/lib/auth";
import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { CreateFeedbackParams } from "../hooks/useGiveFeedback";
import { generatePromoCode } from "../subscription/actions/generatePromoCode";

export async function giveFeedback({
  linkId,
  rating,
  highlight,
  feedback,
}: CreateFeedbackParams) {
  let promoCode: string | null = null;
  const session = await getServerSession(authOptions);
  // @ts-expect-error: [to access user data in session it exists in id]
  const userId = session?.user?.id?.id as string;
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
        const subscription = await prisma.subscription.findFirst({
          where: {
            userId,
          },
        });

        if (subscription) {
          promoCode = await generatePromoCode(subscription.userId);
        }
      });

      return {
        success: true,
        promoCode,
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
