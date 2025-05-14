"use client";

import { cn } from "@/lib/utils";
import { plans } from "../../../../../public/data/plans";
import { FeaturesList } from "./FeaturesList";
import { MobileFeaturesList } from "./MobileFeaturesList";

export const PlansCard = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      {plans.map((plan, i) => (
        <div
          key={plan.name}
          className={cn(
            "relative border-1 border-deep-blue-gray rounded-b-[20px]",
            "lg:rounded-b-none",
            i == 0
              ? "shadow-none lg:shadow-[8px_8px_0px_#1d1d28] z-[2] mb-5 lg:mb-0"
              : "shadow-none lg:shadow-[8px_8px_0px_#1d1d28] rounded-[20px] lg:rounded-br-[20px]"
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
              <span className="text-5xl font-extrabold">${plan.price}</span>
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
