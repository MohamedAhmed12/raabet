"use client";

import { Link, useLinkStore } from "@/app/store/use-link-store";
import { Icon } from "@/components/Icon";
import { DashbaordSortableList } from "../DashbaordSortableList/page";
import { DashboardAccordion } from "../DashboardAccordion";

export const Socials = () => {
  const handleAddSeparator = () => {};
  const handleSocial = () => {};

  return (
    <DashboardAccordion
      mainLabel="Socials"
      content="Link out to your various online profiles. Please paste the full urls to your profiles."
    >
      <DashbaordSortableList />
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
