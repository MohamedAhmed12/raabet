import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { Claim } from "../Claim";

export const ContentSection = () => {
  const t = useTranslations("HomePage.TryNow");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const fontClass = getFontClassClient(locale);

  return (
    <div
      className={cn(
        "flex flex-col flex-1 md:flex-1/2 py-8 px-[7vw]",
        fontClass
      )}
    >
      <div
        className={cn(
          "text-[45px] lg:text-[64px] text-deep-blue-gray font-extrabold leading-[1.1] text-center",
          isArabic ? "lg:text-right" : "lg:text-left"
        )}
      >
        <span className="min-w-full me-4 capitalize">{t("tryRabet")}</span>
        <span className="relative">
          <span className="relative inline-block z-[1]">{t("now")}!</span>
          <div
            className={cn(
              "absolute inset-0 left-[-3%] right-[-3%] bg-white",
              locale === "ar"
                ? "top-[1em] bottom-[0.4em]"
                : "top-[0.85em] bottom-[0.15em]"
            )}
          ></div>
        </span>
      </div>

      <Claim />
    </div>
  );
};
