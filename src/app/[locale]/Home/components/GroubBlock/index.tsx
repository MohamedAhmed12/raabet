import { useTranslations } from "next-intl";
import {ContentSection} from "../ContentSection";
import {ImageSection} from "./ImageSection";

export const GroubBlock = () => {
    const t = useTranslations("HomePage");
  return (
    <div className="flex flex-col-reverse md:flex-row items-center w-full h-full">
      <ImageSection src="/images/links-page-preview.png" alt="third Section" />
      <ContentSection
        titleLabel={t("groubBlock.titleLabel")}
        coloredLabel={t("groubBlock.coloredLabel")}
        mainLabel={t("groubBlock.mainLabel")}
        buttonLabel={t("moreFeatures")}
        underlineColor="bg-[#feeb96]"
        widthClass="w-[80%] "
        className="w-full md:w-1/2 py-8"
        redirectUrl="/pricing"
      />
    </div>
  );
};
