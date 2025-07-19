"use client";

import { DashboardCard } from "@/app/[locale]/(protected)/dashboard/admin/components/DashboardCard";
import { Link, useLinkStore } from "@/app/[locale]/store/use-link-store";
import { Icon } from "@/components/Icon";
import { Block, BlockType } from "@prisma/client";
import { useTranslations } from "next-intl";
import { memo, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { createBlock } from "../../../actions/createBlocks";
import { orderBlocks } from "../../../actions/orderBlocks";
import DashbaordSortableList from "../../DashbaordSortableList";
import { BlockSortableItem } from "../../DashbaordSortableList/BlockSortableItem";
import { BlocksDialog } from "./components/BlocksDialog";
import { CreateUpdateBlockForm } from "./components/CreateUpdateBlockForm";

const Blocks = memo(
  () => {
    const [createNewBlockType, setCreateNewBlockType] =
      useState<BlockType | null>(null);

    const t = useTranslations("LinksPage.generalStyles.blocks");
    const { blocks, setLink } = useLinkStore(
      useShallow((state) => ({
        blocks: state.link.blocks,
        setLink: state.setLink,
      }))
    );

    const handleOnDragEnd = useCallback(
      (newBlocksOrder: Block[]) => {
        const oldBlocksOrder = [...blocks!];

        setLink({ key: "blocks", value: newBlocksOrder });

        try {
          orderBlocks(newBlocksOrder);
        } catch (error) {
          console.error(error);
          toast.error(t("errors.sortingBlocks"));
          setLink({
            key: "blocks",
            value: oldBlocksOrder,
          });
        }
      },
      [blocks, setLink, t]
    );

    // Memoize the block creation handler
    const handleCreateNewBlock = useCallback(
      async (block: Block) => {
        try {
          const newBlock = await createBlock(block);

          setLink({
            key: "blocks",
            value: (prev: Link) => {
              const prevBlocks = prev?.blocks || [];
              return [...prevBlocks, newBlock];
            },
          });
          setCreateNewBlockType(null);
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong while creating new block!");
        }
      },
      [setLink]
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
