"use client";

import { useIsScreenWidthLessThan } from "@/hooks/use-is-screen-width-less-than.ts";

export default function LinkBuilderSidebar() {
  const showSidebar = !useIsScreenWidthLessThan(800);

  return (
    showSidebar && (
      <div className="font-noto-sans font-medium !bg-white w-[373px] border-1 border-r-[#d3d3d3]">
        LinkBuilderSidebar
      </div>
    )
  );
}
