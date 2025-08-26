"use client";

import { Separator } from "@/components/ui/separator";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { Blocks } from "./Blocks";
import { Header } from "./Header";
import { MainHeaderSection } from "./MainHeaderSection";
import { Socials } from "./Socials";

export default function LinkBuilderSidebar() {
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);

  return (
    <div
      className={cn(
        "font-medium !bg-white w-full border-1 border-r-[#d3d3d3] max-h-max",
        "lg:w-[330px] lg:overflow-y-auto lg:max-h-[100vh]",
        fontClass
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
