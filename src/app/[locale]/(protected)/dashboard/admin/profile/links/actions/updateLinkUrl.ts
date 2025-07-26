"use server";

import prisma from "@/lib/prisma";
import { logError } from "@/lib/errorHandling";

export async function updateLinkUrl(id: string, url: string) {
  try {
    const updatedLink = await prisma.social.update({  
      where: {id},
      data: {url},
    });
    return updatedLink;
  } catch (error) {
    const err = `Error updating link:${error}`;
    logError(err, {
      action: "updateLinkUrl",
      errorType: "ValidationError",
      id,
    });
    throw error;
  }
}
