"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { cn } from "@/lib/cn";
import { useEffect, useState } from 'react';
import { generateEmbedInfo } from "../../(protected)/dashboard/admin/profile/links/components/LinkBuilderSidebar/Blocks/components/CreateUpdateBlockForm/components/MediaBlock/generateEmbedInfo";
import useLinkStyles from "../hooks/useLinkStyles";

export default function LinksBlocks() {
  const [embedInfoMap, setEmbedInfoMap] = useState<Record<string, { title: string; src: string } | null>>({});
  const link = useLinkStore((state) => state.link);
  const linkStyles = useLinkStyles(link);

  useEffect(() => {
    const fetchEmbedInfo = async () => {
      const updatedMap: Record<string, { title: string; src: string } | null> = {};
      
      for (const block of link?.blocks || []) {
        if (block.type === 'audio' || block.type === 'video') {
          try {
            const info = await generateEmbedInfo(block.url);
            updatedMap[block.id] = info || null;
          } catch (error) {
            console.error(`Error fetching embed info for block ${block.id}:`, error);
            updatedMap[block.id] = null;
          }
        }
      }

      setEmbedInfoMap(updatedMap);
    };

    fetchEmbedInfo();
  }, [link?.blocks]);

  return (
    link?.blocks && (
      <div className="block-icons-container flex flex-col mt-[31px] justify-center items-center flex-wrap font-noto-sans">
        {link?.blocks?.map((block) =>
          ["audio", "video"].includes(block.type) && block.url && block.id ? (
            <div className="w-full aspect-video py-4" key={block.id}>
              {embedInfoMap[block.id] && (
                <iframe
                  src={embedInfoMap[block.id]?.src}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="media-embed"
                />
              )}
            </div>
          ) : (
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
                    "text-center text-[1em] font-medium leading-[1.3em] mb-1.5 break-words",
                    link?.title_font
                  )}
                  style={{ maxWidth: "100%", wordBreak: "break-word" }}
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
          )
        )}
      </div>
    )
  );
}
