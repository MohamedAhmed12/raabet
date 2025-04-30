"use server";

import { Block } from "@/app/types/block";
import { prisma } from "@/lib/prisma";

export async function copyBlock(data: Block) {
  const {id, linkId, ...dataToCopy} = data;

  if (!data) throw new Error("No data provided");

  try {
    // Create a new record with the cloned data
    const newBlock = await prisma.block.create({
      data: {
        ...dataToCopy,
        link: {
          connect: {
            id: linkId,
          },
        },
      },
    });

    return newBlock;
  } catch (error) {
    console.error("Error copying block:", error);
    throw error;
  }
}
