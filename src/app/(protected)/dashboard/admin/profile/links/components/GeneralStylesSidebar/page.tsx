"use client";
import { useIsScreenWidthLessThan } from "@/hooks/use-is-screen-width-less-than.ts";
import { DashboardSliderimport } from "../DashboardSlider";
import HeaderStyles from "./HeaderStyles";
import { Separator } from "@/components/ui/separator";

export default function GeneralStylesSidebar() {
  const showSidebar = !useIsScreenWidthLessThan(1200);

  return (
    showSidebar && (
      <div className="font-noto-sans font-medium !bg-white w-[373px] hidden lg:block border-1 border-l-[#d3d3d3] p-[22px] pb-11">
        <div className="text-[.82rem] font-bold">General Styles</div>
        <Separator className="my-[22px]"/>
        <HeaderStyles />
      </div>
    )
  );
}
