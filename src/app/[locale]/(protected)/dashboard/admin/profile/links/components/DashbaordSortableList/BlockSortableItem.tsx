import { stripHtmlTags } from "@/app/[locale]/[username]/helpers/stripHtmlTags";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { iconNameType } from "@/assets/icons";
import { CustomTooltip } from "@/components/CustomTooltip";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Block } from "@prisma/client";
import { memo, useState } from "react";
import { toast } from "sonner";
import { copyBlock } from "../../actions/copyBlocks";
import { deleteBlock } from "../../actions/deleteBlocks";
import { updateBlock as updateBlockAction } from "../../actions/updateBlock";
import { CreateUpdateBlockForm } from "../LinkBuilderSidebar/Blocks/components/CreateUpdateBlockForm";

export const BlockSortableItem = ({ block }: { block: Block }) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const replaceLink = useLinkStore((state) => state.replaceLink);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
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
      className,
    }: {
      icon: iconNameType;
      onClick: (e: React.MouseEvent) => void;
      content: string;
      className?: string;
    }) => (
      <CustomTooltip
        trigger={
          <div
            onClick={(e) => {
              e.stopPropagation();
              onClick(e);
            }}
          >
            <Icon
              name={icon}
              sizeClass="sm"
              className={cn("cursor-pointer hover:bg-gray-100", className)}
            />
          </div>
        }
        content={content}
      />
    )
  );
  MemoizedActionBtn.displayName = "MemoizedActionBtn";

  const handleCopyBlock = async () => {
    setIsCopying(true);
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
      console.error(error);
      toast.error("Something went wrong while creating new block!");
    }
    setIsCopying(false);
  };

  const handleDeleteBlock = async () => {
    setIsDeleting(true);
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
      console.error(error);
      toast.error("Something went wrong while creating new block!");
    }
    setIsDeleting(false);
  };

  const updateBlock = async (block: Block) => {
    try {
      const updatedBlock = await updateBlockAction(block);

      replaceLink((prev) => {
        const prevBlocks = prev?.blocks || [];

        const updatedBlocks = prevBlocks.map((block) =>
          block.id === updatedBlock.id ? updatedBlock : block
        );

        return {
          ...prev,
          blocks: updatedBlocks,
        };
      });
      setIsDialogVisible(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating the block!");
    }
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center bg-white rounded-lg border border-blue-300 shadow-md hover:shadow-lg font-noto-sans font-light h-[62px] overflow-hidden not-last:mb-3"
    >
      <div
        {...attributes}
        {...listeners}
        tabIndex={-1}
        className="flex items-center justify-center px-1 min-h-max cursor-move bg-gray-100 h-full"
      >
        <Icon name="grip-vertical" sizeClass="sm" />
      </div>

      <div
        className="w-full flex flex-col px-2.5 py-2 cursor-pointer"
        onClick={() => setIsDialogVisible(true)}
      >
        <div className="text-dashboard-primary text-sm mb-[6px] truncate max-w-[7rem]">
          {stripHtmlTags(block.title)}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400 capitalize">{block.type}</div>
          <div className="flex space-x-1 text-gray-600">
            <MemoizedActionBtn
              icon={!isCopying ? "copy" : "loader-circle"}
              onClick={() => {
                handleCopyBlock();
              }}
              content={"Copy Block"}
              className={!isCopying ? "" : "animate-spin"}
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
              icon={!isDeleting ? "delete" : "loader-circle"}
              onClick={() => handleDeleteBlock()}
              content={"Delete"}
              className={!isDeleting ? "" : "animate-spin"}
            />
          </div>
        </div>
      </div>

      {/* overlay create/update block form  */}
      {isDialogVisible && (
        <CreateUpdateBlockForm
          type={block.type}
          block={block}
          onSubmit={(block) => updateBlock(block)}
          onClose={() => setIsDialogVisible(false)}
        />
      )}
    </li>
  );
};
