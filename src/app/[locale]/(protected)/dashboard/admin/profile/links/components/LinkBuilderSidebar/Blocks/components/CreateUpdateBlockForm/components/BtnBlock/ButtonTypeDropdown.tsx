"use client";

import * as React from "react";

import {BlockType} from "@/app/[locale]/(protected)/dashboard/admin/profile/links/types/block";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Block} from "@prisma/client";

const linkOptions: {
  label: string;
  value: string;
  inputType: "text" | "file";
  placeholder?: string | undefined;
}[] = [
  {
    label: "link",
    value: "url",
    inputType: "text",
    placeholder: "https://example.com/",
  },
  {
    label: "email",
    value: "email",
    inputType: "text",
    placeholder: "hello@example.com",
  },
  {label: "image", value: "image", inputType: "file"},
  {label: "file", value: "file", inputType: "file"},
];

export const ButtonTypeDropdown = ({
  block,
  onChange,
}: {
  block: Block;
  onChange: (key: keyof Block, val: string) => void;
}) => {
  const [btnType, setBtnType] = React.useState(block.type);
  const selectedType = React.useMemo(
    () => linkOptions.find((opt) => opt.value === btnType) || linkOptions[0],
    [btnType]
  );

  const handleTypeSelected = (value: string) => {
    setBtnType(value as BlockType);
    onChange("type", value);
  };

  return (
    <div className="flex flex-col font-inherit gap-5">
      <div className="w-1/3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Button Type</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 font-noto-sans"
            align="start"
            alignOffset={3}
          >
            <DropdownMenuLabel>Button Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={btnType}
              onValueChange={handleTypeSelected}
            >
              {linkOptions.map((option) => (
                <DropdownMenuRadioItem
                  key={option.label}
                  value={option.value}
                  className="capitalize"
                >
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {btnType && (
        <div className="flex flex-col gap-2">
          <Label>{selectedType.label}</Label>

          <Input
            id={btnType}
            type='text'
            placeholder={selectedType.placeholder}
            value={block.url}
            className="mb-[14px]"
            onChange={(e) => onChange("url", e.currentTarget.value)}
          />
        </div>
      )}
    </div>
  );
};
