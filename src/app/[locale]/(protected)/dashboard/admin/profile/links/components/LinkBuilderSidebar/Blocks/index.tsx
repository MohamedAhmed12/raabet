"use client";

import {DashboardCard} from "@/app/[locale]/(protected)/dashboard/admin/components/DashboardCard";
import {useLinkStore} from "@/app/[locale]/store/use-link-store";
import {Icon} from "@/components/Icon";
import {Block} from "@/generated/prisma";
import {useTranslations} from "next-intl";
import {useMemo, useState} from "react";
import {toast} from "sonner";
import {createBlock as createBlockAction} from "../../../actions/createBlocks";
// import {orderBlocks} from "../../../actions/orderBlocks";
import {BlockType} from "../../../types/block";
// import {BlockSortableItem} from "../../DashbaordSortableList/BlockSortableItem";
// import DashbaordSortableList from "../../DashbaordSortableList/page";
import {BlocksDialog} from "./components/BlocksDialog";
import {CreateUpdateBlockForm} from "./components/CreateUpdateBlockForm";

export const Blocks = () => {
  const [createNewBlockType, setCreateNewBlockType] =
    useState<BlockType | null>(null);

  const t = useTranslations("LinksPage.generalStyles");
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

  const renderBlockCards = () => {
    if (!blocks) return null;

    return (
      <p>f</p>
      // <DashbaordSortableList items={blocks} onDragEnd={onDragEnd}>
      //   <ul className="list w-full">
      //     {blocks?.map((block, index) => (
      //       <BlockSortableItem key={index} block={block} />
      //     ))}
      //   </ul>
      // </DashbaordSortableList>
    );
  };

  const handleOnCreateNewBlock = (blockType: BlockType) => {
    setCreateNewBlockType(blockType);
  };

  // const onDragEnd = async (newBlocksOrder: Block[]) => {
  //   const oldBlocksOrder = [...blocks!];

  //   setLink({
  //     blocks: newBlocksOrder,
  //   });

  //   try {
  //     const data = newBlocksOrder.map(({id, order}) => ({
  //       id,
  //       order,
  //     }));

  //     await orderBlocks(data);
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong while sorting socials!");
  //     setLink({
  //       blocks: oldBlocksOrder,
  //     });
  //   }
  // };

  const createBlock = async (block: Block) => {
    try {
      const newBlock = await createBlockAction(block);
      const blocksData: Block[] = blocks ? [...blocks, newBlock] : [newBlock];

      setLink({
        blocks: blocksData,
      });
      setCreateNewBlockType(null);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating new block!");
    }
  };

  return (
    <>
      <DashboardCard
        hasHelperTooltip
        HelperTooltipContent={HelperTooltipContent}
        title={t("blocks")}
        headerContent={
          //  add block button & dialog
          <BlocksDialog onCreateNewBlock={handleOnCreateNewBlock} />
        }
        className="gap-0"
      >
        {renderBlockCards()}
      </DashboardCard>

      {/* overlay create block form  */}
      {createNewBlockType && (
        <CreateUpdateBlockForm
          type={createNewBlockType}
          onSubmit={(block) => createBlock(block)}
          onClose={() => setCreateNewBlockType(null)}
        />
      )}
    </>
  );
};
