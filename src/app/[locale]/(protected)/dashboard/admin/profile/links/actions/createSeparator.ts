"use server";

import prisma from "@/lib/prisma";
import { logError } from "@/lib/errorHandling";

export async function createSeparator(linkId: string) {
  try {
    if (!linkId) throw new Error("Missing link ID");

    const maxOrder = await prisma.social.aggregate({
      where: { linkId },
      _max: { order: true },
    });

    const newOrder = (maxOrder._max.order ?? 0) + 1;

    const separator = await prisma.social.create({
      data: {
        linkId,
        icon: "",
        url: "",
        order: newOrder,
        label: "",
      },
    });

    return { success: true, separator };
  } catch (error: any) {
    const err = `Error creating separator:${error.message || error}`;
    logError(err, {
      action: "createSeparator",
      errorType: "ValidationError",
      linkId,
    });
    return { success: false, error: error.message || "Unknown error" };
  }
}
