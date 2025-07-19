"use client";

import { Block } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { z } from "zod";
import { validateBlock } from "../../../../../../types/block";
import { generateEmbedInfo } from "./MediaBlock/generateEmbedInfo";

export const AudioBlock = ({
  block,
  errors,
  onUpdateBlockProperty,
}: {
  block: Block;
  errors: z.ZodIssue[];
  onUpdateBlockProperty: (key: keyof Block, val: string) => void;
}) => {
  const [inputUrl, setInputUrl] = useState(block.url || "");

  const t = useTranslations("LinksPage.generalStyles.blocks");
  const mediaUrlError = errors?.find((error) => error.path?.includes("url"));

  const handleUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    setInputUrl(url);

    if (!url) {
      onUpdateBlockProperty("url", "");
      return;
    }

    onUpdateBlockProperty("url", url);
    const isValidUrl = validateBlock(block, block.type);

    if (!isValidUrl) {
      return;
    }

    try {
      // Try to generate embed info
      const embedInfo = await generateEmbedInfo(url);
      if (embedInfo) {
        onUpdateBlockProperty("title", embedInfo.title);
        onUpdateBlockProperty("url", embedInfo.src);
      }
    } catch (error) {
      console.error("Error processing URL:", error);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto space-y-4 p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("AudioBlock.mediaUrl")}
          </label>
          <input
            type="text"
            value={inputUrl}
            onChange={handleUrlChange}
            placeholder={t("AudioBlock.mediaUrlPlaceholder")}
            className={`w-full p-2 border rounded border-gray-300`}
          />
        </div>
        {mediaUrlError && (
          <p className="text-red-500 text-sm mt-2">
            {t(`errors.${mediaUrlError.message}`)}
          </p>
        )}
        {/* <div>
          <label className="block text-sm font-medium mb-1">Tag</label>
          <input
            type="text"
            onChange={(e) => onUpdateBlockProperty("title", e.target.value)}
            placeholder="Tag"
            className="w-full p-2 border rounded"
          />
        </div> */}
      </div>
    </div>
  );
};
