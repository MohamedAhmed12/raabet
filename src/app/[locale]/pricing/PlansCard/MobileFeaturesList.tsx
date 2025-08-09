import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { Plan } from "../../../../../public/data/plans";
import { TrueFalseIcon } from "./TrueFalseIcon";

export const MobileFeaturesList = ({ plan }: { plan: Plan }) => {
  const locale = useLocale();
  const t = useTranslations();
  const fontClass = getFontClassClient(locale);

  return (
    <div className={cn("flex lg:hidden felx p-6 text-sm", fontClass)}>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="w-full justify-center items-center text-base text-center font-semibold text-deep-blue-gray">
            {t("Pricing.seeAllFeatures")}
          </AccordionTrigger>
          <AccordionContent>
            {plan.sections.map((section) => (
              <div key={section.title} className="w-full">
                <div className="w-full text-[18px] font-bold mt-8 mb-6">
                  {section.title}
                </div>
                {section.features.map(({ text, value }, i) => (
                  <div key={i} className={cn("flex items-center mb-6")}>
                    <TrueFalseIcon
                      exist={value}
                      className={locale == "ar" ? "ml-6" : "mr-6"}
                    />
                    <div className="capitalize text-sm">{text}</div>
                  </div>
                ))}
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
