import { useTranslations } from "next-intl";
import { ContentSection } from "../ContentSection";
import Image from "next/image";

export const GroubBlock = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-full">
      <div className="relative w-full md:flex-1/2 !min-h-full">
        <Image
          src="/images/links-page-preview.png"
          alt="third Section"
          width={650}
          height={650}
          
          // className="min-h-full w-full"
        />
      </div>
      <ContentSection
        titleLabel={t("groubBlock.titleLabel")}
        coloredLabel={t("groubBlock.coloredLabel")}
        mainLabel={t("groubBlock.mainLabel")}
        buttonLabel={t("moreFeatures")}
        underlineColor="bg-[#feeb96]"
        widthClass="w-[80%]"
        className="w-full"
        redirectUrl="/pricing"
      />
    </div>
  );
};
