import { getFontClass } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import { ContentSection } from "../ContentSection";
import { WhyUsBlock } from "./components/whyUsBlock";

export default async function WhyUs() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();
  const fontClass = await getFontClass(locale);

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-stretch w-full",
        fontClass
      )}
    >
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
        redirectUrl="/auth/sign-up"
      />

      <WhyUsBlock />
    </div>
  );
}
