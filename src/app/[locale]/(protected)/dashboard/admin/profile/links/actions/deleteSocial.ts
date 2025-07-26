"use server";

import prisma from "@/lib/prisma";
import { logError } from "@/lib/errorHandling";

export async function deleteSocial(id: string, linkId: string) {
  try {
    if (!id) throw new Error('Missing ID');

    await prisma.social.delete({
      where: { id },
    });

    // Fetch updated socials
    const updatedSocials = await prisma.social.findMany({
      where: { linkId },
      orderBy: { order: 'asc' },
    });

    return { success: true, socials: updatedSocials };
  } catch (error: any) {
    const err = `Error deleting social:${error.message || error}`;
    logError(err, {
      action: "deleteSocial",
      errorType: "ValidationError",
      id,
    });
    return { success: false, error: error.message || 'Unknown error' };
  }
}