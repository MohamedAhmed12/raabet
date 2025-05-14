"use server";

import { prisma } from "@/lib/prisma";

export async function updateLinkUrl(id: string, url: string) {
  try {
    const updatedLink = await prisma.social.update({
      where: {id},
      data: {url},
    });
    return updatedLink;
  } catch (error) {
    console.error("Error updating link:", error);
    throw new Error("Unable to update link");
  }
}
