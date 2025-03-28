"use client";

import CustomDropdown from "@/components/CustomDropdown";
import { MainTitle } from "../../components/MainTitle";
import { BlockInteractions } from "./components/BlockInteractions";
import {
  ProfileAnalytics
} from "./components/ProfileAnalytics/page";
import { SocialClicks } from "./components/SocialClicks";

const dateDropdown = ["last week", "last month", "last year", "all time"];

export default function Analyticsmetrics() {
  const onSelect = (e: number) => {
    console.log(e);
  };
  return (
    <>
      <MainTitle
        title="profile metrics"
        subTitle="Discover how visitors are viewing and interacting with your profile."
      ></MainTitle>

      <CustomDropdown onSelect={onSelect} items={dateDropdown} />
      <ProfileAnalytics />
      <SocialClicks />
      <BlockInteractions />
    </>
  );
}
