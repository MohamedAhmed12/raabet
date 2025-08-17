"use server";

import { CustomServerSession } from "@/app/[locale]/types/custom-session";
import { authOptions } from "@/lib/auth";
import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function uploadScreenshot(invoiceURL: string) {
  const session: CustomServerSession | null = await getServerSession(
    authOptions
  );

  if (!session?.user?.email) {
    const err = `Not authenticated`;
    logError(err, {
      action: "uploadScreenshot",
      errorType: "ValidationError",
      email: session?.user?.email,
    });
    throw new Error(err);
  }

  const userId = session.user.id.id;

  const subscription = await prisma.subscription.update({
    where: { userId: userId },
    data: {
      paymentScreenshot: invoiceURL,
      status: "pending",
      paymentMethod: "manual",
      updatedAt: new Date(),
    },
  });

  return subscription;
}
