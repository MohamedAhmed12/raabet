import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import Image from "next/image";
import { plans } from "../../../../public/data/plans";

export const FeaturesCard = () => {
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);

  return (
    <div
      className={cn(
        "relative hidden lg:flex flex-col min-w-[450px] w-[450px] border-deep-blue-gray bg-gray-100",
        fontClass,
        locale === "ar"
          ? "border-r-1 shadow-[-8px_8px_0px_#1d1d28] rounded-br-[20px]"
          : "border-l-1 shadow-[8px_8px_0px_#1d1d28] rounded-bl-[20px]"
      )}
    >
      <Image
        className="h-[402px]"
        style={{
          backgroundImage: 'url("/images/plan-features-card.png")',
        }}
        src="/images/plan-features-card.png"
        height={410}
        width={450}
        alt="pricing_bg"
      />

      {plans[0].sections.map((section) => (
        <div key={section.title}>
          <div
            key={section.title}
            className={cn(
              "flex items-center h-[80px] space-y-3 border-y-1 border-deep-blue-gray last:border-0 text-2xl font-bold",
              locale === "ar" ? "pr-8" : "pl-8"
            )}
          >
            {section.title}
          </div>

          {section.features.map((feature, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center h-[64px] space-y-3 not-last:border-b-1 not-last:border-deep-blue-gray",
                locale === "ar" ? "pr-8" : "pl-8"
              )}
            >
              {feature.text}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
