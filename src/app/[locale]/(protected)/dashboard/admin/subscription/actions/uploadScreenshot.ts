"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CustomServerSession } from "@/app/[locale]/types/custom-session";
import { logError } from "@/lib/errorHandling";

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
      updatedAt: new Date(),
    },
  });

  return subscription;
}
