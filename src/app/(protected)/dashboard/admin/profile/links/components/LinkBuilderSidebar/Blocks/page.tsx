"use client";

import { DashboardCard } from "@/app/(protected)/dashboard/admin/components/DashboardCard";
import { useLinkStore } from "@/app/store/use-link-store";
import { Icon } from "@/components/Icon";
import { useMemo, useState } from "react";
import { BlockType } from "../../../types/block";
import { BlockItem } from "./components/BlockItem";
import { BlocksDialog } from "./components/BlocksDialog";
import { CreateBlockForm } from "./components/CreateBlockForm/page";

export const Blocks = () => {
  const [createNewBlockType, setCreateNewBlockType] =
    useState<BlockType | null>(null);

  const blocks = useLinkStore((state) => state.link.blocks);

  const HelperTooltipContent = useMemo(
    () => (
      <div className=" items-center justify-center">
        Drag the
        <Icon name="grip-vertical" className="inline-flex" sizeClass="sm" />
        to reorder blocks. Click a block to edit it. Hover the
        {/* <Icon name="grip-vertical" className="inline-flex" sizeClass="sm" /> */}
        <Icon name="settings" className="inline-flex mx-[2px]" sizeClass="sm" />
        to view all options for a block.
      </div>
    ),
    []
  );

  const renderBlock = () => blocks?.map((block) => <BlockItem block={block} />);

  const handleOnCreateNewBlock = (blockType: BlockType) => {
    setCreateNewBlockType(blockType);
  };

  return (
    <>
      <DashboardCard
        hasHelperTooltip
        HelperTooltipContent={HelperTooltipContent}
        title="blocks"
        headerContent={
          //  add block button & dialog
          <BlocksDialog onCreateNewBlock={handleOnCreateNewBlock} />
        }
        children={renderBlock()}
        className="gap-0"
      />

      {/* overlay create block form  */}
      {createNewBlockType && (
        <CreateBlockForm
          type={createNewBlockType}
          onClose={() => setCreateNewBlockType(null)}
        />
      )}
    </>
  );
};
