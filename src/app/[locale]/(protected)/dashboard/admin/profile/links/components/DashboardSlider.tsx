import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

export const DashboardSlider = ({
  label,
  defaultValue,
  max,
  step,
  onValueChange,
}: Readonly<{
  label?: string;
  defaultValue?: number[] | undefined;
  max?: number | undefined;
  step?: number | undefined;
  onValueChange: (value: number) => void;
}>) => {
  const locale = useLocale();

  return (
    <div className="dashboard-general-style-controller">
      <div
        className={cn(
          "text-[13px] capitalize",
          locale == "ar" ? "ml-[22px]" : "mr-[22px]"
        )}
      >
        {label}
      </div>
      <Slider
        defaultValue={defaultValue}
        max={max}
        step={step}
        className="w-[124px] cursor-grab active:cursor-grabbing"
        progressbarcolor="bg-dashboard-primary"
        onValueChange={(val) => onValueChange(val[0])}
      />
    </div>
  );
};
