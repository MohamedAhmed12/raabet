"use client";

import {Icon} from "@/components/Icon";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useState} from "react";
import {HelperTooltip} from "../../../../../components/HelperTooltip";
import {BlockType} from "../../../types/block";
import {BlocksDialog} from "./components/BlocksDialog";
import {CreateBlockForm} from "./components/CreateBlockForm/page";
import {DashboardCard} from "@/app/(protected)/dashboard/admin/components/DashboardCard";

export const Blocks = () => {
  const [createNewBlockType, setCreateNewBlockType] =
    useState<BlockType | null>(null);

  const HelperTooltipContent = (
    <div className=" items-center justify-center">
      Drag the
      <Icon name="grip-vertical" className="inline-flex" sizeClass="sm" />
      to reorder blocks. Click a block to edit it. Hover the
      {/* <Icon name="grip-vertical" className="inline-flex" sizeClass="sm" /> */}
      <Icon name="settings" className="inline-flex mx-[2px]" sizeClass="sm" />
      to view all options for a block.
    </div>
  );

  const handleOnCreateNewBlock = (blockType: BlockType) => {
    setCreateNewBlockType(blockType);
  };

  return (
    <>
      <DashboardCard
        HelperTooltipContent={HelperTooltipContent}
        title="blocks"
        headerContent={
          //  add block button & dialog
          <BlocksDialog onCreateNewBlock={handleOnCreateNewBlock} />
        }
        children="children"
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
