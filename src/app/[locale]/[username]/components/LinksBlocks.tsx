"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { cn } from "@/lib/cn";
import { Block } from "@prisma/client";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  EmbedInfo,
  generateEmbedInfo,
} from "../../(protected)/dashboard/admin/profile/links/components/LinkBuilderSidebar/Blocks/components/CreateUpdateBlockForm/components/MediaBlock/generateEmbedInfo";
import { useIframeClickTracker } from "../hooks/useIframeClickTracker";
import { useIncrementBlockClicks } from "../hooks/useIncrementBlockClicks";
import useLinkStyles from "../hooks/useLinkStyles";

type EmbedBlock = Block & Partial<EmbedInfo>;

export default function LinksBlocks() {
  const [blocksWithEmbedInfo, setBlocksWithEmbedInfo] = useState<EmbedBlock[]>(
    []
  );
  const link = useLinkStore(useShallow((state) => state.link));
  const linkStyles = useLinkStyles(link);

  const { mutateAsync: incrementBlockClicks } = useIncrementBlockClicks();

  const handleBlockClick = (id: string) => {
    const block = blocksWithEmbedInfo.find((b) => b.id === id);

    // make click analytics per block only once per mount/refresh
    if (!block || block.clicked) return;

    setBlocksWithEmbedInfo((prevBlocks) =>
      prevBlocks.map((b) => (b.id === block.id ? { ...b, clicked: true } : b))
    );
    incrementBlockClicks(id);
  };

  useIframeClickTracker(handleBlockClick);

  useEffect(() => {
    if (!link?.blocks?.length) {
      setBlocksWithEmbedInfo([]);
      return;
    }

    let cancelled = false;

    const fetchEmbedInfo = async () => {
      const blocksWithEmbedInfo = await Promise.all<EmbedBlock>(
        (link.blocks || []).map(async (rawBlock): Promise<EmbedBlock> => {
          const block = { ...rawBlock, clicked: false };

          // Only process audio/video blocks
          if (block.type !== "audio" && block.type !== "video") {
            return block;
          }

          try {
            const embedInfo = await generateEmbedInfo(block.url);
            return { ...block, ...embedInfo };
          } catch (error) {
            console.error("Error generating embed info:", error);
            return block;
          }
        })
      );

      if (!cancelled) {
        setBlocksWithEmbedInfo(blocksWithEmbedInfo);
      }
    };

    fetchEmbedInfo();

    return () => {
      cancelled = true;
    };
  }, [link?.blocks]);

  return (
    blocksWithEmbedInfo && (
      <div className="block-icons-container flex flex-col mt-[31px] justify-center items-center flex-wrap font-noto-sans">
        {blocksWithEmbedInfo?.map((block) => {
          if (["audio", "video"].includes(block.type)) {
            return (
              <div className="w-full aspect-video py-4" key={block.id}>
                <div className="w-full h-full">
                  <iframe
                    src={block.src || ""}
                    className="w-full h-full"
                    data-block-id={block.id}
                  />
                </div>
              </div>
            );
          }

          const BlockWrapper = block?.url ? "a" : "div";

          return (
            <BlockWrapper
              key={block.id}
              className="flex flex-col items-center justify-center w-full relative"
              style={{
                marginBottom: `${
                  11 + 33 * (link.card_styles_card_spacing || 0)
                }px`,
                textDecoration: "none",
                color: "inherit",
                cursor: block?.url ? "pointer" : "default",
              }}
              href={block?.url || undefined}
              target={block?.url ? "_blank" : undefined}
              rel={block?.url ? "noopener noreferrer" : undefined}
              onClick={() => handleBlockClick(block.id)}
            >
              {link.card_styles_design == 4 && (
                <div
                  className="absolute h-full w-full top-0 left-0"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.04) -5px -5px 13px inset, rgba(0, 0, 0, 0.15) 5px 5px 13px inset",
                    borderRadius: linkStyles.borderRadius,
                  }}
                ></div>
              )}
              <div
                className="flex flex-col items-center justify-center w-full py-[16.5px] px-[13.75px] w-full"
                style={{ ...linkStyles, color: block.custom_text_color }}
              >
                <div
                  className={cn(
                    "text-center text-[1em] font-medium leading-[1.3em] mb-1.5 break-words",
                    link?.title_font
                  )}
                  style={{ maxWidth: "100%", wordBreak: "break-word" }}
                  dangerouslySetInnerHTML={{ __html: block.title }}
                />
                <div
                  className={`${link?.text_font} text-[12.6px] leading-[1.3em]`}
                >
                  {block.text}
                </div>
              </div>
            </BlockWrapper>
          );
        })}
      </div>
    )
  );
}
