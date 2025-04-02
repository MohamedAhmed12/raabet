"use client";

import { Icon } from "@/components/Icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { HelperTooltip } from "../../../../../components/HelperTooltip";
import { BlockType } from "../../../types/block";
import { BlocksDialog } from "./components/BlocksDialog";
import { CreateBlockForm } from "./components/CreateBlockForm/page";

export const Blocks = () => {
  const [createNewBlockType, setCreateNewBlockType] = useState<BlockType>();

  const handleOnCreateNewBlock = (blockType: BlockType) => {
    setCreateNewBlockType(blockType);
  };
  return (
    <>
      <Card className="p-0 font-noto-sans">
        <CardHeader className="p-0">
          <CardTitle className="flex justify-between w-full font-normal text-[14px] text-center dashboard-general-style-controller text-deep-blue-gray bg-[#fafafa] !mb-0">
            <span className="flex justify-center items-center gap-2 ">
              <HelperTooltip
                content={
                  <div className=" items-center justify-center">
                    Drag the
                    <Icon
                      name="grip-vertical"
                      className="inline-flex"
                      sizeClass="sm"
                    />
                    to reorder blocks. Click a block to edit it. Hover the
                    {/* <Icon name="grip-vertical" className="inline-flex" sizeClass="sm" /> */}
                    <Icon
                      name="settings"
                      className="inline-flex mx-[2px]"
                      sizeClass="sm"
                    />
                    to view all options for a block.
                  </div>
                }
              />
              blocks
            </span>

            {/* add block button & dialog */}
            <BlocksDialog onCreateNewBlock={handleOnCreateNewBlock} />
          </CardTitle>
        </CardHeader>

        <CardContent>children</CardContent>
      </Card>

      {/* overlay create block form  */}
      {createNewBlockType && <CreateBlockForm type={createNewBlockType} />}
    </>
  );
};
