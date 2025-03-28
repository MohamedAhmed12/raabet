"use client";

import { cn } from "@/lib/cn";
import { useState } from "react";
import { LinkViewerTabs } from "./LinkViewerTabs";

export function LinkViewer() {
  const [selectedTab, setSelectedTab] = useState(0);
  const session = { name: "mohamed" };
  const handleOnClick = (i: number) => setSelectedTab(i);

  return (
    <div className="flex flex-col flex-1 items-center lg:px-[22px] lg:pb-[44px]">
      <LinkViewerTabs selectedTab={selectedTab} onclick={handleOnClick} />
      <div
        className={cn(
          "link-viewer-display-container flex flex-col flex-1 items-center w-full h-full",
          ""
        )}
      >
        <div
          id="dialog-container"
          className="flex justify-center h-full bg-green-400 w-[35vh] shadow-lg bg-white rounded-3xl border-3 border-[#333]"
        >
          <iframe
            src={`/${session.name}`}
            width="100%"
            height="100%"
            title="Embedded Content"
            frameBorder="0"
            className="rounded-3xl"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
