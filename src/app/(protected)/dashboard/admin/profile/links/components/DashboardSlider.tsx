import { Slider } from "@/components/ui/slider";

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
}>) => (
  <div className="dashboard-general-style-controller">
    <div className="text-sm mr-[22px] capitalize">{label}</div>
    <Slider
      defaultValue={defaultValue}
      max={max}
      step={step}
      className="w-[130px] cursor-grab active:cursor-grabbing"
      progressbarcolor="bg-dashboard-primary"
      onValueChange={(val) => onValueChange(val[0])}
    />
  </div>
);
