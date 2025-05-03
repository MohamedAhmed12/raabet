"use client";

import { Separator } from "@/components/ui/separator";
import { useIsScreenWidthLessThan } from "@/hooks/use-is-screen-width-less-than.ts";
import { Blocks } from "./Blocks/page";
import { Header } from "./Header";
import { MainHeaderSection } from "./MainHeaderSection";
import { Socials } from "./Socials";
export default function LinkBuilderSidebar() {
  const showSidebar = !useIsScreenWidthLessThan(800);

  return (
    showSidebar && (
      <div className="font-noto-sans font-medium !bg-white w-[330px] border-1 border-r-[#d3d3d3] max-h-[100vh] overflow-y-auto">
        <MainHeaderSection />
        <Separator />
        <div className="px-[22px] pt-6 pb-18.5">
          <Header />
          <Socials />
          <Blocks />
        </div>
      </div>
    )
  );
}
