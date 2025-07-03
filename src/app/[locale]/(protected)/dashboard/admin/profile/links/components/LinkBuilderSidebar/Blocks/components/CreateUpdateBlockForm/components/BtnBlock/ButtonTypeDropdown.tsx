"use client";

import * as React from "react";

import { HelperTooltip } from "@/app/[locale]/(protected)/dashboard/admin/components/HelperTooltip";
import { BlockType } from "@/app/[locale]/(protected)/dashboard/admin/profile/links/types/block";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Block } from "@prisma/client";
import { File, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { GCSFileLoader } from "../../../../../GCSFileLoader";

export const ButtonTypeDropdown = ({
  block,
  urlError,
  onChange,
}: {
  block: Block;
  urlError: string | undefined;
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
      { label: t("btnType.image"), value: "image", inputType: "file" },
      { label: t("btnType.file"), value: "file", inputType: "file" },
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

  const handleFileUploader = async (
    e: React.ChangeEvent<HTMLInputElement>,
    linkId: string
  ) => {
    const file = e.currentTarget.files?.[0];

    if (file) {
      try {
        const publicUrl = await GCSFileLoader(linkId, file);
        if (block.type === "image") {
          onChange("bg_image", publicUrl);
        }

        onChange("url", publicUrl);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  const errorMessages = {
    url: t("errors.validUrlRequired"),
    email: t("errors.validEmailRequired"),
    file: t("errors.validFileRequired"),
    image: t("errors.validThumbnailRequired"),
  } as const;

  const errorMessage =
    block.type in errorMessages
      ? errorMessages[block.type as keyof typeof errorMessages]
      : undefined;
  console.log("urlError", urlError, errorMessage);

  return (
    <div className="flex flex-col font-inherit gap-5">
      <div className="w-1/3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="!text-base font-semibold">
              {t("btnType.btnTypes")}
            </Button>
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

      {btnType &&
        (selectedType.inputType === "text" ? (
          <div className="flex flex-col gap-2 mb-[14px]">
            <Label>{selectedType.label}</Label>
            <Input
              id={btnType}
              type="text"
              placeholder={selectedType.placeholder}
              value={block.url}
              onChange={(e) => onChange("url", e.currentTarget.value)}
            />
            {urlError && errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div>
              <label
                htmlFor="bg_upload"
                className="file-upload-label text-sm flex items-center justify-between gap-2 mb-2 px-4 p-3 relative border rounded-lg bg-white shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <HelperTooltip content={"max file size is 60MB"} />

                  {block.type === "image" && block.bg_image ? (
                    <span className="truncate max-w-[180px]">
                      {block.bg_image.split("/").pop()}
                    </span>
                  ) : block.type === "file" && block.url ? (
                    <span className="truncate max-w-[180px]">
                      {block.url.split("/").pop()}
                    </span>
                  ) : (
                    t("uploadedFile")
                  )}
                </div>

                {/* show upload icon if no file is uploaded */}
                {((!block.url && block.type === "file") ||
                  (!block.bg_image && block.type === "image")) && (
                  <div className="border rounded-4xl p-2">
                    <Upload className="size-5" />
                  </div>
                )}

                {/* show image if file is uploaded */}
                {block.bg_image && block.type === "image" && (
                  <Image
                    src={block.bg_image}
                    width={60}
                    height={60}
                    alt="preview"
                  />
                )}

                {block.url && block.type === "file" && (
                  <div className="border rounded-4xl p-2">
                    <File className="size-5" />
                  </div>
                )}
              </label>
              {urlError && errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
            </div>
            <Input
              id="bg_upload"
              type="file"
              className="mb-[14px] hidden"
              onChange={(e) => handleFileUploader(e, block.id)}
            />
          </div>
        ))}
    </div>
  );
};
