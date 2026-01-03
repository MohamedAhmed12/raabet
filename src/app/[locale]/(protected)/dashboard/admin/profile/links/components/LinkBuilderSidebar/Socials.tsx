"use client";

import { LinkSocial } from "@/app/[locale]/store/use-link-store";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createSeparator } from "../../actions/createSeparator";
import { updateSocials } from "../../actions/updateSocials";
import { useGetLink, useUpdateLinkField } from "../../hooks/useUpdateLink";
import DashbaordSortableList from "../DashbaordSortableList";
import { AddSocialDialog } from "../DashbaordSortableList/AddSocialDialog";
import { SocialSortableItem } from "../DashbaordSortableList/SocialSortableItem";
import { DashboardAccordion } from "../DashboardAccordion";

export const Socials = () => {
  const t = useTranslations("LinksPage.generalStyles.socials");
  const getLink = useGetLink();
  const link = getLink();
  const updateLinkField = useUpdateLinkField();

  // Use local state to prevent UI shifting during drag operations
  const [localSocials, setLocalSocials] = useState<LinkSocial[] | undefined>(
    link?.socials
  );

  // Sync local state with cache updates
  useEffect(() => {
    if (link?.socials) {
      setLocalSocials(link.socials);
    }
  }, [link?.socials]);

  if (!link) return null;

  const socials = localSocials || link.socials;
  const linkId = link.id;
  const handleAddSeparator = async () => {
    if (!linkId) return;
    const result = await createSeparator(linkId);

    if (result.success && result.separator) {
      // Update cache only (createSeparator already persists to DB)
      updateLinkField("socials", [...socials!, result.separator], false);
    } else {
      toast.error(result.error || "Failed to add separator");
    }
  };

  const onDragEnd = async (data: LinkSocial[]) => {
    const oldSocials = [...socials!];

    // Update local state immediately - this prevents UI shifting
    setLocalSocials(data);

    // Update cache optimistically
    updateLinkField("socials", data, false);

    try {
      // Persist to database using the specific action
      const result = await updateSocials(data);

      // Update cache with server response (only if different)
      if (result && Array.isArray(result)) {
        updateLinkField("socials", result, false);
        setLocalSocials(result);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while sorting socials!");
      // Revert both local state and cache on error
      setLocalSocials(oldSocials);
      updateLinkField("socials", oldSocials, false);
    }
  };

  return (
    socials && (
      <DashboardAccordion mainLabel={t("title")} content={t("description")}>
        {socials && (
          <DashbaordSortableList items={socials} onDragEnd={onDragEnd}>
            <ul className="list w-full">
              {socials.map((item) => (
                <SocialSortableItem key={item.id} item={item} />
              ))}
            </ul>
          </DashbaordSortableList>
        )}
        <div className="footer flex flex-col items-center justify-center gap-2 flex-end mt-4 w-full">
          <AddSocialDialog />
          <button
            className="dashboard-general-style-controller w-full !justify-center !m-0 capitalize text-ms text-center !font-medium cursor-pointer"
            onClick={handleAddSeparator}
          >
            {t("addSeparator")}
          </button>
        </div>
      </DashboardAccordion>
    )
  );
};
