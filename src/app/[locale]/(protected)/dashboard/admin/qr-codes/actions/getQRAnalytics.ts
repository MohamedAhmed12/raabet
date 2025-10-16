"use server";

import prisma from "@/lib/prisma";
import { logError } from "@/lib/errorHandling";
import { QRScan } from "@prisma/client";

interface QRAnalyticsData {
  totalScans: number;
  thisWeekScans: number;
  todayScans: number;
  chartData: Array<{
    date: string;
    qrCodeScans: number;
  }>;
}

export async function getQRAnalytics(
  qrCodeId: string,
  dateRange: number = 0
): Promise<QRAnalyticsData> {
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

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    // Get total scans
    const totalScans = await prisma.qRScan.count({
      where: { qrCodeId },
    });

    // Get this week's scans
    const thisWeekScans = await prisma.qRScan.count({
      where: {
        qrCodeId,
        created_at: {
          gte: startOfWeek,
        },
      },
    });

    // Get today's scans
    const todayScans = await prisma.qRScan.count({
      where: {
        qrCodeId,
        created_at: {
          gte: startOfToday,
        },
      },
    });

    const qrScanData = await prisma.qRScan.groupBy({
      by: ["created_at"],
      _count: {
        created_at: true,
      },
    });

    const chartData = qrScanData.map((item:QRScan) => ({
      date: new Date(item.created_at).toLocaleDateString(),
      qrCodeScans: item._count.created_at,
    }));

    return {
      totalScans,
      thisWeekScans,
      todayScans,
      chartData,
    };
  } catch (error) {
    logError(error, {
      action: "getQRAnalytics",
      errorType:
        error instanceof Error ? error.constructor.name : "UnknownError",
      qrCodeId,
    });

    throw new Error("Failed to fetch QR analytics");
  }
}
