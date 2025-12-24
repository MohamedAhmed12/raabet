"use client";

import { Separator } from "@/components/ui/separator";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import type { Link } from "@/app/[locale]/store/use-link-store";
import CardStyles from "./components/CardStyles";
import GeneralStyles from "./components/GeneralStyles";
import HeaderStyles from "./components/HeaderStyles";
import SocialsAndSharing from "./components/SocialsAndSharing";

export default function GeneralStylesSidebar() {
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);
  
  // Get link from React Query - subscribe to updates
  const session = useSession();
  // @ts-expect-error: [to access user data in session it exists in id]
  const userId = session?.data?.user?.id?.id as string;
  
  const { data: linkRaw } = useQuery<Link>({
    queryKey: ["link", { userId, username: undefined }],
    enabled: false, // Don't fetch - just subscribe to cache updates
  });

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
