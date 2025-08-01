"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";

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
          { userName: username }, // Filter by the `userName` field for [username] unauth page (visitor)
          { userId }, // Filter by the `userName` foreign key for all of dashboard/auth page
        ],
      },
      include: {
        user: true, // Optionally include user details in the response
        socials: {
          orderBy: {
            order: "asc", // Change 'order' to whatever field you want to order by (ascending or descending)
          },
        },
        blocks: {
          orderBy: {
            order: "asc",
          },
        },
        qrcodes: {
          where: { type: 'profile' },
          take: 1,
          select: {
            url: true
          }
        }
      },
    });
  } catch (error) {
    logError(error, {
      action: "fetchSingleLink",
      errorType: error instanceof Error ? error.constructor.name : "DatabaseError",
      userId: userId || "undefined",
      username: username || "undefined",
    });
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
