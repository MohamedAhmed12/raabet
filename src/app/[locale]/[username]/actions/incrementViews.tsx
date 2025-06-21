"use server";

import prisma from "@/lib/prisma";

export async function incrementViews(id: string) {
  try {
    await prisma.link.update({
      where: { id },
      data: {
        profile_views: { increment: 1 },
        blocks: {
          updateMany: {
            where: { linkId: id },
            data: { views: { increment: 1 } },
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to increment views:", error);
    throw error;
  }
}
