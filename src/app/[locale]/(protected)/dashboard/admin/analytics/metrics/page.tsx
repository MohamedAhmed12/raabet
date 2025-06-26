"use client";

import CustomDropdown from "@/components/CustomDropdown";
import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { MainTitle } from "../../profile/settings/components/MainTitle";
import { BlockInteractions } from "./components/BlockInteractions";
import ProfileAnalytics from "./components/ProfileAnalytics/page";
import { SocialClicks } from "./components/SocialClicks";
import { useAnalyticsList } from "./hooks/useAnalyticsList";

const dateDropdown = ["lastWeek", "lastMonth", "lastYear", "allTime"];

export default function Analyticsmetrics() {
  const [dateRange, setDateRange] = useState(0);

  const t = useTranslations("Analytics.Metrics");
  const { data, isLoading } = useAnalyticsList(dateRange);

  const onSelect = (e: number) => {
    setDateRange(e);
  };

  // Calculate total analytics for blocks
  const totalBlockClicks =
    data?.blocks?.reduce((sum, block) => {
      return sum + (block._count?.analytics || 0);
    }, 0) || 0;

  // Calculate total analytics for socials
  const totalSocialClicks =
    data?.socials?.reduce((sum, social) => {
      return sum + (social._count?.analytics || 0);
    }, 0) || 0;

  return isLoading ? (
    <div className="flex h-screen justify-center items-center">
      <LoaderCircle className="animate-spin" size={45} />
    </div>
  ) : (
    <div className="w-full max-w-[1000px]">
      <MainTitle title={t("title")} subTitle={t("subTitle")}></MainTitle>

      <CustomDropdown
        initialSelected={dateRange}
        onSelect={(e) => onSelect(e)}
        items={dateDropdown}
      />
      <ProfileAnalytics
        profileViews={data?.profile_views || 0}
        blockClicks={totalBlockClicks}
        socialClicks={totalSocialClicks}
      />
      <SocialClicks data={data?.socials} />
      <BlockInteractions data={data?.blocks || []} />
    </div>
  );
}
