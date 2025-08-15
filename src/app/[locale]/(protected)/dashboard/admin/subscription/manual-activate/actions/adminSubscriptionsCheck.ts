"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";

export async function adminSubscriptionsCheck(userId: string) {
  try {
    return await prisma.subscription.findFirst({
      where: {
        userId,
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
