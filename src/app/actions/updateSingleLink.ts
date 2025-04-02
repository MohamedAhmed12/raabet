"use server";

import { prisma } from "@/lib/prisma";

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
    console.log();
    
    return { success: true, updatedLink };
  } catch (error) {
    console.error(error);
    return null;
  } 
}
