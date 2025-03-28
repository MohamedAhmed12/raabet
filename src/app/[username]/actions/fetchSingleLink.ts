"use server";

import { prisma } from "@/lib/prisma";

export async function fetchSingleLink(username: string) {
  try {
    // Fetch links associated with the user by `username`
    return await prisma.link.findFirst({
      where: {
        userName: username, // Filter by the `userName` foreign key
      },
      include: {
        user: true, // Optionally include user details in the response
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
