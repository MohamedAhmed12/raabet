"use client";

import "./style.css"; // TO DO: conditionally import it only in links page

import { MainLinkComponent } from "@/app/[locale]/[username]/components/MainLinkComponent";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { cn } from "@/lib/utils";
import { useScroll } from "@reactuses/core";
import { useCallback, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import { LinkViewerTabs } from "./LinkViewerTabs";

export function LinkViewer() {
  const [selectedTab, setSelectedTab] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, y] = useScroll(containerRef, {
    throttle: 16,
  });

  const link = useLinkStore(useShallow((state) => state.link));

  const handleOnClick = useCallback((i: number) => setSelectedTab(i), []);

  return (
    link.id && (
      <div
        className={cn(
          "flex flex-col flex-1 gap-2 items-center h-[35%] p-[22px] overflow-auto",
          "lg:px-[22px] lg:h-full lg:overflow-hidden"
        )}
      >
        <LinkViewerTabs selectedTab={selectedTab} onclick={handleOnClick} />

        <div className="relative flex justify-center items-center h-full w-full">
          <div
            className={cn(
              "absolute top-0 rounded-3xl flex h-[565px] shadow-lg bg-white rounded-3xl border-3 border-[#333] rounded-[35px] overflow-hidden mt-1.5",
              "lg:w-[100%] lg:h-full",
              selectedTab == 0 && "lg:w-[64%] lg:max-w-[350px] h-[600px]"
            )}
          >
            <div
              ref={containerRef}
              className="link-viewer-container w-full"
              style={{ scrollBehavior: "smooth" }}
            >
              <MainLinkComponent link={link} isSticky={(y || 0) > 20} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
