"use server";

import prisma from "@/lib/prisma";
import { logError } from "@/lib/errorHandling";

interface BlockProps {
  id?: string;
  order: number;
}

export async function orderBlocks(data: BlockProps[]) {
  if (!data.length) throw new Error("No data provided");

  try {
    // Prepare update operations
    const updatePromises = data.map(({id, order}) =>
      prisma.block.update({
        where: {id},
        data: {
          order,
        },
      })
    );

    // Execute updates within a transaction
    const res = await prisma.$transaction(updatePromises);

    return res;
  } catch (error) {
    const err = `Error ordering blocks:${error}`;
    logError(err, {
      action: "orderBlocks",
      errorType: "ValidationError",
    });
    throw error;
  }
}
