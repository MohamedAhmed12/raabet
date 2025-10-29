"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";
import { Subscription } from "@prisma/client";

export async function fetchSubscription(
  email: string
): Promise<Subscription | null> {
  try {
    if (!email) {
      return null;
    }

    logError(
      `Starting fetchSubscription for email: ${email}`,
      {
        action: "fetchSubscription/start",
        email: email || "undefined",
      },
      "info"
    );

    // Optimize: Fetch user and subscription in a single query (one-to-one relation)
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        subscriptions: true, // One-to-one relation, not an array
      },
    });

    if (!user || !user.subscriptions) {
      logError(
        `No subscription found for email: ${email}`,
        {
          action: "fetchSubscription/notFound",
          email: email || "undefined",
          userId: user?.id || "undefined",
        },
        "info"
      );
      return null;
    }

    const currentSubscription = user.subscriptions;
    // Check if subscription has expired
    const isSubscriptionExpired =
      currentSubscription?.expiresAt &&
      currentSubscription.expiresAt < new Date();

    // Mark as canceled if it's an expired trial or manual payment
    if (
      isSubscriptionExpired &&
      (currentSubscription?.status === "trialing" ||
        currentSubscription?.paymentMethod === "manual")
    ) {
      try {
        // convert the returned subs status to canceled
        currentSubscription.status = "canceled";

        // update the status in database
        await prisma.subscription.update({
          where: { id: currentSubscription.id },
          data: { status: "canceled" },
        });
      } catch (updateError) {
        logError(updateError, {
          action: "fetchSubscription/updateStatus",
          email: email || "undefined",
          subscriptionId: currentSubscription.id,
          errorType: updateError instanceof Error ? updateError.constructor.name : "DatabaseError",
        });
        // Don't throw - return the subscription with updated status even if DB update fails
      }
    }

    logError(
      `Successfully fetched subscription`,
      {
        action: "fetchSubscription/success",
        email: email || "undefined",
        subscriptionId: currentSubscription.id,
        status: currentSubscription.status,
      },
      "info"
    );

    return currentSubscription;
  } catch (error) {
    logError(error, {
      action: "fetchSubscription/error",
      errorType: error instanceof Error ? error.constructor.name : "DatabaseError",
      email: email || "undefined",
      errorMessage: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw error;
  }
}
