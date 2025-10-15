/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { CustomDateTable } from "@/components/CustomDateTable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { FieldController } from "../../../../components/FieldController";
import { ProfileAnalyticsChart } from "./ProfileAnalyticsChart";

export type ChartData = {
  date: string;
  profileViews: number;
  blockClicks: number;
  socialClicks: number;
};

type SummaryData = {
  profileViews: number;
  blockClicks: number;
  socialClicks: number;
  chartData?: ChartData[];
};

export default function ProfileAnalytics({
  profileViews = 0,
  blockClicks = 0,
  socialClicks = 0,
  chartData = [],
}: SummaryData) {
  const t = useTranslations();

  const columns: ColumnDef<SummaryData>[] = [
    {
      accessorKey: "profileViews",
      header: () => t("Analytics.Metrics.profile.profileViews"),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("profileViews")}</div>
      ),
    },
    {
      accessorKey: "blockClicks",
      header: () => t("Analytics.Metrics.profile.blockClicks"),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("blockClicks")}</div>
      ),
    },
    {
      accessorKey: "socialClicks",
      header: () => t("Analytics.Metrics.profile.socialClicks"),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("socialClicks")}</div>
      ),
    },
  ];

  const handleExportCSV = () => {
    // Create CSV content
    const csvHeader = "Date,Profile Views,Block Clicks,Social Clicks\n";
    
    // Generate CSV rows from chartData
    const csvRows = chartData.map(item => {
      const date = new Date(item.date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      });
      return `${date},${item.profileViews},${item.blockClicks},${item.socialClicks}`;
    }).join('\n');
    
    const csvContent = csvHeader + csvRows;
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `analytics-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <FieldController
      title={t("Analytics.Metrics.profile.title")}
      titleIcon={
        <Button 
          variant="outline" 
          className="cursor-pointer text-xs"
          onClick={handleExportCSV}
        >
          {t("Shared.export")}
        </Button>
      }
    >
      <ProfileAnalyticsChart data={chartData} />
      <CustomDateTable
        data={[
          {
            profileViews,
            blockClicks,
            socialClicks,
          },
        ]}
        columns={columns}
        showFooter={false}
      />
    </FieldController>
  );
}
