"use client";

import {iconNameType} from "@/assets/icons";
import {Icon} from "@/components/Icon";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {cn} from "@/lib/cn";
import {useState} from "react";
import {HelperTooltip} from "../../../components/HelperTooltip";
import {LinksPageFieldLabel} from "./LinksPageFieldLabel";

export const CardDesignToggleGroup = ({
  initialVal,
  title,
  hasTooltip = false,
  tooltipContent,
  titleBg = "",
  toggleItems,
  onValueChange,
}: Readonly<{
  initialVal?: string | undefined;
  title: string;
  hasTooltip?: boolean;
  tooltipContent?: string;
  titleBg?: string;
  toggleItems: {icon: iconNameType; value: string}[];
  onValueChange: (value: string) => void;
}>) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    initialVal || toggleItems[0].value
  );

  const handleOnChange = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <div
      className={cn("flex flex-col border-1 border-gray-300 rounded-sm mb-4")}
    >
      <div
        className="flex items-center justify-start h-10 gap-2 px-[11px] border-b-1 border-gray-300 rounded-t-sm"
        style={{
          backgroundColor: titleBg,
        }}
      >
        {hasTooltip && <HelperTooltip content={tooltipContent} />}
        <LinksPageFieldLabel>{title}</LinksPageFieldLabel>
      </div>
      <ToggleGroup
        type="single"
        value={selectedValue}
        onValueChange={handleOnChange}
        className="flex w-full h-10"
      >
        {toggleItems.map((item) => (
          <ToggleGroupItem
            key={`card-${item.value}`}
            value={item.value}
            className={cn("cursor-pointer")}
            size="lg"
          >
            <Icon name={item.icon} size={20} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
