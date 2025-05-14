import {Slider} from "@/components/ui/slider";
import {LinksPageFieldLabel} from "./LinksPageFieldLabel";

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
  return (
    <div className="dashboard-general-style-controller">
      <LinksPageFieldLabel>{label}</LinksPageFieldLabel>
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
