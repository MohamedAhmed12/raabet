import Image from "next/image";
import { plans } from "../../../../public/data/plans";

export const FeaturesCard = () => {
  return (
    <div className="hidden lg:flex flex-col min-w-[450px] w-[450px] border-l-1 border-deep-blue-gray bg-gray-100 font-noto-sans shadow-[8px_8px_0px_#1d1d28] rounded-bl-[20px]">
      <Image
        className="h-[400.9px] w-full bg-[#7ed0ff] bg-center bg-contain bg-no-repeat border-deep-blue-gray"
        style={{
          backgroundImage:
            'url("/images/plan-features-card.png")',
        }}
        src="/images/plan-features-card.png"
        fill
        alt="pricing_bg"
      />

      {plans[0].sections.map((section) => (
        <div key={section.title}>
          <div
            key={section.title}
            className="flex items-center pl-8 h-[80px] space-y-3 border-y-1 border-deep-blue-gray last:border-0 text-2xl font-bold"
          >
            {section.title}
          </div>

          {section.features.map((feature, i) => (
            <div
              key={i}
              className="flex items-center pl-8 h-[64px] space-y-3 not-last:border-b-1 not-last:border-deep-blue-gray"
            >
              {feature.text}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
