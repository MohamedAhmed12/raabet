"use server";

import prisma from "@/lib/prisma";
import { Block } from "@prisma/client";

export async function copyBlock(data: Block) {
  // we have to extract id from the payload data
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
    console.error("Error copying block:", error);
    throw error;
  }
}
