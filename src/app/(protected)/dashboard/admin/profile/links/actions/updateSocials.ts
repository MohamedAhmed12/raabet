"use server";

import {LinkSocial} from "@/app/store/use-link-store";
import {prisma} from "@/lib/prisma";

export async function updateSocials(data: LinkSocial[]) {
  if (!data.length) return {success: false, error: "No data provided"};

  try {
    // Prepare update operations
    const updatePromises = data.map((item) =>
      prisma.social.update({
        where: {id: item.id},
        data: {...item},
      })
    );

    // Execute updates within a transaction
    const res = await prisma.$transaction(updatePromises);

    return res;
  } catch (error) {
    console.error("Error updating socials:", error);
    throw error;
  }
}
