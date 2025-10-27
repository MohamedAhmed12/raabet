import { Slider } from "@/components/ui/slider";
import { LinksPageFieldLabel } from "./LinksPageFieldLabel";

export const DashboardSlider = ({
  label,
  defaultValue,
  max,
  min,
  step,
  labelClassName,
  onValueChange,
  onValueCommit,
}: Readonly<{
  label?: string;
  defaultValue?: number[] | undefined;
  max?: number | undefined;
  min?: number | undefined;
  step?: number | undefined;
  labelClassName?: string;
  onValueChange: (value: number) => void;
  onValueCommit: (value: number) => void;
}>) => {
  return (
    <div className="dashboard-general-style-controller">
      <LinksPageFieldLabel className={labelClassName}>
        {label}
      </LinksPageFieldLabel>
      <Slider
        defaultValue={defaultValue}
        max={max}
        min={min}
        step={step}
        className="w-[120px] cursor-grab active:cursor-grabbing"
        progressbarcolor="bg-dashboard-primary"
        onValueChange={(val: number[]) => {
          onValueChange(val[0]);
        }}
        onValueCommit={(val: number[]) => {
          onValueCommit(val[0]);
        }}
      />
    </div>
  );
};
