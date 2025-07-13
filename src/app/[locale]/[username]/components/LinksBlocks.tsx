"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { animationVariants } from "@/constants/animations";
import { cn } from "@/lib/cn";
import { Block } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { EmbedInfo } from "../../(protected)/dashboard/admin/profile/links/components/LinkBuilderSidebar/Blocks/components/CreateUpdateBlockForm/components/MediaBlock/generateEmbedInfo";
import { BlockTextAlign } from "../../types/block";
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
    incrementBlockClicks({ id, linkId: link.id });
  };

  useIframeClickTracker(handleBlockClick);

  const fetchEmbedInfo = useCallback(
    async (cancelled: boolean) => {
      const blocksWithEmbedInfo = await Promise.all<EmbedBlock>(
        (link.blocks || []).map(
          async (rawBlock): Promise<EmbedBlock> => ({
            ...rawBlock,
            clicked: false,
          })
        )
      );

      if (!cancelled) {
        setBlocksWithEmbedInfo(blocksWithEmbedInfo);
      }
    },
    [link?.blocks]
  );

  async function downloadFile(url: string) {
    const res = await fetch(url, { mode: "cors" });
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = url.split("/").pop()!;
    a.click();
    URL.revokeObjectURL(blobUrl);
  }

  useEffect(() => {
    if (!link?.blocks?.length) {
      setBlocksWithEmbedInfo([]);
      return;
    }

    let cancelled = false;

    fetchEmbedInfo(cancelled);

    return () => {
      cancelled = true;
    };
  }, [link?.blocks, fetchEmbedInfo]);

  return (
    blocksWithEmbedInfo && (
      <div className="block-icons-container flex flex-col mt-[31px] justify-center items-center flex-wrap font-noto-sans">
        {blocksWithEmbedInfo?.map((block) => {
          if (["audio", "video"].includes(block.type)) {
            return (
              <div className="w-full aspect-video py-4" key={block.id}>
                <div className="w-full h-full">
                  <iframe
                    src={block.url || ""}
                    className="w-full h-full"
                    data-block-id={block.id}
                  />
                </div>
              </div>
            );
          }
          const isLink = !!block?.url;
          const BlockComponent = isLink ? motion.a : motion.div;
          const animation = block.animation || "none";
          const shouldAnimate = animation !== "none";
          const hasPrefixImage = block.layout === "2" && block.bg_image;
          const hasBgImage = block.layout === "3" && block.bg_image;

          return (
            <BlockComponent
              key={block.id}
              className="flex items-center w-full max-h-[160px]"
              style={{
                marginBottom: `${
                  11 + 33 * (link.card_styles_card_spacing || 0)
                }px`,
                textDecoration: "none",
                color: "inherit",
                cursor: isLink ? "pointer" : "default",
                transformOrigin: "center",
              }}
              href={isLink ? block.url : undefined}
              target={isLink ? "_blank" : undefined}
              rel={isLink ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                handleBlockClick(block.id);
                if (block.type === "file") {
                  e.preventDefault();
                  downloadFile(block.url);
                }
              }}
              animate={shouldAnimate ? animation : {}}
              variants={animationVariants as any}
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
                className="flex items-center justify-center w-full"
                style={{
                  ...linkStyles,
                  color:
                    block?.custom_text_color || link?.card_styles_text_color,
                  textAlign: block.text_align as BlockTextAlign,
                }}
                dir={block.text_align === "right" ? "rtl" : "ltr"}
              >
                {block.type}
                {block.type === "image" ? (
                  <Image
                    src={block.bg_image}
                    width={60}
                    height={60}
                    alt="preview"
                    className="object-cover w-full h-full max-h-[160px]"
                  />
                ) : (
                  <>
                    {hasPrefixImage && (
                      <div className="flex-shrink-0 w-1/3">
                        <Image
                          src={block.bg_image}
                          width={60}
                          height={60}
                          alt="preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div
                      className={cn(
                        "flex flex-col px-4 py-2 w-2/3 overflow-hidden",
                        "text-container flex flex-col flex-2 px-6.5 py-4 overflow-hidden",
                        hasPrefixImage && "py-0",
                        hasBgImage && "relative bg-cover bg-center"
                      )}
                      style={
                        hasBgImage
                          ? {
                              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${block.bg_image})`,
                            }
                          : {}
                      }
                    >
                      <div
                        className={cn(
                          "line-clamp-3",
                          hasPrefixImage && "line-clamp-2",
                          link?.title_font
                        )}
                        dangerouslySetInnerHTML={{ __html: block.title }}
                      />
                      <div
                        className={cn(
                          "text-[12.6px] leading-[1.3em] line-clamp-3",
                          hasPrefixImage && "line-clamp-2",
                          link?.text_font
                        )}
                      >
                        {block.description}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </BlockComponent>
          );
        })}
      </div>
    )
  );
}
