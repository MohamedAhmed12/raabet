"use client";

import {useLinkStore} from "@/app/store/use-link-store";
import {cn} from "@/lib/cn";
import useLinkStyles from "../hooks/useLinkStyles";

export default function LinksBlocks() {
  const link = useLinkStore((state) => state.link);
  const linkStyles = useLinkStyles(link);

  return (
    link?.blocks && (
      <div className="block-icons-container flex flex-col mt-[31px] justify-center items-center flex-wrap font-noto-sans">
        {link?.blocks.map((block) => (
          <a
            key={block.id}
            className="flex flex-col items-center justify-center w-full cursor-pointer mb-6.5 relative"
            target="_blank"
          >
            {link.card_styles_design == 4 && (
              <div
                className="absolute h-full w-full top-0 left-0"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.04) -5px -5px 13px inset, rgba(0, 0, 0, 0.15) 5px 5px 13px inset",
                }}
              ></div>
            )}
            <div
              className=" flex flex-col items-center justify-center w-full py-[16.5px] px-[13.75px] w-full !m-0"
              style={linkStyles}
            >
              <div
                className={cn(
                  "text-[1em] font-medium leading-[1.3em] mb-1.5",
                  link?.title_font
                )}
              >
                {block.title}
              </div>
              <div
                className={`${link?.text_font} text-[12.6px] leading-[1.3em]`}
              >
                {block.text}
              </div>
            </div>
          </a>
        ))}
      </div>
    )
  );
}
