"use server";

import prisma from "@/lib/prisma";

export async function incrementSocialClicks(id: string) {
  try {
    await prisma.social.update({
      where: { id },
      data: {
        clicks: { increment: 1 },
      },
    });
  } catch (error) {
    console.error("Failed to increment social clicks:", error);
    throw error;
  }
}
