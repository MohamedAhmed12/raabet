"use server";

import prisma from "@/lib/prisma";
import { logError } from "@/lib/errorHandling";

/**
 * Toggles block visibility
 */
export async function toggleBlockVisibility(blockId: string, hidden: boolean) {
  try {
    const updatedBlock = await prisma.block.update({
      where: { id: blockId },
      data: { hidden } as { hidden: boolean } & Record<string, any>,
    });
    return { success: true, block: updatedBlock };
  } catch (error) {
    const err = `Error toggling block visibility:${error}`;
    logError(err, {
      action: "toggleBlockVisibility",
      errorType: "ValidationError",
      blockId,
      hidden,
    });
    throw error;
  }
}

