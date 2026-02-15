"use client";

import { Link } from "@/app/[locale]/store/use-link-store";
import { animationVariants } from "@/constants/animations";
import { cn } from "@/lib/cn";
import { getFontClassClient } from "@/lib/fonts";
import { getCssColor } from "@/lib/linkColorUtils";
import { Block, Link as PrismaLink } from "@prisma/client";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Image from "next/image";
import { EmbedInfo } from "../../(protected)/dashboard/admin/profile/links/components/LinkBuilderSidebar/Blocks/components/CreateUpdateBlockForm/components/MediaBlock/generateEmbedInfo";
import { BlockTextAlign } from "../../types/block";
import { useIframeClickTracker } from "../hooks/useIframeClickTracker";
import { useIncrementBlockClicks } from "../hooks/useIncrementBlockClicks";
import useLinkStyles from "../hooks/useLinkStyles";
import { MapBlockEmbed } from "./MapBlockEmbed";

type EmbedBlock = Block & Partial<EmbedInfo>;

type LinkWithBlocks = (Link | PrismaLink) & { blocks?: Block[] };

/**
 * Calculates the overlay shadow for block designs
 * - Design 4: Returns inset shadow
 * - Design 0 with soft shadow: Returns soft shadow (will be combined with hard shadow from useLinkStyles)
 */
function getOverlayShadow(link: Link | PrismaLink): string | null {
  const cardShadow = link.card_styles_card_shadow || 0;

  if (link.card_styles_design == 4) {
    return "rgba(0, 0, 0, 0.04) -5px -5px 13px inset, rgba(0, 0, 0, 0.15) 5px 5px 13px inset";
  }

  if (link.card_styles_design == 0) {
    if (cardShadow === 0) {
      return null;
    }
    
    if (link.general_styles_soft_shadow) {
      return `${cardShadow * 6.3}px ${cardShadow * 7}px ${
        18 + cardShadow * 6
      }px 0px rgba(0, 0, 0, ${0.25 + cardShadow * 0.12})`;
    } else {
      return `rgba(0, 0, 0) ${cardShadow * 6.3}px ${cardShadow * 7}px 0px 0px`;
    }
  }

  return null;
}

export default function LinksBlocks({ link }: { link: Link | PrismaLink }) {
  const allBlocks = (link as LinkWithBlocks).blocks;
  // Filter out hidden blocks from public view
  const blocks = allBlocks?.filter((block) => !((block as any) as Block & { hidden?: boolean }).hidden);

  const locale = useLocale();
  const fontClass = getFontClassClient(locale);
  const linkStyles = useLinkStyles(link);
  const { mutateAsync: incrementBlockClicks } = useIncrementBlockClicks();

  const handleBlockClick = (id: string) => {
    const block: EmbedBlock | undefined = blocks?.find((b) => b.id === id);

    // make click analytics per block only once per mount/refresh
    if (!block || block.clicked) return;

    block.clicked = true;

    incrementBlockClicks({ id, linkId: link.id });
  };

  useIframeClickTracker(handleBlockClick);

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

  return (
    blocks && (
      <div
        className={cn(
          "block-icons-container flex flex-col justify-center items-center flex-wrap",
          fontClass
        )}
      >
        {blocks?.map((block) => {
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
          const overlayShadow = getOverlayShadow(link);

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
                position: overlayShadow
                  ? "relative"
                  : link.card_styles_design === 4
                    ? "relative"
                    : "unset",
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
              {overlayShadow && (
                <div
                  className="absolute h-full w-full top-0 left-0"
                  style={{
                    boxShadow: overlayShadow,
                    borderRadius: linkStyles.borderRadius,
                  }}
                ></div>
              )}

              <div
                className="flex items-center justify-center w-full h-full min-h-[60px]"
                style={{
                  ...linkStyles,
                  color: getCssColor(
                    block?.custom_text_color || link?.card_styles_text_color
                  ),
                  textAlign: block.text_align as BlockTextAlign,
                }}
                dir={block.text_align === "right" ? "rtl" : "ltr"}
              >
                {block.type === "image" ? (
                  <Image
                    src={block.bg_image}
                    width={60}
                    height={60}
                    alt="image"
                    className="object-cover w-full h-full max-h-[160px]"
                    style={{
                      borderRadius: linkStyles.borderRadius,
                    }}
                  />
                ) : block.type === "map" ? (
                  <MapBlockEmbed
                    url={block.url!}
                    title={block.title}
                    blockId={block.id}
                    borderRadius={linkStyles.borderRadius}
                  />
                ) : (
                  <>
                    {hasPrefixImage && (
                      <div className="relative flex-shrink-0 w-1/3 min-h-[100px] max-h-[160px] flex">
                        <Image
                          src={block.bg_image}
                          fill
                          alt="image"
                          style={{
                            borderRadius: linkStyles.borderRadius,
                          }}
                        />
                      </div>
                    )}
                    <div
                      className={cn(
                        "flex flex-col justify-center px-4 py-2 w-2/3 overflow-hidden",
                        "text-container flex flex-col flex-2 px-6.5 py-4 overflow-hidden",
                        hasPrefixImage && "py-0",
                        !hasPrefixImage && "items-center",
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
                          "line-clamp-3 font-semibold",
                          hasPrefixImage ? "line-clamp-2" : "text-center",
                          link?.title_font
                        )}
                        style={{
                          color: getCssColor(
                            link?.card_styles_label_color ||
                              link?.general_styles_primary_text_color
                          ) || "inherit",
                        }}
                        dangerouslySetInnerHTML={{ __html: block.title }}
                      />
                      <div
                        className={cn(
                          "text-[12.6px] leading-[1.3em] line-clamp-3",
                          hasPrefixImage ? "line-clamp-2" : "text-center",
                          link?.text_font
                        )}
                        style={{
                          color: getCssColor(
                            link?.card_styles_text_color ||
                              link?.general_styles_primary_text_color
                          ) || "inherit",
                        }}
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
