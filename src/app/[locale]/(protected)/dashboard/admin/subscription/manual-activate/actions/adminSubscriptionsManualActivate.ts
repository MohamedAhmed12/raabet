"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";
import { Subscription } from "@prisma/client";
import { addMonths } from "date-fns";

interface SubscriptionWithCoupons extends Omit<Subscription, "coupons"> {
  coupons?: Array<{ id: string; usedAt: Date | null }>;
}

export async function adminSubscriptionsManualActivate(
  subscription: SubscriptionWithCoupons,
  hasValidCoupon: boolean
) {
  try {
    return await prisma.$transaction(async (tx) => {
      // 1. Update the subscription
      const updatedSubscription = await tx.subscription.update({
        where: { id: subscription.id },
        data: {
          status: "active",
          paymentMethod: "manual",
          expiresAt: addMonths(new Date(), 1),
        },
      });

      // 2. If there's a valid coupon, mark it as used
      if (hasValidCoupon && subscription?.coupons?.[0]?.id) {
        await tx.coupon.update({
          where: {
            id: subscription.coupons[0].id,
          },
          data: { usedAt: new Date() },
        });
      }

      return updatedSubscription;
    });
  } catch (error) {
    logError(error, {
      action: "adminSubscriptionsManualActivate",
      errorType: "ValidationError",
    });
    throw error;
  }
}
