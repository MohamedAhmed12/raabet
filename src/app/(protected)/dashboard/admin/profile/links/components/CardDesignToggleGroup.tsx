"use client";

import { iconNameType } from "@/assets/icons";
import { Icon } from "@/components/Icon";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/cn";
import { HelperTooltip } from "../../../components/HelperTooltip";

export const cardDesigns = [
  { value: "0", icon: "circle-x", className: "" },
  {
    value: "1",
    icon: "card-design-1",
    className: "rounded-lg shadow-md",
  },
  {
    value: "2",
    icon: "card-design-2",
    className:
      "relative rounded-lg shadow-md before:absolute before:content-[''] before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-20 before:h-5 before:bg-white before:rounded-full",
  },
  {
    value: "3",
    icon: "card-design-3",
    className:
      "relative rounded-lg shadow-md before:absolute before:content-[''] before:-bottom-2 before:left-0 before:w-full before:h-5 before:bg-white before:clip-path-wave",
  },
  {
    value: "4",
    icon: "card-design-4",
    className:
      "relative rounded-lg shadow-md before:absolute before:content-[''] before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-20 before:h-5 before:bg-white before:clip-path-notch",
  },
];

export const CardDesignToggleGroup = ({
  title,
  tooltipContent,
  onValueChange,
}: Readonly<{
  title: string;
  tooltipContent?: string;
  onValueChange: (value: string) => void;
}>) => (
  <div className={cn("flex flex-col border-1 border-gray-300 rounded-sm mb-4")}>
    <div className="flex items-center justify-start h-10 gap-2 px-[11px] border-b-1 border-gray-300">
      <HelperTooltip content={tooltipContent} />
      <div className="text-[13px] mr-[22px] capitalize">{title}</div>
    </div>
    <ToggleGroup
      type="single"
      onValueChange={(value) => onValueChange(value)}
      className="flex w-full h-10"
    >
      {cardDesigns.map((cardDesign, i) => (
        <ToggleGroupItem
          key={`card-${cardDesign.value}`}
          value={cardDesign.value}
          className={cn("cursor-pointer", i != 4 && "border-r-1")}
          size="lg"
        >
          <Icon name={cardDesign.icon} size={20} />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  </div>
);
