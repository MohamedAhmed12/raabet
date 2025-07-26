"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";

export async function updateSingleLink(
  linkId: string,
  key: string,
  val: string | boolean | number
) {
  try {
    const updatedLink = await prisma.link.update({
      where: { id: linkId },
      data: { [key]: val },
    });
    return { success: true, updatedLink };
  } catch (error: unknown) {
    logError(error, {
      action: "updateSingleLink",
      errorType: error instanceof Error ? error.constructor.name : "UnknownError",
      linkId,
      key,
      valueType: typeof val
    });
    
    return null;
  }
}
