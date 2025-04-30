"use server";

import {prisma} from "@/lib/prisma";

interface BlockProps {
  id: string;
  order: number;
}

export async function orderBlocks(data: BlockProps[]) {
  if (!data.length) throw new Error("No data provided");

  try {
    console.log("332322", data);

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
    console.error("Error ordering blocks:", error);
    throw error;
  }
}
