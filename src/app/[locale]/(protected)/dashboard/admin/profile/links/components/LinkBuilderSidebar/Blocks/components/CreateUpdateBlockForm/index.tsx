"use client"

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { BlockAnimation, BlockTextAlign } from "@/app/[locale]/types/block";
import { Block, BlockType } from "@prisma/client";
import React, { useState } from "react";
import { blocks } from "../../../../../types/block";
import { CreateUpdateBlockFormFooter } from "./components/Footer";
import { CreateUpdateBlockFormHeader } from "./components/Header";
import { useTranslations } from "next-intl";

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
    text: "",
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
  };

  const [formData, setFormData] = useState<Block>(block || initialBlock);

  const updateBlockProperty = (key: keyof Block, value: string) => {
    setFormData((prev) => ({...prev, [key]: value}));
  };

  return (
    <div className="flex flex-col flex-1 justify-between absolute top-0 left-0 w-[520px] z-[9] h-screen font-noto-sans font-medium !bg-white w-[370px] border-1 border-r-[#d3d3d3] overflow-y-auto">
      <CreateUpdateBlockFormHeader title={blocksTitles[type]} />

      <BlockComponent
        block={formData}
        onUpdateBlockProperty={updateBlockProperty}
      />

      <CreateUpdateBlockFormFooter
        submitbtnLabel={block ? "Update" : "Create"}
        onSubmit={() => onSubmit(formData)}
        onClose={onClose}
      />
    </div>
  );
};
