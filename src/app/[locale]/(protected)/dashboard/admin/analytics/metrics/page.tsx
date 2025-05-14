"use client";

import CustomDropdown from "@/components/CustomDropdown";
import { useTranslations } from "next-intl";
import { MainTitle } from "../../profile/settings/components/MainTitle";
import { BlockInteractions } from "./components/BlockInteractions";
import ProfileAnalytics from "./components/ProfileAnalytics/page";
import { SocialClicks } from "./components/SocialClicks";

const dateDropdown = ["lastWeek", "lastMonth", "lastYear", "allTime"];

export default function Analyticsmetrics() {
  const t = useTranslations("Analytics.Metrics");
  const onSelect = (e: number) => {
    console.log(e);
  };

  return (
    <div className="w-full max-w-[1000px]">
      <MainTitle title={t("title")} subTitle={t("subTitle")}></MainTitle>

      <CustomDropdown onSelect={(e) => onSelect(e)} items={dateDropdown} />
      <ProfileAnalytics />
      <SocialClicks />
      <BlockInteractions />
    </div>
  );
}
