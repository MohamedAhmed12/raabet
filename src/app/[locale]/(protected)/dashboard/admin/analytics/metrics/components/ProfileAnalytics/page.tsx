import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FieldController } from "../../../../components/FieldController";
import { Button } from "@/components/ui/button";
import { CustomDateTable } from "@/components/CustomDateTable";
import { ColumnDef } from "@tanstack/react-table";
import { ProfileAnalyticsChart } from "./ProfileAnalyticsChart";

export type SummaryData = [
  {
    profile_views: number;
    block_clicks: number;
    social_clicks: number;
  }
];

const chartData = [
  { date: "03/01/2025", profileViews: 1, blockClicks: 0, socialClicks: 0 },
  { date: "03/02/2025", profileViews: 2, blockClicks: 1, socialClicks: 0 },
  { date: "03/03/2025", profileViews: 3, blockClicks: 0, socialClicks: 1 },
  { date: "03/04/2025", profileViews: 4, blockClicks: 1, socialClicks: 2 },
];
const summaryData: SummaryData = [
  { profile_views: 18, block_clicks: 1, social_clicks: 0 },
];

export const columns: ColumnDef<SummaryData>[] = [
  {
    accessorKey: "profile_views",
    header: () => "profile_views",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("profile_views")}</div>
    ),
  },
  {
    accessorKey: "block_clicks",
    header: () => "block_clicks",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("block_clicks")}</div>
    ),
  },
  {
    accessorKey: "social_clicks",
    header: () => "social_clicks",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("social_clicks")}</div>
    ),
  },
];

const calculateTotal = (chartData, key) =>
  chartData.reduce((total, item) => total + item[key], 0);

export const ProfileAnalytics = () => {
  const profileViewsTotal = calculateTotal(chartData, "profileViews");
  const blockClicksTotal = calculateTotal(chartData, "blockClicks");
  const socialClicksTotal = calculateTotal(chartData, "socialClicks");

  return (
    <FieldController
      title="social links"
      titleIcon={
        <Button variant="outline" className="cursor-pointer">
          Export
        </Button>
      }
    >
      <ProfileAnalyticsChart />
      <CustomDateTable data={summaryData} columns={columns} showFooter={false}/>
    </FieldController>
  );
};
