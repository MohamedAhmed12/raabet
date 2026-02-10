"use client";

import { iconNameType } from "@/assets/icons";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { BlockType } from "../../../../types/block";

export const BlocksDialog = ({
  onCreateNewBlock,
}: {
  onCreateNewBlock: (type: BlockType) => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const t = useTranslations("LinksPage.generalStyles");
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);

  const blocksStaticData: {
    icon: iconNameType;
    type: BlockType;
    title: string;
    description: string;
  }[] = [
    {
      icon: "link",
      type: "url",
      title: t("urlButton"),
      description: t("urlDescription"),
    },
    {
      icon: "mail",
      type: "email",
      title: t("emailButton"),
      description: t("emailDescription"),
    },
    {
      icon: "file",
      type: "file",
      title: t("fileButton"),
      description: t("fileDescription"),
    },
    {
      icon: "image",
      type: "image",
      title: t("imageButton"),
      description: t("imageDescription"),
    },
    {
      icon: "minus",
      type: "separator",
      title: t("divider"),
      description: t("dividerDescription"),
    },
    {
      icon: "type",
      type: "text",
      title: t("text"),
      description: t("textDescription"),
    },
    {
      icon: "audio-lines",
      type: "audio",
      title: t("audio"),
      description: t("audioDescription"),
    },
    {
      icon: "monitor-play",
      type: "video",
      title: t("video"),
      description: t("videoDescription"),
    },
    {
      icon: "map-pin",
      type: "map",
      title: t("map"),
      description: t("mapDescription"),
    },
  ];

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Button
        variant="outline"
        className="flex gap-1.5 cursor-pointer h-[27px] px-2 capitalize !text-sm"
        onClick={() => setIsDialogOpen(true)}
      >
        <span>{t("addBlocks")}</span>
        <span className="!text-base">+</span>
      </Button>
      <DialogContent className={cn("w-[90%] lg:w-full !max-w-[600px]", fontClass)}>
        <DialogHeader className="flex items-center">
          <DialogTitle className="capitalize mb-3">
            {t("addBlocks")}
          </DialogTitle>
        </DialogHeader>

        {/* body */}
        <div className="dialog-body flex justify-center items-center flex-wrap gap-4">
          {blocksStaticData.map((btn) => (
            <Button
              key={btn.type}
              variant="outline"
              className="flex flex-col w-[45%] lg:!w-[31.2%] h-auto cursor-pointer"
              onClick={() => {
                onCreateNewBlock(btn.type);
                closeDialog();
              }}
            >
              <Icon name={btn.icon} className="!h-5 !w-5" />
              <div className="text-[13px] font-semibold">{btn.title}</div>
              <div className="text-xs font-normal text-zinc-400 text-wrap">
                {btn.description}
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
