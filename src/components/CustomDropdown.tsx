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
  prefix?: string;
  items: string[];
  className?: string;
  onSelect: (index: number) => void;
}
export function CustomDropdown({
  prefix,
  items,
  className,
  onSelect,
}: CustomDropdownProps) {
  const t = useTranslations("Dropdowns");
  const [selected, setSelected] = useState(0);
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
