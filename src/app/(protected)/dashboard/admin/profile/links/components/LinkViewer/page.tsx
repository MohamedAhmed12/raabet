"use client";

import {Link} from "@/app/store/use-link-store";
import {useEffect, useRef, useState} from "react";

import {LinkViewerTabs} from "./LinkViewerTabs";

import "./style.css"; // TO DO: conditionally import it only in links page

export function LinkViewer({link}: {link: Link}) {
  const [selectedTab, setSelectedTab] = useState(0);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // Check if iframeRef.current is not null
    if (iframeRef.current) {
      // Send the data to the iframe when it is loaded
      const iframeWindow = iframeRef.current.contentWindow;
      iframeWindow?.postMessage({type: "linkData", data: link}, "*"); // '*' allows any domain to receive the message
    }
  }, [link]);

  const handleOnClick = (i: number) => setSelectedTab(i);

  return (
    link.id && (
      <div className="flex flex-col flex-1 items-center lg:px-[22px] lg:pb-[35px]">
        <LinkViewerTabs selectedTab={selectedTab} onclick={handleOnClick} />

        <iframe
          ref={iframeRef}
          src={`/${link.userName}`}
          width="100%"
          height="100%"
          title="Embedded Content"
          className="link-viewer rounded-3xl flex h-[85%] w-[64%] max-w-[350px] shadow-lg bg-white rounded-3xl border-3 border-[#333] rounded-[35px]"
        ></iframe>
      </div>
    )
  );
}
