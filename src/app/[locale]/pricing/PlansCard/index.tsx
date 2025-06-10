"use client";

import { cn } from "@/lib/utils";
import { plans as enPlans, arPlans } from "../../../../../public/data/plans";
import { FeaturesList } from "./FeaturesList";
import { MobileFeaturesList } from "./MobileFeaturesList";
import { useLocale, useTranslations } from "next-intl";

export const PlansCard = () => {
  const locale = useLocale();
  const t = useTranslations();
  const plans = locale == "ar" ? arPlans : enPlans;

  return (
    <div className="flex flex-col lg:flex-row font-noto-sans">
      {plans.map((plan, i) => (
        <div
          key={plan.name}
          className={cn(
            "relative border-1 border-deep-blue-gray rounded-b-[20px] shadow-none",
            "lg:rounded-b-none",
            "z-[2] mb-5 lg:mb-0",
            locale == "ar"
              ? "lg:rounded-bl-[20px] lg:shadow-[-8px_8px_0px_#1d1d28]"
              : "lg:rounded-br-[20px] lg:shadow-[8px_8px_0px_#1d1d28]"
          )}
        >
          {/* Most popular banner */}
          {i == 0 && (
            <div
              className={cn(
                "flex items-center justify-center h-[50px] bg-light-orange border rounded-t-[20px] border-[#1d1d28] shadow-none absolute top-[-50px] left-[-1px] right-[-1px] font-bold",
                locale == "ar"
                  ? "lg:shadow-[-7px_8px_0px_#1d1d28]"
                  : "lg:shadow-[7px_8px_0px_#1d1d28]"
              )}
            >
              {t("Pricing.bestValue")}
            </div>
          )}
          {/* plan header  */}
          <div
            className={cn(
              "relative bg-white flex flex-col justify-center px-8 border-deep-blue-gray mt-8",
              "lg:h-[400.8px] lg:mt-0",
              i == 1 && "rounded-[20px] bg-white lg:bg-[#f8f8f8]"
            )}
          >
            <h2
              className={cn(
                "text-[32px] font-extrabold font-noto-sans",
                i == 0 ? "text-light-orange" : "text-[#d9acfd]"
              )}
              style={{
                WebkitTextStrokeWidth: "1px",
                WebkitTextStrokeColor: "#000",
                textShadow: "3px 3px 0px #1d1d28",
              }}
            >
              {/* {t(`Pricing.${plan.name}`)} */}
            </h2>
            <div className="flex flex-col mt-4 mb-8">
              <div className="flex items-end">
                <span className="relative inline-block text-4xl font-normal text-zinc-400">
                  {plan.originalPrice}
                  <span className="absolute left-[-10%] top-1/2 w-[130%] h-[2.5px] bg-zinc-400 transform -rotate-[30deg]"></span>
                </span>

                <span className="text-5xl font-bold mx-4">
                  {plan.discountPrice}
                </span>
              </div>
              <span className="text-base mt-2">{t("Pricing.pricePerMonth")}</span>
            </div>

            {/* <Separator /> */}

            <div className="text-sm text-deep-blue-gray opacity-70 my-6">
              {plan.description}
            </div>

            <button
              className={cn(
                "bg-deep-blue-gray text-white px-6 py-4 rounded-4xl font-bold leading-none"
              )}
            >
              {t("Pricing.freeTrial")}
            </button>
          </div>

          <FeaturesList
            plan={plan}
            bgColorClass={i == 0 ? "bg-white" : "lg:bg-[#f8f8f8]"}
          />
          <MobileFeaturesList plan={plan} />
        </div>
      ))}
    </div>
  );
};
