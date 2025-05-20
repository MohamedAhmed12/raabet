"use client";

import { cn } from "@/lib/utils";
import { plans } from "../../../../../public/data/plans";
import { FeaturesList } from "./FeaturesList";
import { MobileFeaturesList } from "./MobileFeaturesList";

export const PlansCard = () => {
  return (
    <div className="flex flex-col lg:flex-row font-noto-sans">
      {plans.map((plan, i) => (
        <div
          key={plan.name}
          className={cn(
            "relative border-1 border-deep-blue-gray rounded-b-[20px] shadow-none lg:shadow-[8px_8px_0px_#1d1d28]",
            "lg:rounded-b-none",
            "z-[2] mb-5 lg:mb-0 lg:rounded-br-[20px]"
          )}
        >
          {/* Most popular banner */}
          {i == 0 && (
            <div className="flex items-center justify-center h-[50px] bg-light-orange border rounded-t-[20px] border-[#1d1d28] shadow-none lg:shadow-[8px_8px_0px_#1d1d28] absolute top-[-50px] left-[-1px] right-[-1px] font-bold">
              Most Popular
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
              {plan.name}
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
              <span className="text-base mt-2">USD per month</span>
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
              Try Free For 14 Days
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
