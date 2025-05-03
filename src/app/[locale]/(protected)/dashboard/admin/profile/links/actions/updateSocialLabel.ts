"use server";

import { prisma } from "@/lib/prisma";

export async function updateSocialLabel(id: string, label: string) {
  try {
    const updatedSocial = await prisma.social.update({
      where: {id},
      data: {label},
    });

    return {success: true, updatedSocial};
  } catch (error) {
    console.error("Error updating social label:", error);
    return {success: false, error: error.message || "Unknown error"};
  }
}
