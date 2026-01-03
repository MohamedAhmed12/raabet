"use client";

import { DashboardCard } from "@/app/[locale]/(protected)/dashboard/admin/components/DashboardCard";
import { Icon } from "@/components/Icon";
import { Block, BlockType } from "@prisma/client";
import { useTranslations } from "next-intl";
import { memo, useCallback, useMemo, useState, useEffect } from "react";
import { toast } from "sonner";
import { createBlock } from "../../../actions/createBlocks";
import { orderBlocks } from "../../../actions/orderBlocks";
import DashbaordSortableList from "../../DashbaordSortableList";
import { BlockSortableItem } from "../../DashbaordSortableList/BlockSortableItem";
import { BlocksDialog } from "./components/BlocksDialog";
import { CreateUpdateBlockForm } from "./components/CreateUpdateBlockForm";
import { useGetLink, useUpdateLinkField } from "../../../hooks/useUpdateLink";

const Blocks = memo(
  () => {
    const [createNewBlockType, setCreateNewBlockType] =
      useState<BlockType | null>(null);

    const t = useTranslations("LinksPage.generalStyles.blocks");
    const getLink = useGetLink();
    const link = getLink();
    const updateLinkField = useUpdateLinkField();

    // Use local state to prevent UI shifting during drag operations
    const [localBlocks, setLocalBlocks] = useState<Block[] | undefined>(
      link?.blocks
    );

    // Sync local state with cache updates
    useEffect(() => {
      if (link?.blocks) {
        setLocalBlocks(link.blocks);
      }
    }, [link?.blocks]);

    const blocks = localBlocks || link?.blocks;

    const handleOnDragEnd = useCallback(
      async (newBlocksOrder: Block[]) => {
        const oldBlocksOrder = [...blocks!];

        // Update local state immediately - this prevents UI shifting
        setLocalBlocks(newBlocksOrder);

        // Update cache optimistically
        updateLinkField("blocks", newBlocksOrder, false);

        try {
          // Persist to database
          await orderBlocks(newBlocksOrder);
        } catch (error) {
          console.error(error);
          toast.error(t("errors.sortingBlocks"));
          // Revert both local state and cache on error
          setLocalBlocks(oldBlocksOrder);
          updateLinkField("blocks", oldBlocksOrder, false);
        }
      },
      [blocks, updateLinkField, t]
    );

    // Memoize the block creation handler
    const handleCreateNewBlock = useCallback(
      async (block: Block) => {
        try {
          const newBlock = await createBlock(block);
          const updatedBlocks = [...(blocks || []), newBlock];

          // Update both local state and cache
          setLocalBlocks(updatedBlocks);
          updateLinkField("blocks", updatedBlocks, false);
          setCreateNewBlockType(null);
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong while creating new block!");
        }
      },
      [blocks, updateLinkField]
    );

    const handleOnCreateNewBlock = (blockType: BlockType) => {
      setCreateNewBlockType(blockType);
    };

    // Memoize the block cards render
    const renderBlockCards = useMemo(() => {
      if (!blocks?.length) return null;
      return blocks.map((block) => (
        <BlockSortableItem key={`${block.id}-${block.order}`} block={block} />
      ));
    }, [blocks]);

    const HelperTooltipContent = useMemo(
      () => (
        <div className="items-center justify-center">
          {t("helperTooltip.drag")}
          <Icon name="grip-vertical" className="inline-flex" sizeClass="sm" />
          {t("helperTooltip.toReorder")}
        </div>
      ),
      [t]
    );

    return (
      <>
        <DashboardCard
          hasHelperTooltip
          HelperTooltipContent={HelperTooltipContent}
          title={t("title")}
          headerContent={
            <BlocksDialog onCreateNewBlock={handleOnCreateNewBlock} />
          }
          className="gap-0"
        >
          <DashbaordSortableList
            items={blocks || []}
            onDragEnd={handleOnDragEnd}
          >
            <ul className="list w-full">{renderBlockCards}</ul>
          </DashbaordSortableList>
        </DashboardCard>

        {/* Overlay create block form */}
        {createNewBlockType && (
          <CreateUpdateBlockForm
            type={createNewBlockType}
            onSubmit={handleCreateNewBlock}
            onClose={() => setCreateNewBlockType(null)}
          />
        )}
      </>
    );
  },
  () => true
);

Blocks.displayName = "Blocks";

export { Blocks };
