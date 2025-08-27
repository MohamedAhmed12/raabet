"use client";

import { Prosbar } from "@/components/Prosbar";
import { Button } from "@/components/ui/button";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { reviews1, reviews2 } from "../../../../../../public/data/reviews";
import { ReviewsSlider } from "./ReviewsSlider";

export default function AnimatedBar() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);

  return (
    <>
      <Prosbar bgColorClass="bg-light-orange" />

      {/* Reviews Section */}
      <div
        className={cn(
          "relative flex flex-col justify-center items-center w-full overflow-hidden py-10 bg-[#D7A9FF] min-h-[825px]",
          fontClass
        )}
      >
        {/* Heading */}
        <div className="text-[45px] lg:text-[65px] text-deep-blue-gray font-bold leading-[1.1] mb-10">
          <h2>{t("AnimatedBar.review.people")}</h2>
          <span className="relative inline-block">
            <span className="relative z-[2]">
              {t("AnimatedBar.review.saying")}
            </span>
            <div
              className={cn(
                "absolute  left-[-2%] right-[-2%] bg-white z-[1]",
                locale == "ar"
                  ? "top-[0.65em] bottom-[0.05em]"
                  : "top-[0.67em] bottom-0"
              )}
            />
          </span>
          <span className="p-2">{t("AnimatedBar.review.aboutUs")}</span>
        </div>
        <div className="flex flex-col gap-2 min-h-[400px] lg:min-h-[475px] max-w-full">
          <ReviewsSlider reviews={reviews1} speed={15} />
          <ReviewsSlider reviews={reviews2} speed={25} />
        </div>
        <Button className="text-white px-7 py-6 rounded-4xl font-bold mt-10 bg-deep-blue-gray hover:bg-deep-blue-gray">
          {t("getStarted")}
        </Button>
      </div>
    </>
  );
}
