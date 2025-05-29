import { useTranslations } from "next-intl";
import { ContentSection } from "../ContentSection";
import { WhyUsBlock } from "./components/whyUsBlock";

export const WhyUs = () => {
  const t = useTranslations("HomePage");

  return (
    <div className="flex flex-col md:flex-row items-stretch w-full">
      <ContentSection
        titleLabel={t("WhyUs.titleLabel")}
        coloredLabel={t("WhyUs.coloredLabel")}
        mainLabel={t("WhyUs.mainLabel")}
        buttonLabel={t("getStarted")}
        underlineColor="bg-[#7ed0ff]"
        widthClass="w-[600px]"
        className="w-full md:w-1/2 py-8 border-t-[#1d1d28]"
        redirectUrl="/Signup"
      />

      <WhyUsBlock />
    </div>
  );
};
