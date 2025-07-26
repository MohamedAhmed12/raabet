"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";

type ListAnalyticsParams = {
  linkId: string;
  dateRange: number;
};

export async function listAnalytics({
  linkId,
  dateRange = 0,
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

    // Fetch blocks with analytics count and data
    const blocks = await prisma.block.findMany({
      where: {
        linkId,
        analytics: {
          some: {
            created_at: {
              gte: startDate,
            },
          },
        },
      },
      include: {
        _count: {
          select: {
            analytics: {
              where: {
                created_at: { gte: startDate },
              },
            },
          },
        },
        analytics: {
          where: {
            created_at: {
              gte: startDate,
            },
          },
          orderBy: {
            created_at: "asc",
          },
        },
      },
      orderBy: { order: "asc" },
    });

    // Fetch socials with analytics count and data
    const socials = await prisma.social.findMany({
      where: {
        linkId,
        analytics: {
          some: {
            created_at: {
              gte: startDate,
            },
          },
        },
      },
      include: {
        _count: {
          select: {
            analytics: {
              where: {
                created_at: { gte: startDate },
              },
            },
          },
        },
        analytics: {
          where: {
            created_at: {
              gte: startDate,
            },
          },
          orderBy: {
            created_at: "asc",
          },
        },
      },
      orderBy: { order: "asc" },
    });

    // Get profile views with dates
    const profileViews = await prisma.profileView.findMany({
      where: {
        linkId,
        created_at: {
          gte: startDate,
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });

    // Process all data in a single pass
    const dateStats: Record<
      string,
      {
        date: string;
        profileViews: number;
        blockClicks: number;
        socialClicks: number;
      }
    > = {};

    // Helper function to process items by date
    const processItems = (
      items: Array<{ created_at: Date }>,
      type: "profileViews" | "blockClicks" | "socialClicks"
    ) => {
      items.forEach((item) => {
        const date = new Date(item.created_at).toLocaleDateString();

        if (!dateStats[date]) {
          dateStats[date] = {
            date,
            profileViews: 0,
            blockClicks: 0,
            socialClicks: 0,
          };
        }
        dateStats[date][type]++;
      });
    };

    // Process profile views
    processItems(profileViews, "profileViews");

    // Process block analytics directly
    blocks.map((block) => {
      processItems(block.analytics, "blockClicks");
    });

    // Process social analytics directly
    socials.map((social) => {
      processItems(social.analytics, "socialClicks");
    });

    // Convert dateStats to array and sort by date (newest first)
    const dateStatsArray = Object.values(dateStats).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return { blocks, socials, profileViews, dateStats: dateStatsArray };
  } catch (error: unknown) {
    logError(error, {
      action: "listAnalytics",
      errorType: error instanceof Error ? error.constructor.name : "UnknownError",
      linkId,
      dateRange,
      timestamp: new Date().toISOString()
    });
    
    // Re-throw with a user-friendly message
    throw new Error("Failed to fetch analytics data. Please try again later.");
  }
}
