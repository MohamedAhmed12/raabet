"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Blocks } from "./Blocks";
import { Header } from "./Header";
import { MainHeaderSection } from "./MainHeaderSection";
import { Socials } from "./Socials";

export default function LinkBuilderSidebar() {
  return (
    <div
      className={cn(
        "font-noto-sans font-medium !bg-white w-full border-1 border-r-[#d3d3d3] max-h-max",
        "md:w-[330px] md:overflow-y-auto md:max-h-[100vh]"
      )}
    >
      <MainHeaderSection />
      <Separator />
      <div className="px-[22px] pt-6 pb-18.5">
        <Header />
        <Socials />
        <Blocks />
      </div>
    </div>
  );
}
