"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { ShareBtn } from "@/components/ShareBtn";
import { Copy } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

export const MainHeaderSection = () => {
  const link = useLinkStore(useShallow((state) => state.link));

  const url = link?.qrcodes?.[0]?.url || "";

  return (
    <div className="flex justify-between h-[55px] px-[22px] py-[11px]">
      <div className="flex items-center justify-between gap-2">
        <Copy size={15} />

        <a
          href={url}
          target="_blank"
          title={url}
          className="!max-w-[220px] text-dashboard-primary underline text-sm truncate"
        >
          {url}
        </a>
      </div>
      <ShareBtn link={link} />
    </div>
  );
};
