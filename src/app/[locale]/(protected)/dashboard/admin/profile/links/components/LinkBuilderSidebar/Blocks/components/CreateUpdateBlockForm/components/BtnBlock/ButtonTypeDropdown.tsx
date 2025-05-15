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
import {Block} from "@/generated/prisma";
import {useTranslations} from "next-intl";

export const ButtonTypeDropdown = ({
  block,
  onChange,
}: {
  block: Block;
  onChange: (key: keyof Block, val: string) => void;
}) => {
  const [btnType, setBtnType] = React.useState(block.type);

  const t = useTranslations("LinksPage.generalStyles.blockForm");

  const linkOptions: {
    label: string;
    value: string;
    inputType: "text" | "file";
    placeholder?: string | undefined;
  }[] = React.useMemo(
    () => [
      {
        label: t("btnType.link"),
        value: "url",
        inputType: "text",
        placeholder: "https://example.com/",
      },
      {
        label: t("btnType.email"),
        value: "email",
        inputType: "text",
        placeholder: "hello@example.com",
      },
      {label: t("btnType.image"), value: "image", inputType: "file"},
      {label: t("btnType.file"), value: "file", inputType: "file"},
    ],
    [t]
  );
  const selectedType = React.useMemo(
    () => linkOptions.find((opt) => opt.value === btnType) || linkOptions[0],
    [btnType, linkOptions]
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
            <Button variant="outline">{t("btnType.btnTypes")}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 font-noto-sans"
            align="start"
            alignOffset={3}
          >
            <DropdownMenuLabel>{t("btnType.btnTypes")}</DropdownMenuLabel>
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
            type="text"
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
