"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Icon } from "./Icon";

interface CustomDropdownProps {
  initialSelected?: number | string;
  prefix?: string;
  items: string[];
  className?: string;
  onSelect: (index: number) => void;
}
export function CustomDropdown({
  initialSelected,
  prefix,
  items,
  className,
  onSelect,
}: CustomDropdownProps) {
  const t = useTranslations("Dropdowns");
  const initialVal: number =
    typeof initialSelected === "number"
      ? initialSelected
      : Object.values(items).indexOf(initialSelected as string) ||
        (items?.[0] ? parseInt(items[0]) : 0);
  const [selected, setSelected] = useState<number>(initialVal);
  const handleOnSelect = (index: number) => {
    setSelected(index);
    onSelect(index);
  };

  return (
    // @ts-expect-error: [inerit is working though]
    <DropdownMenu dir="inherit">
      <DropdownMenuTrigger
        className={cn(
          "flex justify-between items-center bg-white px-2 py-1 min-w-[175px] min-h-[38px] cursor-pointer border rounded-sm capitalize font-normal",
          className
        )}
      >
        <div className="capitalize">
          {prefix && <span>{t(prefix)}:</span>}
          <span className="text-gray-500"> {t(items[selected])}</span>
        </div>
        <Icon name="chevronDown" sizeClass="sm" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        defaultValue={0}
        className="min-w-[175px] font-noto-sans"
      >
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className="cursor-pointer capitalize"
            onSelect={() => handleOnSelect(index)}
          >
            {t(item)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CustomDropdown;
