"use client";

import { CustomDateTable } from "@/components/CustomDateTable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { FieldController } from "../../../../components/FieldController";
import { ProfileAnalyticsChart } from "./ProfileAnalyticsChart";

export type SummaryData = {
  profileViews: number;
  blockClicks: number;
  socialClicks: number;
};

export default function ProfileAnalytics({
  profileViews = 0,
  blockClicks = 0,
  socialClicks = 0,
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

  return (
    <FieldController
      title={t("Analytics.Metrics.profile.title")}
      titleIcon={
        <Button variant="outline" className="cursor-pointer">
          {t("Shared.export")}
        </Button>
      }
    >
      <ProfileAnalyticsChart />
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
