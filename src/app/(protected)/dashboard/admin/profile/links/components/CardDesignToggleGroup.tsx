"use client";

import { iconNameType } from "@/assets/icons";
import { Icon } from "@/components/Icon";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/cn";
import { HelperTooltip } from "../../../components/HelperTooltip";

const cardDesigns: { value: string; icon: iconNameType }[] = [
  {
    value: "0",
    icon: "circle-x",
  },
  {
    value: "1",
    icon: "card-design-1",
  },
  {
    value: "2",
    icon: "card-design-2",
  },
  {
    value: "3",
    icon: "card-design-3",
  },
  {
    value: "4",
    icon: "card-design-4",
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
