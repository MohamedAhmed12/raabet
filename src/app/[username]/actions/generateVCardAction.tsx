"use server";

import { prisma } from "@/lib/prisma";
import { generateVCard } from "../helpers/generateVCard";

export async function generateVCardAction(fullname: string) {
  try {
    // Fetch links associated with the user by `username`
    const user = await prisma.user.findFirst({
      where: {
        fullname, // Filter by the `userName` foreign key
      },
      include: {
        links: true, // Optionally include user details in the response
      },
    });

    // If user is not found, throw an error
    if (!user) {
      throw new Error(`Could not find user with name: ${fullname}`);
    }

    // Generate vCard content from user data
    const vCard = generateVCard(user);

    // If vCard content could not be generated, throw an error
    if (!vCard) {
      throw new Error(`Could not generate vCard for user: ${fullname}`);
    }

    // Return the vCard file as a downloadable response
    return new Blob([vCard], { type: "text/vcard" });
  } catch (error) {
    console.error({ tag: "generate_vcard", error });
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
