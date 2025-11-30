import { getTranslations } from "next-intl/server";
import { ContentSection } from "../ContentSection";
import Image from "next/image";

export const GroupBlock = async () => {
  const t = await getTranslations("HomePage");
  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-full">
      <div className="relative w-full md:flex-1/2 !min-h-full">
        <Image
          src="/images/links-page-preview.png"
          alt="third Section"
          width={650}
          height={650}
        />
      </div>
      <ContentSection
        titleLabel={t("groupBlock.titleLabel")}
        coloredLabel={t("groupBlock.coloredLabel")}
        mainLabel={t("groupBlock.mainLabel")}
        buttonLabel={t("moreFeatures")}
        underlineColor="bg-[#feeb96]"
        widthClass="w-[80%]"
        className="w-full"
        redirectUrl="/pricing"
      />
    </div>
  );
};
