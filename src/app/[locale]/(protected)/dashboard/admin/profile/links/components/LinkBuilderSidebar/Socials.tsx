"use client";

import {LinkSocial, useLinkStore} from "@/app/[locale]/store/use-link-store";
import {useTranslations} from "next-intl";
import {toast} from "sonner";
import {createSeparator} from "../../actions/createSeparator";
import {updateSocials} from "../../actions/updateSocials";
import DashbaordSortableList from "../DashbaordSortableList";
import {AddSocialDialog} from "../DashbaordSortableList/AddSocialDialog";
import {SocialSortableItem} from "../DashbaordSortableList/SocialSortableItem";
import {DashboardAccordion} from "../DashboardAccordion";

export const Socials = () => {
  const t = useTranslations("LinksPage.generalStyles");
  const socials = useLinkStore((state) => state.link.socials);
  const setLink = useLinkStore((state) => state.setLink);

  const handleAddSeparator = async () => {
    const linkId = useLinkStore.getState().link.id;
    if (!linkId) {
      toast.error("Missing link ID");
      return;
    }

    const result = await createSeparator(linkId);

    if (result.success && result.socials) {
      const currentLink = useLinkStore.getState().link;
      // @ts-expect-error: [will unify social type in store and prisma schem]
      setLink({...currentLink, socials: result.socials});
    } else {
      toast.error(result.error || "Failed to add separator");
    }
  };

  const onDragEnd = async (data: LinkSocial[]) => {
    const oldSocials = [...socials!];
    setLink({
      socials: data,
    });

    try {
      await updateSocials(data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while sorting socials!");
      setLink({
        socials: oldSocials,
      });
    }
  };

  return (
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
  );
};
