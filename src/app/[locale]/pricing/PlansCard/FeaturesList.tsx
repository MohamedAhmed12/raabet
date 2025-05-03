import { cn } from "@/lib/utils";
import { Plan } from "../../../../public/data/plans";
import { TrueFalseIcon } from "./TrueFalseIcon";

export const FeaturesList = ({
  plan,
  bgColorClass,
}: {
  plan: Plan;
  bgColorClass: string;
}) =>
  plan.sections.map((section) => (
    <div
      key={section.title}
      className={cn("hidden lg:flex lg:flex-col", bgColorClass)}
    >
      <div className="h-[80px] border-y-1 border-deep-blue-gray"></div>

      {section.features.map(({ text, value }, i) => (
        <div
          key={i}
          className={cn(
            "flex h-[64px] items-center justify-center not-last:border-b-1 border-deep-blue-gray"
          )}
        >
          <TrueFalseIcon exist={value} />
        </div>
      ))}
    </div>
  ));
