"use server";

import prisma from "@/lib/prisma";
import { Subscription } from "@prisma/client";

export async function fetchSubscription(
  email: string
): Promise<Subscription | null> {
  if (!email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  // Then get the most recent subscription for this user
  const currentSubscription = await prisma.subscription.findFirst({
    where: { userId: user.id },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!currentSubscription) {
    return null;
  }
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
