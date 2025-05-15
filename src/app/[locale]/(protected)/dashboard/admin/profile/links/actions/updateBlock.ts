"use server";

import prisma from "@/lib/prisma";
import { Block } from "@/generated/prisma";

export async function updateBlock(data: Block) {
  if (!data) throw new Error("No data provided");

  try {
    return await prisma.block.update({
      where: {id: data.id},
      data,
    });
  } catch (error) {
    console.error("Error while updating block:", error);
    throw error;
  }
}
