import { useLinkStore } from "@/app/store/use-link-store";
import { Block } from "@/app/types/block";
import { iconNameType } from "@/assets/icons";
import { CustomTooltip } from "@/components/CustomTooltip";
import { Icon } from "@/components/Icon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { copyBlock } from "../../actions/copyBlocks";
import { deleteBlock } from "../../actions/deleteBlocks";
import { CreateUpdateBlockForm } from "../LinkBuilderSidebar/Blocks/components/CreateUpdateBlockForm/page";

const schema = z.object({
  website: z.string().url("Please enter a valid URL"),
});

export const BlockSortableItem = ({block}: {block: Block}) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const replaceLink = useLinkStore((state) => state.replaceLink);

  const {setNodeRef, attributes, transform, transition} = useSortable({
    id: block?.id || "",
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const MemoizedActionBtn = memo(
    ({
      icon,
      onClick,
      content,
    }: {
      icon: iconNameType;
      onClick: any;
      content: string;
    }) => (
      <CustomTooltip
        trigger={
          <Icon
            name={icon}
            sizeClass="sm"
            className="cursor-pointer hover:bg-gray-100"
            onClick={onClick}
          />
        }
        content={content}
      />
    )
  );

  const handleCopyBlock = async () => {
    try {
      const clonedBlock = await copyBlock(block);

      replaceLink((prev) => {
        const prevBlocks = prev?.blocks || [];

        return {
          ...prev,
          blocks: [...prevBlocks, clonedBlock],
        };
      });
    } catch (error) {
      toast.error("Something went wrong while creating new block!");
    }
  };

  const handleDeleteBlock = async () => {
    try {
      if (!block.id) return;

      const deletedBlock = await deleteBlock(block.id);

      replaceLink((prev) => {
        const prevBlocks = prev?.blocks || [];

        // Remove the deleted block from the array
        const updatedBlocks = prevBlocks.filter(
          (b) => b.id !== deletedBlock.id
        );

        return {
          ...prev,
          blocks: updatedBlocks,
        };
      });
    } catch (error) {
      toast.error("Something went wrong while creating new block!");
    }
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center bg-white rounded-lg border border-blue-300 shadow-md hover:shadow-lg font-noto-sans font-light h-[62px] overflow-hidden not-last:mb-3"
      {...attributes}
    >
      <div className="flex items-center justify-center px-1 min-h-max cursor-move bg-gray-100 h-full">
        <Icon name="grip-vertical" sizeClass="sm" />
      </div>

      <div className="w-full flex flex-col px-2.5 py-2">
        <div className="text-dashboard-primary text-sm mb-[6px]">
          {block.title}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400 capitalize">{block.type}</div>
          <div className="flex space-x-1 text-gray-600">
            <MemoizedActionBtn
              icon="copy"
              onClick={() => handleCopyBlock()}
              content={"Copy Block"}
            />

            <MemoizedActionBtn
              icon="pencil"
              onClick={() => setIsDialogVisible(true)}
              content={"Edit"}
            />

            {/* present schedule blocks next release  */}
            {/* <MemoizedActionBtn
              icon="clock"
              onClick={() => console.log(1)}
              content={"Schedule"}
            /> */}

            <MemoizedActionBtn
              icon="delete"
              onClick={() => handleDeleteBlock()}
              content={"Delete"}
            />
          </div>
        </div>
      </div>

      {/* overlay create/update block form  */}
      {isDialogVisible && (
        <CreateUpdateBlockForm
          type={block.type}
          block={block}
          onClose={() => setIsDialogVisible(false)}
        />
      )}
    </li>
  );
};
