"use server";

import prisma from "@/lib/prisma";
import { Block } from "@prisma/client";

export async function createBlock(data: Block) {
  if (!data) throw new Error("No data provided");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { linkId, id, ...payload } = data;

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
