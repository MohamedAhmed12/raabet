"use client";

import {LinkSocial, useLinkStore} from "@/app/store/use-link-store";
import {Icon} from "@/components/Icon";
import {toast} from "sonner";
import {updateSocials} from "../../actions/updateSocials";
import {DashbaordSortableList} from "../DashbaordSortableList/page";
import {SocialSortableItem} from "../DashbaordSortableList/SocialSortableItem";
import {DashboardAccordion} from "../DashboardAccordion";

export const Socials = () => {
  const socials = useLinkStore((state) => state.link.socials);
  const setLink = useLinkStore((state) => state.setLink);

  const handleAddSeparator = () => {};
  const handleSocial = () => {};
  const onDragEnd = async (data: LinkSocial[]) => {
    const oldSocials = [...socials!];
    setLink({
      socials: data,
    });

    try {
      await updateSocials(data);
    } catch (error) {
      toast.error("Something went wrong while sorting socials!");
      setLink({
        socials: oldSocials,
      });
    }
  };

  return (
    <DashboardAccordion
      mainLabel="Socials"
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
        <button
          className="dashboard-general-style-controller w-full !justify-center !m-0 capitalize text-ms text-center !font-medium cursor-pointer"
          onClick={handleSocial}
        >
          add social
          <Icon name="link" size={13} className="ml-2" strokeWidth="3" />
        </button>
        <button
          className="dashboard-general-style-controller w-full !justify-center !m-0 capitalize text-ms text-center !font-medium cursor-pointer"
          onClick={handleAddSeparator}
        >
          add separator
        </button>
      </div>
    </DashboardAccordion>
  );
};
