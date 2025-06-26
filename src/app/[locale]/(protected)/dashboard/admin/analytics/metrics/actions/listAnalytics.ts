"use server";

import prisma from "@/lib/prisma";

type ListAnalyticsParams = {
  linkId: string;
  dateRange: number;
  profile_views: number;
};

export async function listAnalytics({
  linkId,
  dateRange = 0,
  profile_views = 0,
}: ListAnalyticsParams) {
  try {
    // Calculate date range
    const now = new Date();
    let startDate = new Date();

    switch (dateRange) {
      case 0:
        startDate.setDate(now.getDate() - 7);
        break;
      case 1:
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 2:
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case 3:
      default:
        startDate = new Date(0); // Unix epoch start
    }

    // Fetch blocks with analytics count
    const blocks = await prisma.block.findMany({
      where: {
        linkId,
        analytics: {
          some: {
            created_at: {
              gt: startDate,
            },
          },
        },
      },
      include: {
        _count: {
          select: {
            analytics: true,
          },
        },
      },
      orderBy: { order: "asc" },
    });

    // Fetch socials with analytics count
    const socials = await prisma.social.findMany({
      where: {
        linkId,
        analytics: {
          some: {
            created_at: {
              gt: startDate,
            },
          },
        },
      },
      include: {
        _count: {
          select: {
            analytics: true,
          },
        },
      },
      orderBy: { order: "asc" },
    });

    return { blocks, socials, profile_views };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
}
