"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { CustomDateTable } from "@/components/CustomDateTable";
import { Icon, iconNameType } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Social } from "@prisma/client";
import { useTranslations } from "next-intl";
import { FieldController } from "../../../components/FieldController";

export type Payment = Social & {
  _count: { analytics: number };
};

export function SocialClicks({ data: rawData }: { data?: Payment[] }) {
  const t = useTranslations();

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "icon",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="cursor-pointer !p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("Analytics.Metrics.socialClicks.icon")}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("icon")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="cursor-pointer !p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("Shared.type")}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "url",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="cursor-pointer !p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("Analytics.Metrics.socialClicks.url")}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("url")}</div>
      ),
    },
    {
      id: "clicks",
      accessorFn: (row) => row._count?.analytics || 0,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="cursor-pointer !p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("Analytics.Metrics.socialClicks.clicks")}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.original._count?.analytics || 0}</div>
      ),
    },
  ];

  const data = rawData?.map((row) => ({
    ...row,
    type: row.icon,
    icon: <Icon name={row.icon as iconNameType} className="!w-4.5 !h-4.5" />,
  }));

  return (
    <FieldController
      title={t("Analytics.Metrics.socialClicks.title")}
      titleIcon={
        <Button variant="outline" className="cursor-pointer !text-base">
          {t("Shared.export")}
        </Button>
      }
    >
      <CustomDateTable data={data || []} columns={columns} />
    </FieldController>
  );
}
