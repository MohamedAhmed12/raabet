import { useLocale, useTranslations } from "next-intl";
import { ContentSection } from "../ContentSection";
import { WhyUsBlock } from "./components/whyUsBlock";
import { cn } from "@/lib/utils";

export const WhyUs = () => {
  const t = useTranslations("HomePage");
  const locale = useLocale();

  return (
    <div className="flex flex-col md:flex-row items-stretch w-full font-noto-sans">
      <ContentSection
        titleLabel={t("WhyUs.titleLabel")}
        coloredLabel={t("WhyUs.coloredLabel")}
        mainLabel={t("WhyUs.mainLabel")}
        buttonLabel={t("getStarted")}
        underlineColor="bg-[#7ed0ff]"
        widthClass="w-[600px]"
        className={cn(
          "w-full md:w-1/2 py-8",
          locale === "ar" ? "border-l-[#1d1d28]" : "border-t-[#1d1d28]"
        )}
        redirectUrl="/Signup"
      />

      <WhyUsBlock />
    </div>
  );
};
