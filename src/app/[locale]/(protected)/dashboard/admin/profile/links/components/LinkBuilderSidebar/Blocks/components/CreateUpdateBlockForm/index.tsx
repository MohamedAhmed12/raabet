"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { BlockAnimation, BlockTextAlign } from "@/app/[locale]/types/block";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Block, BlockType } from "@prisma/client";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { z } from "zod";
import {
  blocks,
  blockSchemas,
  validateBlock,
} from "../../../../../types/block";
import { CreateUpdateBlockFormFooter } from "./components/Footer";
import { CreateUpdateBlockFormHeader } from "./components/Header";

interface CreateUpdateBlockFormProps {
  type: BlockType;
  block?: Block;
  onSubmit: (block: Block) => void;
  onClose: () => void;
}

export const CreateUpdateBlockForm: React.FC<CreateUpdateBlockFormProps> = ({
  type,
  block,
  onSubmit,
  onClose,
}) => {
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);
  const t = useTranslations("LinksPage.generalStyles.blockForm");
  const linkId = useLinkStore((state) => state.link.id);
  const blocksLength = useLinkStore((state) => state.link.blocks?.length);

  const BlockComponent = blocks[type];
  const blocksTitles = {
    text: t("title.text"),
    url: t("title.url"),
    email: t("title.email"),
    file: t("title.file"),
    image: t("title.image"),
    separator: t("title.separator"),
    audio: t("title.audio"),
    video: t("title.video"),
  };

  const initialBlock: Block = {
    id: "1",
    style: 0,
    type,
    title: "",
    description: "",
    text_align: BlockTextAlign.Left,
    text_color: "",
    animation: BlockAnimation.None,
    bg_image: "",
    custom_text_color: "",
    url: "",
    order: !blocksLength ? 1 : blocksLength + 1,
    corner: 0,
    layout: "1",
    linkId: linkId || "",
    views: 0,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const [formData, setFormData] = useState<Block>(block || initialBlock);
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateBlockProperty = (key: keyof Block, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleOnSubmit = async (block: Block) => {
    setIsLoading(true);

    const result: z.SafeParseReturnType<
      unknown,
      z.infer<(typeof blockSchemas)[BlockType]>
    > = validateBlock(block, type);
    console.log("type", block);
    console.log("result", result);

    if (!result.success) {
      if (result?.error) {
        setErrors(result?.error?.issues);
      }
    } else {
      await onSubmit(block);
      setErrors([]);
    }

    setIsLoading(false);
  };

  return (
    <div
      className={cn(
        "flex flex-col flex-1 justify-between absolute top-0 min-w-[520px] z-[9] min-h-screen font-medium !bg-white w-[370px] border-1 border-r-[#d3d3d3] overflow-y-auto",
        locale === "ar" ? "right-0" : "left-0",
        fontClass
      )}
    >
      <CreateUpdateBlockFormHeader title={blocksTitles[type]} />

      <BlockComponent
        block={formData}
        onUpdateBlockProperty={updateBlockProperty}
        errors={errors}
      />

      <CreateUpdateBlockFormFooter
        submitbtnLabel={block ? "Update" : "Create"}
        onSubmit={() => handleOnSubmit(formData)}
        isLoading={isLoading}
        onClose={onClose}
      />
    </div>
  );
};
