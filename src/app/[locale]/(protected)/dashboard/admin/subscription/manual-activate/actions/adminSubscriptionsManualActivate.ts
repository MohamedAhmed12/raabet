"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";
import { addMonths } from "date-fns";

export async function adminSubscriptionsManualActivate(userId: string) {
  try {
    return await prisma.subscription.update({
      where: {
        userId,
      },
      data: {
        status: "active",
        paymentMethod: "manual",
        expiresAt: addMonths(new Date(), 1),
      },
    });
  } catch (error) {
    logError(error, {
      action: "adminSubscriptionsManualActivate",
      errorType: "ValidationError",
    });
    throw error;
  }
}
