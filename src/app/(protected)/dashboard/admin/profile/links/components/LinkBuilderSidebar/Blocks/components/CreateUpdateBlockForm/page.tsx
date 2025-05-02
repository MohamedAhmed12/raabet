import { useLinkStore } from "@/app/store/use-link-store";
import { Block, BlockAnimation, BlockTextAlign } from "@/app/types/block";
import React, { useState } from "react";
import { blocks, blockTitle, BlockType } from "../../../../../types/block";
import { CreateUpdateBlockFormFooter } from "./components/Footer";
import { CreateUpdateBlockFormHeader } from "./components/Header";

interface CreateUpdateBlockFormProps {
  type: BlockType;
  block?: Block;
  onClose: () => void;
}

export const CreateUpdateBlockForm: React.FC<CreateUpdateBlockFormProps> = ({
  type,
  block,
  onClose,
}) => {
  const linkId = useLinkStore((state) => state.link.id);
  const blocksLength = useLinkStore((state) => state.link.blocks?.length);

  const BlockComponent = blocks[type];

  const initialBlock: Block = {
    style: 0,
    type,
    title: "",
    description: "",
    text: "",
    text_align: BlockTextAlign.Left,
    text_color: "",
    animation: BlockAnimation.None,
    corner: 0,
    layout: "1",
    order: !blocksLength ? 1 : blocksLength + 1,
    url: "",
    linkId,
  };

  const [formData, setFormData] = useState<Block>(block || initialBlock);

  const updateBlockProperty = (key: keyof Block, value: string) => {
    setFormData((prev) => ({...prev, [key]: value}));
  };

  const handleSubmit = () => {
    console.log("handle submit called ");
  };

  return (
    <div className="flex flex-col flex-1 justify-between absolute top-0 left-0 w-[520px] z-[9] h-screen font-noto-sans font-medium !bg-white w-[370px] border-1 border-r-[#d3d3d3] overflow-y-auto">
      <CreateUpdateBlockFormHeader title={blockTitle[type]} />

      <BlockComponent
        block={formData}
        onUpdateBlockProperty={updateBlockProperty}
      />

      <CreateUpdateBlockFormFooter
        submitbtnLabel={block ? "Update" : "Create"}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    </div>
  );
};
