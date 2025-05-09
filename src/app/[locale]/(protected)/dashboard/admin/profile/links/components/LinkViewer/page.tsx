"use client";

import {Link} from "@/app/[locale]/store/use-link-store";
import {useEffect, useRef, useState} from "react";

import {LinkViewerTabs} from "./LinkViewerTabs";

import "./style.css"; // TO DO: conditionally import it only in links page
import {cn} from "@/lib/utils";

export function LinkViewer({link}: {link: Link}) {
  const [selectedTab, setSelectedTab] = useState(0);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // Check if iframeRef.current is not null
    if (iframeRef.current) {
      // Send the data to the iframe when it is loaded
      // const iframeWindow = iframeRef.current.contentWindow;
      // iframeWindow?.postMessage({type: "linkData", data: link}, "*"); // '*' allows any domain to receive the message
    }
  }, [link]);

  const handleOnClick = (i: number) => setSelectedTab(i);

  return (
    link.id && (
      <div
        className={cn(
          "flex flex-col flex-1 items-center h-[35%] p-[22px] overflow-scroll",
          "md:px-[22px] md:pb-[35px] md:h-full md:overflow-hidden"
        )}
      >
        <LinkViewerTabs selectedTab={selectedTab} onclick={handleOnClick} />

        <iframe
          ref={iframeRef}
          src={`/${link.userName}`}
          title="Embedded Content"
          className={cn(
            "link-viewer rounded-3xl flex h-[600px] min-h-[600px] shadow-lg bg-white rounded-3xl border-3 border-[#333] rounded-[35px] w-full",
            "md:w-[64%] md:max-w-[350px]"
          )}
        ></iframe>
      </div>
    )
  );
}
