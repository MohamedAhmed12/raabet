import { FeaturesCard } from "./FeaturesCard";
import { PlansCard } from "./PlansCard";
import { PublicContainer } from "@/components/PublicContainer";
import { getLocale, getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

export default async function Pricing() { 
  const t = await getTranslations();
  const locale =await getLocale();

  return (
    <PublicContainer>
      <div className="flex flex-col px-[7vw] pb-16">
        <div className="flex flex-col justify-center items-center mt-16 font-noto-sans">
          <div
            className={cn(
              "flex flex-col justify-center items-center text-[2.9rem] leading-[.8] font-extrabold text-deep-blue-gray text-center mb-8 capitalize",
              "lg:flex-row gap-5 lg:text-[4.2rem]"
            )}
          >
            <span className="relative max-w-max">
              <span className="relative inline-block z-[4]">
                {t("Pricing.plans")}
              </span>
              <div
                className={cn(
                  "h-[17px] absolute inset-0 bottom-[0.15em] left-[-3%] right-[-3%] bg-light-orange z-[0]",
                  locale == "ar"
                    ? "top-[0.5em]"
                    : "top-[0.60em]",
                  "lg:h-[23px]"
                )}
              ></div>
            </span>
            <div className="flex gap-3">
              <span>{t("Shared.and")}</span>
              <span>{t("Shared.pricing")}</span>
            </div>
          </div>
          <span className="text-lg text-center max-w-[625px] mb-8">
            {t("Pricing.description")}
          </span>
        </div>
        <div className="flex justify-center mt-[50px]">
          <FeaturesCard />
          <PlansCard />
        </div>
      </div>
    </PublicContainer>
  );
}
