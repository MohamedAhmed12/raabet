"use server";

import prisma from "@/lib/prisma";
import { Block } from "@/generated/prisma";

export async function createBlock(data: Block) {
  if (!data) throw new Error("No data provided");

  const { linkId, ...payload } = data;

  try {
    return await prisma.block.create({
      data: {
        ...payload,
        link: {
          connect: {
            id: linkId,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error creating new block:", error);
    throw error;
  }
}
