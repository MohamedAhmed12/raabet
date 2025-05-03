"use client";

import {
  ColumnDef
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import * as React from "react";

import { CustomDateTable } from "@/components/CustomDateTable";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { FieldController } from "../../../components/FieldController";

const data: Payment[] = [
  {
    icon: <Icon name="facebook" sizeClass="sm" />,
    type: "success",
    url: "ken99@example.com",
    clicks: 316,
  },
  {
    icon: <Icon name="discord" sizeClass="sm" />,
    type: "success",
    url: "Abe45@example.com",
    clicks: 242,
  },
  {
    icon: <Icon name="pinterest" sizeClass="sm" />,
    type: "processing",
    url: "Monserrat44@example.com",
    clicks: 837,
  },
  {
    icon: <Icon name="twitter" sizeClass="sm" />,
    type: "success",
    url: "Silas22@example.com",
    clicks: 874,
  },
  {
    icon: <Icon name="instagram" sizeClass="sm" />,
    type: "failed",
    url: "carmella@example.com",
    clicks: 721,
  },
];

export type Payment = {
  icon: React.ReactNode;
  type: string;
  url: string;
  clicks: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "icon",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="cursor-pointer !p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Icon
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("icon")}</div>,
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
          Type
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
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
          URL
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("url")}</div>,
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
          clicks
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("clicks")}</div>
    ),
  },
];

export function SocialClicks() {
  return (
    <FieldController
      title="social links"
      titleIcon={
        <Button variant="outline" className="cursor-pointer">
          Export
        </Button>
      }
    >
      <CustomDateTable data={data} columns={columns} />
    </FieldController>
  );
}
