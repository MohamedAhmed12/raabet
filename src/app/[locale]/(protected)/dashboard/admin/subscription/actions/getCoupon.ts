"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";

export async function getCoupon(userId: string) {
  try {
    return await prisma.coupon.findFirst({
      where: {
        subscription: { userId },
        expiresAt: { gte: new Date() },
        usedAt: null,
      },
    });
  } catch (error) {
    logError(error, {
      action: "getCoupon",
      errorType: "ValidationError",
    });
    throw error;
  }
}
