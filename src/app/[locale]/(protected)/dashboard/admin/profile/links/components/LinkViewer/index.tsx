"use client";

import "./style.css"; // TO DO: conditionally import it only in links page

import { useScroll } from "@reactuses/core";
import { useCallback, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { MainLinkComponent } from "@/app/[locale]/[username]/components/MainLinkComponent";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { cn } from "@/lib/utils";
import { LinkViewerTabs } from "./LinkViewerTabs";

export function LinkViewer() {
  const [selectedTab, setSelectedTab] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  // it does not work after removing x
  const [x, y] = useScroll(containerRef);
  const link = useLinkStore(
    useShallow((state) => ({
      id: state.link.id,
      general_styles_desktop_bgcolor: state.link.general_styles_desktop_bgcolor,
      general_styles_primary_text_color:
        state.link.general_styles_primary_text_color,
      general_styles_primary_bgcolor: state.link.general_styles_primary_bgcolor,
      general_styles_is_secondary_bgcolor:
        state.link.general_styles_is_secondary_bgcolor,
      general_styles_secondary_bgcolor:
        state.link.general_styles_secondary_bgcolor,
      social_enable_hide_raabet_branding:
        state.link.social_enable_hide_raabet_branding,
      social_custom_logo: state.link.social_custom_logo,
      social_custom_logo_size: state.link.social_custom_logo_size,
    }))
  );

  const handleOnClick = useCallback((i: number) => setSelectedTab(i), []);

  return (
    link.id && (
      <div
        className={cn(
          "flex flex-col flex-1 gap-2 items-center h-[35%] p-[22px] overflow-scroll",
          "md:px-[22px] md:h-full md:overflow-hidden"
        )}
      >
        <LinkViewerTabs selectedTab={selectedTab} onclick={handleOnClick} />

        <div className="relative flex justify-center items-center h-full w-full">
          <div
            className={cn(
              "absolute top-0 rounded-3xl flex h-[565px] max-h-[500px] shadow-lg bg-white rounded-3xl border-3 border-[#333] rounded-[35px] overflow-hidden mt-1.5",
              "md:w-[100%] md:h-full",
              selectedTab == 0 && "md:w-[64%] md:max-w-[350px] h-[600px]"
            )}
          >
            <div ref={containerRef} className="link-viewer-container w-full">
              <MainLinkComponent link={link} isSticky={y > 20} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
