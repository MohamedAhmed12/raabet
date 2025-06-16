"use client";

import { LinkSocial, useLinkStore } from "@/app/[locale]/store/use-link-store";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { createSeparator } from "../../actions/createSeparator";
import { updateSocials } from "../../actions/updateSocials";
import DashbaordSortableList from "../DashbaordSortableList";
import { AddSocialDialog } from "../DashbaordSortableList/AddSocialDialog";
import { SocialSortableItem } from "../DashbaordSortableList/SocialSortableItem";
import { DashboardAccordion } from "../DashboardAccordion";

export const Socials = () => {
  const t = useTranslations("LinksPage.generalStyles");
  const { socials, linkId, setLink } = useLinkStore(
    useShallow((state) => ({
      socials: state.link.socials,
      linkId: state.link.id,
      setLink: state.setLink,
    }))
  );

  const handleAddSeparator = async () => {
    const result = await createSeparator(linkId);

    if (result.success && result.separator) {
      setLink({ key: "socials", value: [...socials!, result.separator] });
    } else {
      toast.error(result.error || "Failed to add separator");
    }
  };

  const onDragEnd = (data: LinkSocial[]) => {
    const oldSocials = [...socials!];
    setLink({ key: "socials", value: data });

    try {
      updateSocials(data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while sorting socials!");
      setLink({ key: "socials", value: oldSocials });
    }
  };

  return (
    socials && (
      <DashboardAccordion
        mainLabel={t("socials")}
        content="Link out to your various online profiles. Please paste the full urls to your profiles."
      >
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
