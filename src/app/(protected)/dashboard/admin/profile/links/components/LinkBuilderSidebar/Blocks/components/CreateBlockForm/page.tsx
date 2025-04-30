"use client";

import {useState} from "react";
import {blocks, blockTitle, BlockType} from "../../../../../types/block";
import {CreateBlockFormFooter} from "./components/Footer";
import {CreateBlockFormHeader} from "./components/Header";
import {Block, BlockAnimation, BlockTextAlign} from "@/app/types/block";

export const CreateBlockForm = ({
  type,
  onClose,
}: {
  type: BlockType;
  onClose: () => void;
}) => {
  const BlockComponent = blocks[type];

  const [block, setBlock] = useState<Block>({
    id: "",
    style: 0,
    type,
    title: "",
    description: "",
    text: "",
    text_align: BlockTextAlign.Left,
    text_color: "",
    animation: BlockAnimation.None,
    corner: 0,
    layout: "0",
    url: "",
    linkId: "",
  });

  const updateBlockProperty = (key: keyof Block, val: string) => {
    if (!block) return;
    const updatedBlock = {...block, [key]: val};
    setBlock(updatedBlock);
  };

  return (
    <div className="flex flex-col flex-1 justify-between absolute top-0 left-0 w-[520px] z-[9] h-screen font-noto-sans font-medium !bg-white w-[370px] border-1 border-r-[#d3d3d3] overflow-y-auto">
      <CreateBlockFormHeader title={blockTitle[type]} />

      <BlockComponent
        block={block}
        onUpdateBlockProperty={updateBlockProperty}
      />

      <CreateBlockFormFooter onClose={onClose} />
    </div>
  );
};
