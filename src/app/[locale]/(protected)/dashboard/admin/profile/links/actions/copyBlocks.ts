"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";
import { Block } from "@prisma/client";

export async function copyBlock(data: Block) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { linkId, id, ...dataToCopy } = data;

  if (!data) throw new Error("No data provided");

  try {
    // Create a new record with the cloned data
    return await prisma.block.create({
      data: {
        ...dataToCopy,
        link: {
          connect: {
            id: linkId,
          },
        },
      },
    });
  } catch (error) {
    const err = `Error copying block:${error}`;
    logError(err, {
      action: "copyBlock",
      errorType: "ValidationError",
    });
    throw error;
  }
}
