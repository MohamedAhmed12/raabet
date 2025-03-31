"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "./Icon";
import { useState } from "react";

interface CustomDropdownProps {
  items: string[];
  onSelect: (index: number) => void;
}
export function CustomDropdown({ items, onSelect }: CustomDropdownProps) {
  const [selected, setSelected] = useState(0);
  const handleOnSelect = (index: number) => {
    setSelected(index);
    onSelect(index);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-between items-center bg-white px-2 py-1 min-w-[175px] min-h-[38px] cursor-pointer border rounded-sm">
        <span>{items[selected]}</span>
        <Icon name="chevronDown" sizeClass="sm" />
      </DropdownMenuTrigger>
      <DropdownMenuContent defaultValue={0} className="min-w-[175px]">
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className="cursor-pointer"
            onSelect={() => handleOnSelect(index)}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CustomDropdown;
