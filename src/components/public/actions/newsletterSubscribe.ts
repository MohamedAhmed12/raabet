"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";

export async function newsletterSubscribe({
  email,
  userId,
}: {
  email: string;
  userId?: string;
}) {
  try {
    // Try to find user by ID first, then fall back to admin
    let user;
    if (userId) {
      user = await prisma.user.findUnique({
        where: { id: userId },
      });
    }

    if (!user) {
      // If no user ID was provided or user not found, use admin user
      user = await prisma.user.findUnique({
        where: { email: "support@rabet-link.com" },
      });
    }

    if (!user) {
      throw new Error("User not found");
    }

    // Check if email is already subscribed
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email, userId: user.id },
    });

    if (existingSubscriber) {
      // If already subscribed, just return without error
      return { success: true, message: "Already subscribed" };
    }

    // Create new subscriber
    await prisma.newsletterSubscriber.create({
      data: {
        email,
        userId: user.id,
      },
    });

    return { success: true, message: "Successfully subscribed" };
  } catch (error) {
    logError(error, {
      action: "newsletter/subscribe",
      email,
      userId: userId || "unknown",
      errorType:
        error instanceof Error ? error.constructor.name : "UnknownError",
    });

    // Re-throw with a user-friendly message
    throw new Error(
      "Failed to process your subscription. Please try again later."
    );
  }
}
