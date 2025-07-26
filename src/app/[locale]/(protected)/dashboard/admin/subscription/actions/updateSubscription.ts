"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";

export async function updateSubscription(
  customerId: string,
  data: {
    stripeSessionId?: string;
    stripePaymentStatus?: string;
  }
) {
  try {
    // Find the user associated with this customer ID
    const user = await prisma.user.findFirst({
      where: {
        stripeCustomerId: customerId,
      },
      include: { subscriptions: true },
    });

    if (!user) {
      const err = `User not found for customer`;
      logError(`${err}: ${customerId}`, {
        action: "updateSubscription",
        errorType: "ValidationError",
      });
      throw new Error(err);
    }

    const subscriptionStatus =
      data?.stripePaymentStatus === "paid" ? "active" : "failed";

    // Use upsert to create or update the subscription
    const subscription = await prisma.subscription.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        stripeSessionId: data.stripeSessionId,
        status: subscriptionStatus,
        paymentMethod: "stripe",
        amount: 0,
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      update: {
        stripeSessionId: data.stripeSessionId,
        status: subscriptionStatus,
      },
    });

    return subscription;
  } catch (error) {
    const err = `Failed to update subscription: ${error}`;
    logError(err, {
      action: "updateSubscription",
      errorType: "ValidationError",
    });
    throw error;
  }
}
