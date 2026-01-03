"use client";

import type { Link as LinkFromTypes } from "@/app/[locale]/types/link";
import { Separator } from "@/components/ui/separator";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useGetLink } from "../../hooks/useUpdateLink";
import CardStyles from "./components/CardStyles";
import GeneralStyles from "./components/GeneralStyles";
import HeaderStyles from "./components/HeaderStyles";
import SocialsAndSharing from "./components/SocialsAndSharing";

export default function GeneralStylesSidebar() {
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);
  const getLink = useGetLink();

  // Get link from cache using the new getLink method
  // Type assertion needed because child components expect Link from types/link
  const linkRaw = getLink() as LinkFromTypes | undefined;

  return (
    <div
      className={cn(
        "font-medium !bg-white w-full border-1 border-l-[#d3d3d3] p-[22px] pb-15 max-h-max",
        "lg:overflow-y-auto lg:max-h-[100vh]",
        fontClass
      )}
    >
      <GeneralStyles linkRaw={linkRaw} />
      <Separator className="my-[22px]" />
      <HeaderStyles linkRaw={linkRaw} />
      <Separator className="my-[22px]" />
      <CardStyles linkRaw={linkRaw} />
      <Separator className="my-[22px]" />
      <SocialsAndSharing linkRaw={linkRaw} />
    </div>
  );
}
