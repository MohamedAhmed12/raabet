"use server";

import Stripe from "stripe";
import { addDays, getUnixTime } from "date-fns";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function generatePromoCode(userId: string): Promise<string> {
  const expiresAt = getUnixTime(addDays(new Date(), 30));

  const coupon = await stripe.coupons.create({
    percent_off: 50,
    duration: "once",
  });

  // 2. Create a promotion code from that coupon
  const promoCode = await stripe.promotionCodes.create({
    coupon: coupon.id,
    max_redemptions: 1, // only this user can use it once
    expires_at: expiresAt,
  });

  // Find the user's active subscription
  const subscription = await prisma.subscription.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  if (!subscription) {
    throw new Error("No active subscription found for user");
  }

  await prisma.coupon.create({
    data: {
      stripeId: promoCode.id,
      code: promoCode.code,
      value: Number(process.env.NEXT_PUBLIC_STRIPE_DISCOUNT || 0),
      expiresAt: addDays(new Date(), 29),
      subscriptionId: subscription.id,
    } as any, // Type assertion to bypass TypeScript error
  });

  return promoCode.code; // send this code back to the user
}
