"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import CardStyles from "./components/CardStyles";
import GeneralStyles from "./components/GeneralStyles";
import HeaderStyles from "./components/HeaderStyles";
import SocialsAndSharing from "./components/SocialsAndSharing";

export default function GeneralStylesSidebar() {
  return (
    <div
      className={cn(
        "font-noto-sans font-medium !bg-white w-full border-1 border-l-[#d3d3d3] p-[22px] pb-15 max-h-max",
        "md:overflow-y-auto md:w-[360px] md:max-h-[100vh]"
      )}
    >
      <GeneralStyles />
      <Separator className="my-[22px]" />
      <HeaderStyles />
      <Separator className="my-[22px]" />
      <CardStyles />
      <Separator className="my-[22px]" />
      <SocialsAndSharing/>
    </div>
  );
}
