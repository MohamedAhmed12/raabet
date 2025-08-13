import { useTranslations } from "next-intl";
import { FeatureCard } from "./FeatureCard";

export const WhyUsBlock = () => {
  const t = useTranslations("HomePage.WhyUs.block");
  return (
    <div className="flex flex-col md:flex-row flex-wrap w-full md:w-1/2">
      <div className="w-full md:w-1/2">
        <FeatureCard
          src="/images/gears.png"
          alt="Customization"
          Title={t("1stCard.title")}
          label={t("1stCard.label")}
          className="bg-blue-200"
        />
      </div>
      <div className="w-full md:w-1/2">
        <FeatureCard
          src="/images/grids-types.png"
          alt="Powerfull"
          Title={t("2stCard.title")}
          label={t("2stCard.label")}
          className="bg-yellow-200"
        />
      </div>
      <div className="w-full md:w-1/2">
        <FeatureCard
          src="/images/payment-ticket.png"
          alt="affordable"
          Title={t("3stCard.title")}
          label={t("3stCard.label")}
          className="bg-orange-200"
        />
      </div>
      <div className="w-full md:w-1/2">
        <FeatureCard
          src="/images/team.png"
          alt="multi-Profile"
          Title={t("4stCard.title")}
          label={t("4stCard.label")}
          className="bg-red-200"
        />
      </div>
    </div>
  );
};
