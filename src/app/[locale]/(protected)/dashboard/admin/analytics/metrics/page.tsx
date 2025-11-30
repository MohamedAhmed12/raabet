"use client";

import CustomDropdown from "@/components/CustomDropdown";
import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { MainTitle } from "../../profile/settings/components/MainTitle";
import { BlockInteractions } from "./components/BlockInteractions";
import ProfileAnalytics from "./components/ProfileAnalytics";
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
  const totalBlockClicks = useMemo(() => {
    return (
      data?.blocks?.reduce((sum, block) => {
        return sum + (block._count?.analytics || 0);
      }, 0) || 0
    );
  }, [data]);

  // Calculate total analytics for socials
  const totalSocialClicks = useMemo(() => {
    return (
      data?.socials?.reduce((sum, social) => {
        return sum + (social._count?.analytics || 0);
      }, 0) || 0
    );
  }, [data]);

  return isLoading ? (
    <div className="flex h-screen justify-center items-center">
      <LoaderCircle className="animate-spin" size={45} />
    </div>
  ) : (
    <div className="w-full max-w-[1000px] py-11">
      <MainTitle title={t("title")} subTitle={t("subTitle")}></MainTitle>

      <CustomDropdown
        initialSelected={dateRange}
        onSelect={(e) => onSelect(e)}
        items={dateDropdown}
      />
      <ProfileAnalytics
        profileViews={data?.profileViews?.length || 0}
        blockClicks={totalBlockClicks}
        socialClicks={totalSocialClicks}
        chartData={data?.dateStats}
      />
      <SocialClicks data={data?.socials} />
      <BlockInteractions
        data={data?.blocks || []}
        profileViews={data?.profileViews?.length || 0}
      />
    </div>
  );
}
