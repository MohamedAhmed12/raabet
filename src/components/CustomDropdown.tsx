"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Icon} from "./Icon";
import {useState} from "react";
import {cn} from "@/lib/utils";
import {useTranslations} from "next-intl";

interface CustomDropdownProps {
  items: string[];
  className?: string;
  onSelect: (index: number) => void;
}
export function CustomDropdown({
  items,
  className,
  onSelect,
}: CustomDropdownProps) {
  const t = useTranslations("Analytics.Metrics.dateDropdown");
  const [selected, setSelected] = useState(0);
  const handleOnSelect = (index: number) => {
    setSelected(index);
    onSelect(index);
  };

  return (
    <DropdownMenu dir="inherit">
      <DropdownMenuTrigger
        className={cn(
          "flex justify-between items-center bg-white px-2 py-1 min-w-[175px] min-h-[38px] cursor-pointer border rounded-sm",
          className
        )}
      >
        <span>{t(items[selected])}</span>
        <Icon name="chevronDown" sizeClass="sm" />
      </DropdownMenuTrigger>
      <DropdownMenuContent defaultValue={0} className="min-w-[175px]">
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className="cursor-pointer"
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
