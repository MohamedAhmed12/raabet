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
    where: { email: email },
    include: {
      subscriptions: true,
    },
  });

  if (!user?.subscriptions || user.subscriptions.length === 0) {
    return null;
  }

  const activeSubscription = user.subscriptions.find(
    (sub: Subscription) => sub.status === "active"
  );

  const currentSubscription =
    activeSubscription ||
    user?.subscriptions[user?.subscriptions?.length - 1] ||
    null;

  // convert subs to canceled it it was in trial and got expired
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
