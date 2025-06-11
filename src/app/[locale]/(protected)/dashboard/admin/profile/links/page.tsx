"use client";

import { useIsScreenWidthLessThan } from "@/hooks/use-is-screen-width-less-than.ts";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { LinkViewer } from "./components/LinkViewer";
const LinkBuilderSidebar = dynamic(
  () => import("./components/LinkBuilderSidebar/page"),
  { ssr: false }
);
const GeneralStylesSidebar = dynamic(
  () => import("./components/GeneralStylesSidebar/page"),
  { ssr: false }
);
const SmallScreenTabs = dynamic(() => import("./components/SmallScreenTabs"), {
  ssr: false,
});

export default function ProfileLinks() {
  const hideGeneralStylesSidebar = useIsScreenWidthLessThan(1200) ?? true;
  const hideLinkBuilderSidebar = useIsScreenWidthLessThan(800) ?? true;
  const smallScreen = useIsScreenWidthLessThan(800) ?? false;

  return (
    <div
      className={cn(
        "flex flex-col w-full justify-between h-screen max-h-full overflow-scroll",
        "md:flex-row md:overflow-hidden"
      )}
    >
      {/* large screen UI (sidebars) */}
      {!hideLinkBuilderSidebar && <LinkBuilderSidebar />}
      <LinkViewer />
      {!hideGeneralStylesSidebar && <GeneralStylesSidebar />}

      {/* small screen (tabs)  */}
      {smallScreen && <SmallScreenTabs />}
    </div>
  );
}
