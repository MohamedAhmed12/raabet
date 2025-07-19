"use client";

import { LinkSocial, useLinkStore } from "@/app/[locale]/store/use-link-store";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripVertical, Loader2, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { memo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";
import { deleteSocial } from "../../actions/deleteSocial";
import { updateLinkUrl } from "../../actions/updateLinkUrl";
import { updateSocialLabel } from "../../actions/updateSocialLabel";
import { EditSocialLabelDialog } from "./EditSocialLabelDialog";

const schema = z.object({
  website: z.string().url("Please enter a valid URL"),
});

interface SocialSortableItemProps {
  item: LinkSocial;
}

const SocialSortableItemComponent = ({ item }: SocialSortableItemProps) => {
  const isSeparator = !item?.icon;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("Shared");

  const socials = useLinkStore(useShallow((state) => state.link.socials));
  const linkId = useLinkStore((state) => state.link.id);
  const setLink = useLinkStore((state) => state.setLink);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      website: item.url || "",
    },
  });

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: item.id,
      disabled: isFocused,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    willChange: "transform",
  };

  const onSubmit = async (data: { website: string }) => {
    await updateLinkUrl(item.id, data.website);
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    startTransition(async () => {
      const result = await deleteSocial(item.id, linkId);
      if (result.success && result.socials) {
        setLink({ key: "socials", value: result.socials });
      } else {
        console.error("Failed to delete item:", result.error);
      }
      setIsDeleting(false);
    });
  };

  const handleUpdateLabel = async (value: string) => {
    if (item.label === value) return;

    // Return early if socials is undefined
    if (!socials) return;

    // Optimistic update
    const updatedSocials = socials.map((social) =>
      social.id === item.id ? { ...social, label: value } : social
    );

    setLink({ key: "socials", value: updatedSocials });

    try {
      const response = await updateSocialLabel(item.id, value);

      if (!response.success) {
        // Revert on error
        setLink({ key: "socials", value: socials });
        console.error("Failed to update label:", response.error);
      }
    } catch (error) {
      // Revert on error
      setLink({ key: "socials", value: socials });
      console.error("Error updating label:", error);
    }
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="item w-full flex justify-between items-center mb-5"
    >
      <div {...attributes} {...listeners} className="cursor-move mr-2">
        <GripVertical
          size={isSeparator ? 15 : 18}
          strokeWidth={2}
          className="cursor-move"
        />
      </div>

      {!isSeparator ? (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full !mb-0 mx-2">
          <div>
            <Input
              id="website"
              {...register("website")}
              placeholder="Enter website URL"
              icon={<Icon name={item?.icon} sizeClass="sm" />}
              onFocus={handleFocus}
              onBlur={() => {
                handleBlur();
                handleSubmit(onSubmit)();
              }}
              className="pr-9"
            />
            {errors.website && <p>{errors.website.message}</p>}
          </div>
        </form>
      ) : (
        <div className="flex flex-1 justify-center items-center overflow-hidden mx-2">
          <Separator />
          <span className="mx-3 text-zinc-600">{t("separator")}</span>
          <Separator />
        </div>
      )}

      <div className="actions">
        {!isSeparator && (
          <EditSocialLabelDialog
            placeholder="Icon Label"
            initialValue={item.label}
            onSubmit={handleUpdateLabel}
          />
        )}
        {!isDeleting ? (
          <Trash2
            size={16}
            className="cursor-pointer text-red-600"
            onClick={() => {
              handleDelete();
            }}
          />
        ) : (
          <Loader2 size={16} className="animate-spin" />
        )}
      </div>
    </li>
  );
};

SocialSortableItemComponent.displayName = "SocialSortableItem";

export const SocialSortableItem = memo(SocialSortableItemComponent);
