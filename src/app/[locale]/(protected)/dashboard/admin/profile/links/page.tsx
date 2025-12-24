"use client";

import { useIsScreenWidthLessThan } from "@/hooks/use-is-screen-width-less-than.ts";
import { cn } from "@/lib/utils";
import { LinkViewer } from "./components/LinkViewer";
import LinkBuilderSidebar from "./components/LinkBuilderSidebar/page";
import GeneralStylesSidebar from "./components/GeneralStylesSidebar/page";
import SmallScreenTabs from "./components/SmallScreenTabs";

export default function ProfileLinks() {
  const hideGeneralStylesSidebar = useIsScreenWidthLessThan(1200, true);
  const hideLinkBuilderSidebar = useIsScreenWidthLessThan(1024, true);
  const smallScreen = useIsScreenWidthLessThan(1024, false);

  return (
    <div
      className={cn(
        "flex flex-col w-full justify-between h-screen max-h-full overflow-scroll",
        "lg:flex-row lg:overflow-hidden"
      )}
    >
      {/* large screen UI (sidebars) with fixed width wrappers to prevent shifting */}
      {!hideLinkBuilderSidebar && (
        <div className="w-full lg:w-[330px] flex-shrink-0">
          <LinkBuilderSidebar />
        </div>
      )}

      <LinkViewer />

      {!hideGeneralStylesSidebar && (
        <div className="w-full lg:w-[360px] flex-shrink-0">
          <GeneralStylesSidebar />
        </div>
      )}

      {/* small screen (tabs)  */}
      {smallScreen && <SmallScreenTabs />}
    </div>
  );
}
