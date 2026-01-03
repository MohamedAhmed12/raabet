import { Block } from "@prisma/client";
import { useTranslations } from "next-intl";
import { memo, useCallback, useState } from "react";
import { toast } from "sonner";
import { copyBlock } from "../../actions/copyBlocks";
import { deleteBlock } from "../../actions/deleteBlocks";
import { useGetLink, useUpdateLinkField } from "../../hooks/useUpdateLink";
import { ActionButton } from "./ActionButton";

interface BlockActionsProps {
  block: Block;
  onEdit: () => void;
}

const BlockActions = memo(({ block, onEdit }: BlockActionsProps) => {
  const [isCopying, setIsCopying] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const getLink = useGetLink();
  const link = getLink();
  const oldBlocks = link?.blocks || [];

  const updateLinkField = useUpdateLinkField();

  const t = useTranslations("BlockActions");

  const handleCopyBlock = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsCopying(true);

      try {
        const clonedBlock = await copyBlock(block);
        const updatedBlocks = [...oldBlocks, clonedBlock];
        updateLinkField("blocks", updatedBlocks, false);
        toast.success(t("copySuccess"));
      } catch (error) {
        console.error(error);
        toast.error(t("copyError"));
      } finally {
        setIsCopying(false);
      }
    },
    [block, oldBlocks, updateLinkField, t]
  );

  const handleDeleteBlock = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!block.id) return;

      if (!confirm(t("deleteConfirm"))) {
        return;
      }

      setIsDeleting(true);

      // Optimistic update
      const updatedBlocks = oldBlocks.filter((b) => b.id !== block.id);
      updateLinkField("blocks", updatedBlocks, false);

      try {
        await deleteBlock(block.id);
        // Server confirmed deletion, keep the optimistic update
      } catch (error) {
        console.error(error);
        // Revert on error
        updateLinkField("blocks", oldBlocks, false);
        toast.error(t("deleteError"));
      } finally {
        setIsDeleting(false);
      }
    },
    [block.id, oldBlocks, updateLinkField, t]
  );

  return (
    <div className="flex space-x-1 text-gray-600">
      <ActionButton
        icon="copy"
        onClick={handleCopyBlock}
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
        onClick={handleDeleteBlock}
        content={t("delete")}
        isLoading={isDeleting}
      />
    </div>
  );
});

BlockActions.displayName = "BlockActions";

export { BlockActions };
