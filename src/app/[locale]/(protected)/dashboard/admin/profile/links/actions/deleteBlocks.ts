"use server";

import prisma from "@/lib/prisma";
import { logError } from "@/lib/errorHandling";

export async function deleteBlock(id: string) {
  try {
    return await prisma.block.delete({
      where: { id },
    });
  } catch (error) {
    const err = `Error deleting block:${error}`;
    logError(err, {
      action: "deleteBlock",
      errorType: "ValidationError",
      id,
    });
    throw error;
  }
}
