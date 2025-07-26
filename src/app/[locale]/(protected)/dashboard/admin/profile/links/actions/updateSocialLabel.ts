"use server";

import prisma from "@/lib/prisma";
import { logError } from "@/lib/errorHandling";

export async function updateSocialLabel(id: string, label: string) {
  try {
    const updatedSocial = await prisma.social.update({
      where: { id },
      data: { label },
    });

    return { success: true, updatedSocial };
  } catch (error: any) {
    logError(`Error updating social label:${error}`, {
      action: "updateSocialLabel",
      errorType: "ValidationError",
      id,
    });
    return {
      success: false,
      error: (error?.message as string) || "Unknown error",
    };
  }
}
