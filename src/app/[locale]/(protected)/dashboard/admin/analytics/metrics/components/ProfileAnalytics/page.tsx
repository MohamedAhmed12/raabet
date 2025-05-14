"use client";

import {FieldController} from "../../../../components/FieldController";
import {Button} from "@/components/ui/button";
import {CustomDateTable} from "@/components/CustomDateTable";
import {ColumnDef} from "@tanstack/react-table";
import {ProfileAnalyticsChart} from "./ProfileAnalyticsChart";
import {useTranslations} from "next-intl";

export type SummaryData = [
  {
    profile_views: number;
    block_clicks: number;
    social_clicks: number;
  }
];

const summaryData: SummaryData = [
  {profile_views: 18, block_clicks: 1, social_clicks: 0},
];

export default function ProfileAnalytics() {
  const t = useTranslations();

  const columns: ColumnDef<SummaryData>[] = [
    {
      accessorKey: "profile_views",
      header: () => t("Analytics.Metrics.profile.profileViews"),
      cell: ({row}) => (
        <div className="capitalize">{row.getValue("profile_views")}</div>
      ),
    },
    {
      accessorKey: "block_clicks",
      header: () => t("Analytics.Metrics.profile.blockClicks"),
      cell: ({row}) => (
        <div className="capitalize">{row.getValue("block_clicks")}</div>
      ),
    },
    {
      accessorKey: "social_clicks",
      header: () => t("Analytics.Metrics.profile.socialClicks"),
      cell: ({row}) => (
        <div className="capitalize">{row.getValue("social_clicks")}</div>
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
        data={summaryData}
        columns={columns}
        showFooter={false}
      />
    </FieldController>
  );
}
