"use client";

import "../LinkViewer/style.css";

import useFetchLink from "@/app/[locale]/[username]/useFetchLink";
import { MainLinkComponent } from "@/app/[locale]/[username]/components/MainLinkComponent";
import { cn } from "@/lib/utils";
import { useScroll } from "@reactuses/core";
import { useSession } from "next-auth/react";
import { useCallback, useRef, useState } from "react";
import { LinkViewerTabs } from "../LinkViewer/LinkViewerTabs";

/**
 * ProfileLinksViewer component - Displays link preview for editing
 * Uses React Query cache for data
 */
export function ProfileLinksViewer() {
  const [selectedTab, setSelectedTab] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const session = useSession();
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, y] = useScroll(containerRef, { throttle: 16 });

  // @ts-expect-error: session user structure
  const userId = session?.data?.user?.id?.id as string;

  // Get link data from React Query cache
  const { data: link } = useFetchLink({ userId });

  const handleOnClick = useCallback((i: number) => setSelectedTab(i), []);

  // Don't render if no link data
  if (!link?.id) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col flex-1 gap-2 items-center h-[35%] p-[22px] overflow-auto",
        "lg:px-[22px] lg:h-full lg:overflow-hidden"
      )}
    >
      <LinkViewerTabs selectedTab={selectedTab} onclick={handleOnClick} />

      <div className="relative flex justify-center items-center h-full w-full">
        <div
          ref={containerRef}
          className={cn(
            "absolute top-0 rounded-3xl flex h-[565px] shadow-lg bg-white rounded-3xl border-3 border-[#333] rounded-[35px] overflow-hidden mt-1.5 overflow-y-auto",
            "md:w-[100%] md:h-full",
            selectedTab == 0 && "md:w-[64%] md:max-w-[500px] h-[600px]"
          )}
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="min-h-screen w-full">
            <MainLinkComponent link={link} isSticky={(y || 0) > 20} />
          </div>
        </div>
      </div>
    </div>
  );
}
