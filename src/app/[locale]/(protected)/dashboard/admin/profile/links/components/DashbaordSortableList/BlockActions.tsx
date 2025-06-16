import { Link, useLinkStore } from "@/app/[locale]/store/use-link-store";
import { Block } from "@prisma/client";
import { useTranslations } from "next-intl";
import { memo, useCallback, useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { copyBlock } from "../../actions/copyBlocks";
import { deleteBlock } from "../../actions/deleteBlocks";
import { ActionButton } from "./ActionButton";

interface BlockActionsProps {
  block: Block;
  onEdit: () => void;
}

const BlockActions = memo(({ block, onEdit }: BlockActionsProps) => {
  const [isCopying, setIsCopying] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { setLink, blocks } = useLinkStore(
    useShallow((state) => ({
      blocks: state.link.blocks,
      setLink: state.setLink,
    }))
  );

  const t = useTranslations("BlockActions");

  const handleCopyBlock = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsCopying(true);
      try {
        const clonedBlock = await copyBlock(block);
        setLink({
          key: "blocks",
          value: (prev: Link) => [...(prev.blocks || []), clonedBlock],
        });
        toast.success(t("copySuccess"));
      } catch (error) {
        console.error(error);
        toast.error(t("copyError"));
      } finally {
        setIsCopying(false);
      }
    },
    [blocks, block, setLink]
  );

  const handleDeleteBlock = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!block.id) return;

      if (!confirm(t("deleteConfirm"))) {
        return;
      }

      setIsDeleting(true);
      try {
        const deletedBlock = await deleteBlock(block.id);
        setLink({
          key: "blocks",
          value: (prev: Link) =>
            (prev.blocks || []).filter((b) => b.id !== deletedBlock.id),
        });
      } catch (error) {
        console.error(error);
        toast.error(t("deleteError"));
      } finally {
        setIsDeleting(false);
      }
    },
    [blocks, block.id, setLink]
  );

  return (
    <div className="flex space-x-1 text-gray-600">
      <ActionButton
        icon="copy"
        onClick={(e) => handleCopyBlock(e)}
        content={t("copyBlock")}
        isLoading={isCopying}
      />

      <ActionButton icon="pencil" onClick={() => onEdit()} content={"Edit"} />

      {/* present schedule blocks next release  */}
      {/* <ActionButton
          icon="clock"
          onClick={() => console.log(1)}
          content={t("schedule")}
        /> 
      */}

      <ActionButton
        icon="delete"
        onClick={(e) => handleDeleteBlock(e)}
        content={t("delete")}
        isLoading={isDeleting}
      />
    </div>
  );
});

BlockActions.displayName = "BlockActions";

export { BlockActions };
