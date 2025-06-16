import { stripHtmlTags } from "@/app/[locale]/[username]/helpers/stripHtmlTags";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Block } from "@prisma/client";
import { GripVertical } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { updateBlock as updateBlockAction } from "../../actions/updateBlock";
import { CreateUpdateBlockForm } from "../LinkBuilderSidebar/Blocks/components/CreateUpdateBlockForm";
import { BlockActions } from "./BlockActions";

export const BlockSortableItem = ({ block }: { block: Block }) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const replaceLink = useLinkStore((state) => state.replaceLink);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: block?.id || "",
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
        <GripVertical size={16} />
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
            <BlockActions
              block={block}
              onEdit={() => setIsDialogVisible(true)}
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
