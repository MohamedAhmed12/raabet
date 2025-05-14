"use server";

import { prisma } from "@/lib/prisma";
import { Block } from "@prisma/client";

export async function copyBlock(data: Block) {
  const {linkId, ...dataToCopy} = data;

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
