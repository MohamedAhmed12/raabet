"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { cn } from "@/lib/cn";
import { useState } from "react";
import QRCodeDialog from "./QRCodeDialog";
import { useShallow } from "zustand/react/shallow";

export function LinksHeader() {
  const [collapseBio, setCollapseBio] = useState<boolean>(true);
  const link = useLinkStore(useShallow(state => state.link));

  const handleToggleCollapseBio = () => {
    setCollapseBio((prev) => !prev);
  };
  return (
    <div className="flex flex-col items-center mb-[33px] text-current">
      <div className="flex flex-col w-full items-center justify-center">
        <QRCodeDialog />
        <div
          className={cn(
            "mt-2 text-md capitalize",
            link.title_font && `${link.title_font}`
          )}
        >
          {link?.displayname}
        </div>
        {/* bio */}
        <h2
          className={cn(
            "font-normal text-[13px] leading-[1.3] max-w-[300px] mt-[31px] break-words",
            link.text_font && `${link.text_font}`,
            link.header_styles_collapse_long_bio &&
              collapseBio &&
              "line-clamp-3",
            link.header_styles_collapse_long_bio && "cursor-pointer"
          )}
          onClick={handleToggleCollapseBio}
        >
          {link.bio}
        </h2>
      </div>
    </div>
  );
}
