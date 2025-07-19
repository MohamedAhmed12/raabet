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
    include: {
      subscriptions: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1, // Only get the most recent one (last subscription)
      },
    },
  });

  if (!user?.subscriptions?.[0]) {
    return null;
  }

  const [currentSubscription] = user.subscriptions;

  // Convert to canceled if it was in trial and got expired
  if (
    currentSubscription?.status === "trialing" &&
    currentSubscription?.expiresAt &&
    currentSubscription.expiresAt < new Date()
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
