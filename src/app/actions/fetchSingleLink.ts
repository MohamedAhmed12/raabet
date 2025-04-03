"use server";

import { prisma } from "@/lib/prisma";

export async function fetchSingleLink({
  userId,
  username,
}: {
  userId?: string | undefined;
  username?: string;
}) {
  try {
    // Fetch links associated with the user by `username`
    return await prisma.link.findFirst({
      where: {
        OR: [
          { userName: username }, // Filter by the `userName` field
          { userId }, // Filter by the `userName` foreign key
        ],
      },
      include: {
        user: true, // Optionally include user details in the response
        socials: {
          orderBy: {
            order: "asc", // Change 'order' to whatever field you want to order by (ascending or descending)
          },
        },
        blocks: true,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
