"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { useQRAnalytics } from "../hooks/useQRAnalytics";
import { QRAnalyticsChart } from "./QRAnalyticsChart";
import { CustomDropdown } from "@/components/CustomDropdown";
import { useState } from "react";

interface QRAnalyticsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qrCodeId: string;
}

const dateDropdown = ["lastWeek", "lastMonth", "lastYear", "allTime"];

export function QRAnalyticsDialog({
  open,
  onOpenChange,
  qrCodeId,
}: QRAnalyticsDialogProps) {
  const [dateRange, setDateRange] = useState(0);

  const t = useTranslations();
  const {
    data: analytics,
    isLoading,
    error,
  } = useQRAnalytics(qrCodeId, dateRange);
  console.log("analytics", analytics);

  const onSelect = (e: number) => {
    setDateRange(e);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {t("QR.analytics")}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-center py-8">
              {t("QR.analyticsError")}
            </div>
          )}

          {analytics && (
            <div className="space-y-6">
              <CustomDropdown
                initialSelected={dateRange}
                onSelect={(e) => onSelect(e)}
                items={dateDropdown}
              />

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="text-sm font-medium">{t("QR.totalScans")}</h3>
                  <p className="text-2xl font-bold">{analytics.totalScans}</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="text-sm font-medium">{t("QR.thisWeek")}</h3>
                  <p className="text-2xl font-bold ">
                    {analytics.thisWeekScans}
                  </p>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="text-sm font-medium">{t("QR.today")}</h3>
                  <p className="text-2xl font-bold">{analytics.todayScans}</p>
                </div>
              </div>

              {/* Chart */}
              <QRAnalyticsChart data={analytics.chartData} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
