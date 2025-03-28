"use client";

import { useIsScreenWidthLessThan } from "@/hooks/use-is-screen-width-less-than.ts";

export default function GeneralStylesSidebar() {
  const showSidebar = !useIsScreenWidthLessThan(1200);

  return (
    showSidebar && (
      <div
        className="font-noto-sans font-medium !bg-white w-[373px] hidden lg:block border-1 border-l-[#d3d3d3]"
        side="right"
      >
        GeneralStylesSidebar
      </div>
    )
  );
}
