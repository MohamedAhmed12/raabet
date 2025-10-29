"use server";

import prisma from "@/lib/prisma";
import { Subscription } from "@prisma/client";

export async function fetchSubscription(
  email: string
): Promise<Subscription | null> {
  if (!email) {
    return null;
  }

  // Optimize: Fetch user and subscription in a single query (one-to-one relation)
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      subscriptions: true, // One-to-one relation, not an array
    },
  });

  if (!user || !user.subscriptions) {
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
    // convert the returned subs status to canceled
    currentSubscription.status = "canceled";

    // update the status in database
    await prisma.subscription.update({
      where: { id: currentSubscription.id },
      data: { status: "canceled" },
    });
  }

  return currentSubscription;
}
