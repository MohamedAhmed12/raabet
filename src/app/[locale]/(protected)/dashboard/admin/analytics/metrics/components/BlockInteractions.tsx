"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { CustomDateTable } from "@/components/CustomDateTable";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { FieldController } from "../../../components/FieldController";
import {
  BlockInteractionData,
  exportBlockInteractionsToCSV,
} from "../utils/exportUtils";

export function BlockInteractions({
  data,
  profileViews,
}: {
  data: BlockInteractionData[];
  profileViews: number;
}) {
  const t = useTranslations();
  const columns: ColumnDef<BlockInteractionData>[] = [
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
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="cursor-pointer !p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("Analytics.Metrics.blockInteractions.name")}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "clicks",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="cursor-pointer !p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("Analytics.Metrics.blockInteractions.clicks")}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.original._count?.analytics || 0}</div>
      ),
    },
    {
      accessorKey: "views",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="cursor-pointer !p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("Shared.views")}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: () => <div className="capitalize">{profileViews}</div>,
    },
    {
      accessorKey: "added",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="cursor-pointer !p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("Analytics.Metrics.blockInteractions.added")}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("added")}</div>
      ),
    },
  ];

  const parseDate = (data: BlockInteractionData[]) => {
    return (
      data?.map((row) => ({
        ...row,
        added: format(row.created_at, "MM/dd/yyyy"),
      })) || []
    );
  };

  return (
    <FieldController
      title={t("Analytics.Metrics.blockInteractions.title")}
      titleIcon={
        <Button
          variant="outline"
          className="cursor-pointer text-xs"
          size="sm"
          onClick={() => exportBlockInteractionsToCSV(data, profileViews)}
        >
          {t("Shared.export")}
        </Button>
      }
    >
      {/* implement next release */}
      {/* <ToggleSwitches onShowHiddenChange={handleShowHiddenChange} /> */}
      <CustomDateTable data={parseDate(data)} columns={columns} enableSearch />
    </FieldController>
  );
}
