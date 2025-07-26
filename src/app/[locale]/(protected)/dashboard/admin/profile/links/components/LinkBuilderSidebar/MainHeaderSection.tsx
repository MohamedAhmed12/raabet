"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { Icon } from "@/components/Icon";
import { ShareBtn } from "@/components/ShareBtn";
import { useShallow } from "zustand/react/shallow";

export const MainHeaderSection = () => {
  const link = useLinkStore(useShallow((state) => state.link));

  const url = link?.qrcodes?.[0]?.url || "";
  const formatedUserName =
    url?.replace(`${process.env.NEXT_PUBLIC_BASE_URL}/ar/`, "") || "";

  return (
    <div className="flex justify-between h-[55px] px-[22px] py-[11px]">
      <div className="flex items-center justify-between gap-2">
        <Icon name="copy" size={15} />
        <a
          href={url}
          target="_blank"
          className="text-dashboard-primary underline text-sm"
        >
          {`${process.env.NEXT_PUBLIC_BASE_URL_LABEL}/${formatedUserName}`}
        </a>
      </div>
      <ShareBtn />
    </div>
  );
};
