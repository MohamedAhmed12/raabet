"use client";

import { Separator } from "@/components/ui/separator";
import CardStyles from "./components/CardStyles";
import GeneralStyles from "./components/GeneralStyles";
import HeaderStyles from "./components/HeaderStyles";

export default function GeneralStylesSidebar() {
  return (
    <div className="font-noto-sans font-medium !bg-white w-[360px] border-1 border-l-[#d3d3d3] p-[22px] pb-15 max-h-[100vh] overflow-y-autdddddddddddddddddddddddo">
      <GeneralStyles />
      <Separator className="my-[22px]" />
      <HeaderStyles />
      <Separator className="my-[22px]" />
      <CardStyles />
    </div>
  );
}
