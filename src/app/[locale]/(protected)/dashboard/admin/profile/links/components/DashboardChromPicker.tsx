"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/cn";
import dynamic from "next/dynamic";
import { LinksPageFieldLabel } from "./LinksPageFieldLabel";

// Dynamically import ChromePicker with ssr: false to disable SSR
const ChromePicker = dynamic(
  () => import("react-color").then((mod) => mod.ChromePicker),
  {
    ssr: false,
  }
);

export const DashboardChromPicker = ({
  label,
  currentColor = "#000000",
  onColorChange,
}: Readonly<{
  label?: string;
  currentColor?: string | undefined;
  onColorChange?: ({ hex }: { hex: string }) => void;
}>) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="dashboard-general-style-controller cursor-pointer">
          <span className="flex gap-2 justify-center items-center">
            <LinksPageFieldLabel>{label}</LinksPageFieldLabel>
          </span>
          <div
            className={cn("rounded-full w-5 h-5")}
            style={{
              backgroundColor: currentColor,
              border: "1px solid oklch(.85 .006 264.531)",
            }}
          ></div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full" hasPadding={false}>
        <ChromePicker
          color={currentColor} // Ensure this color is passed correctly to the picker
          onChange={onColorChange} // Trigger onChange to update state
          disableAlpha={true}
        />
      </PopoverContent>
    </Popover>
  );
};
