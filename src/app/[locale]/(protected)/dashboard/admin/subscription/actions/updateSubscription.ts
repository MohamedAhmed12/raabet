"use server";

import prisma from "@/lib/prisma";

export async function updateSubscription(
  customerId: string,
  data: {
    stripeSessionId?: string;
    stripePaymentStatus?: string;
  }
) {
  try {
    console.log("stripePaymentStatus", data.stripePaymentStatus);
    // Find the user associated with this customer ID
    const user = await prisma.user.findFirst({
      where: {
        stripeCustomerId: customerId,
      },
      include: { subscriptions: true },
    });

    if (!user) {
      throw new Error("User not found for customer");
    }

    const subscriptionStatus = data?.stripePaymentStatus === "paid" ? "active" : "failed";
   
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
    console.error("Failed to update subscription:", error);
    throw error;
  }
}
