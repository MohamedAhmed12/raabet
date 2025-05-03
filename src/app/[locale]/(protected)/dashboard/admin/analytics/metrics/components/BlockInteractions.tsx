"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import * as React from "react";

import { CustomDateTable } from "@/components/CustomDateTable";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { FieldController } from "../../../components/FieldController";
import { ToggleSwitches } from "./ToggleSwitches";

const data: Interactions[] = [
  {
    type: <Icon name="facebook" sizeClass="sm" />,
    name: "name",
    clicks: 316,
    views: 316,
    created_at: "2025-03-15T16:48:16.329Z",
  },
  {
    type: <Icon name="discord" sizeClass="sm" />,
    name: "name",
    clicks: 242,
    views: 242,
    created_at: "2025-03-15T16:48:16.329Z",
  },
  {
    type: <Icon name="pinterest" sizeClass="sm" />,
    name: "name",
    clicks: 837,
    views: 837,
    created_at: "2025-03-15T16:48:16.329Z",
  },
  {
    type: <Icon name="twitter" sizeClass="sm" />,
    name: "name",
    clicks: 874,
    views: 874,
    created_at: "2025-03-15T16:48:16.329Z",
  },
  {
    type: <Icon name="instagram" sizeClass="sm" />,
    name: "name",
    clicks: 721,
    views: 721,
    created_at: "2025-03-15T16:48:16.329Z",
  },
];

export type Interactions = {
  type: React.ReactNode;
  name: string;
  clicks: number;
  views: number;
  created_at: string;
};

export const columns: ColumnDef<Interactions>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="cursor-pointer !p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
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
          Clicks
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("clicks")}</div>
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
          Views
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("views")}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="cursor-pointer !p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Added
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("created_at")}</div>
    ),
  },
];

const handleShowDeletedChange = (value: boolean) => {
  console.log(value);
};

const handleShowHiddenChange = (value: boolean) => {
  console.log(value);
};

export function BlockInteractions() {
  const parseDate = (data: Interactions[]) => {
    console.log(
      data.map((row) => {
        const date = new Date(row.created_at);
        return format(date, "MM/dd/yyyy");
      })
    );

    return data.map((row) => {
      const date = new Date(row.created_at);
      row.created_at = format(date, "MM/dd/yyyy");
      return row;
    });
  };

  return (
    <FieldController
      title="block interactions"
      titleIcon={
        <Button variant="outline" className="cursor-pointer">
          Export
        </Button>
      }
    >
      <ToggleSwitches
        onShowDeletedChange={handleShowDeletedChange}
        onShowHiddenChange={handleShowHiddenChange}
      />
      <CustomDateTable data={parseDate(data)} columns={columns} enableSearch />
    </FieldController>
  );
}
