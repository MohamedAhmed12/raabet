"use server";

import { prisma } from "@/lib/prisma";

export async function deleteBlock(id: string) {
  try {
    return await prisma.block.delete({
      where: {id},
    });
  } catch (error) {
    console.error("Error deleting block:", error);
    throw error;
  }
}
