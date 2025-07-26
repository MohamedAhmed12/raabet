"use server";

import prisma from "@/lib/prisma";
import { Block } from "@prisma/client";
import { logError } from "@/lib/errorHandling";

export async function updateBlock(data: Block) {
  if (!data) throw new Error("No data provided");

  try {
    return await prisma.block.update({
      where: {id: data.id},
      data,
    });
  } catch (error) {
    const err = `Error while updating block:${error}`;
    logError(err, {
      action: "updateBlock",
      errorType: "ValidationError",
      id: data.id,
    });
    throw error;
  }
}
