"use client";

import { useState } from "react";
import { Block } from "@prisma/client";
import { generateEmbedInfo } from "./MediaBlock/generateEmbedInfo";

export const AudioBlock = ({
  block,
  onUpdateBlockProperty,
}: {
  block: Block;
  onUpdateBlockProperty: (key: keyof Block, val: string) => void;
}) => {
  const [error, setError] = useState("");
  const [inputUrl, setInputUrl] = useState(block.url || "");

  const handleUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setInputUrl(url);

    // Clear error when typing
    setError("");

    try {
      // Try to generate embed info
      const info = await generateEmbedInfo(url);
      console.log("embed info", info);

      // Only update block properties if we have valid embed info
      if (info) {
        onUpdateBlockProperty("title", info.title);
        onUpdateBlockProperty("url", url);
      }
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto space-y-4 p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Media URL</label>
          <input
            type="text"
            value={inputUrl}
            onChange={handleUrlChange}
            placeholder="Paste your media URL"
            className="w-full p-2 border rounded"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tag</label>
          <input
            type="text"
            onChange={(e) => onUpdateBlockProperty("title", e.target.value)}
            placeholder="Tag"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};
