"use client";

import { useLinkStore } from "@/app/store/use-link-store";
import { cn } from "@/lib/cn";
import { LinksAvatar } from "./LinksAvatar";

export function LinksHeader() {
  const { link, setLink } = useLinkStore((state) => state);

  const handleToggleCollapseBio = () => {
    setLink({
      header_styles_collapse_long_bio: !link.header_styles_collapse_long_bio,
    });
  };
  return (
    <div className="flex flex-col items-center mb-[33px]">
      <div className="flex flex-col w-full items-center justify-center">
        <LinksAvatar />
        <div
          className={cn(
            "mt-2 text-md capitalize text-[#6B5B71]",
            link.title_font && `${link.title_font}`
          )}
        >
          {link?.user?.name}
        </div>

        {/* bio */}
        <h2
          className={cn(
            "text-[#6B5B71] font-normal text-[13px] leading-[1.3] max-w-[300px] mt-[33px]",
            link.text_font && `${link.text_font}`,
            link.header_styles_collapse_long_bio && "line-clamp-3 "
          )}
          onClick={handleToggleCollapseBio}
        >
          {link.bio}
        </h2>

        {/* blocks */}
        <div className="blocks-container"></div>
      </div>
    </div>
  );
}
