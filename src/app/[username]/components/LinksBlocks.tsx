"use client";

import {cardDesigns} from "@/app/(protected)/dashboard/admin/profile/links/components/GeneralStylesSidebar/constants";
import {useLinkStore} from "@/app/store/use-link-store";
import {cn} from "@/lib/cn";

export default function LinksBlocks() {
  const link = useLinkStore((state) => state.link);

  const selectedDesignClass = cardDesigns.find(
    (d) => parseInt(d.value) === link?.card_styles_design
  )?.className;

  return (
    link?.blocks && (
      <div className="block-icons-container flex flex-col mt-[31px] justify-center items-center flex-wrap font-noto-sans">
        {link?.blocks.map((block) => (
          <a
            key={block.id}
            className={cn(
              `flex flex-col items-center justify-center w-full py-[16.5px] px-[13.75px] cursor-pointer mb-2.5 bg-[#d5cfd8] ${selectedDesignClass}`
            )}
            style={{
              color: link?.card_styles_text_color,
              borderRadius: link?.card_styles_card_corner * 28 || 5,
              backgroundColor: link?.card_styles_card_color,
              border: `${
                (link?.card_styles_card_border_width || 0) * 6
              }px  solid ${link?.card_styles_card_border_color}`,
              boxShadow: `0 0 ${(link?.card_styles_card_shadow || 0) * 10}px ${
                (link?.card_styles_card_shadow || 0) / 10
              }px`,
              margin: `${11 + 2 * (link?.card_styles_card_spacing || 0)}px 0px`,
            }}
            target="_blank"
          >
            <div
              className={cn(
                "text-[1em] font-medium leading-[1.3em] mb-1.5",
                link?.title_font
              )}
            >
              {block.title}
            </div>
            <div className={`${link?.text_font} text-[12.6px] leading-[1.3em]`}>
              {block.text}
            </div>
          </a>
        ))}
      </div>
    )
  );
}
