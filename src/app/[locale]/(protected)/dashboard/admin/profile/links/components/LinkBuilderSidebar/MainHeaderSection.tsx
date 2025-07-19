"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { Icon } from "@/components/Icon";
import { ShareBtn } from "@/components/ShareBtn";
import { useShallow } from "zustand/react/shallow";

export const MainHeaderSection = () => {
  const link = useLinkStore(useShallow((state) => state.link));

  return (
    <div className="flex justify-between h-[55px] px-[22px] py-[11px]">
      <div className="flex items-center justify-between gap-2">
        <Icon name="copy" size={15} />
        <a
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/${link.user?.fullname}`}
          target="_blank"
          className="text-dashboard-primary underline text-sm"
        >
          {`${process.env.NEXT_PUBLIC_BASE_URL_LABEL}/${link.user?.fullname}`}
        </a>
      </div>
      <ShareBtn />
    </div>
  );
};
