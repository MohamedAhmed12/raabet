"use server";

import prisma from "@/lib/prisma";

export async function incrementBlockClicks(id: string) {
  try {
    await prisma.block.update({
      where: { id },
      data: {
        clicks: { increment: 1 },
      },
    });
  } catch (error) {
    console.error("Failed to increment block clicks:", error);
    throw error;
  }
}
