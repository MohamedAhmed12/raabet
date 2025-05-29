import { useLocale, useTranslations } from "next-intl";
import { Claim } from "../Claim";
import { cn } from "@/lib/utils";

export const ContentSection = () => {
  const t = useTranslations("HomePage.TryNow");
  const locale = useLocale();
  const isArabic = locale === "ar";
  return (
    <div className="flex flex-col flex-1 md:flex-1/2 font-noto-sans py-8 px-[7vw]">
      <div
        className={cn(
          "text-[64px] text-deep-blue-gray font-extrabold leading-[1.1] text-center",
          isArabic ? "lg:text-right" : "lg:text-left",
        )}
      >
        <span className="min-w-full mr-4 capitalize">{t("tryRabbet")}</span>
        <span className="relative">
          <span className="relative inline-block z-[1]">{t("now")}!</span>
          <div className="absolute inset-0 top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%] bg-white"></div>
        </span>
      </div>

      <Claim />
    </div>
  );
};
