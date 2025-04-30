"use client";

import { DashboardCard } from "@/app/(protected)/dashboard/admin/components/DashboardCard";
import { useLinkStore } from "@/app/store/use-link-store";
import { Block } from "@/app/types/block";
import { Icon } from "@/components/Icon";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { orderBlocks } from "../../../actions/orderBlocks";
import { BlockType } from "../../../types/block";
import { BlockSortableItem } from "../../DashbaordSortableList/BlockSortableItem";
import { DashbaordSortableList } from "../../DashbaordSortableList/page";
import { BlocksDialog } from "./components/BlocksDialog";
import { CreateBlockForm } from "./components/CreateBlockForm/page";

export const Blocks = () => {
  const [createNewBlockType, setCreateNewBlockType] =
    useState<BlockType | null>(null);

  const blocks = useLinkStore((state) => state.link.blocks);
  const setLink = useLinkStore((state) => state.setLink);

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

  const renderBlock = () => {
    if (!blocks) return null;

    return (
      <DashbaordSortableList items={blocks} onDragEnd={onDragEnd}>
        <ul className="list w-full">
          {blocks?.map((block) => (
            <BlockSortableItem block={block} />
          ))}
        </ul>
      </DashbaordSortableList>
    );
  };

  const handleOnCreateNewBlock = (blockType: BlockType) => {
    setCreateNewBlockType(blockType);
  };

  const onDragEnd = async (blocks: Block[]) => {
    const oldBlocks = [...blocks!];
    const data = blocks.map(({id, order}) => ({
      id,
      order,
    }));

    setLink({
      blocks,
    });

    try {
      await orderBlocks(data);
    } catch (error) {
      toast.error("Something went wrong while sorting socials!");
      setLink({
        blocks: oldBlocks,
      });
    }
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
