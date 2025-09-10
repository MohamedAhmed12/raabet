"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";

export async function adminSubscriptionsCheck(userId: string) {
  try {
    return await prisma.subscription.findFirst({
      where: { userId },
      include: {
        coupons: {
          where: {
            expiresAt: { gte: new Date() },
            usedAt: null,
          },
          take: 1,
        },
      },
    });
  } catch (error) {
    logError(error, {
      action: "adminSubscriptionsCheck",
      errorType: "ValidationError",
    });
    throw error;
  }
}
