import { Slider } from "@/components/ui/slider";
import { LinksPageFieldLabel } from "./LinksPageFieldLabel";

export const DashboardSlider = ({
  label,
  defaultValue,
  max,
  step,
  onValueChange,
  onValueCommit,
}: Readonly<{
  label?: string;
  defaultValue?: number[] | undefined;
  max?: number | undefined;
  step?: number | undefined;
  onValueChange: (value: number) => void;
  onValueCommit: (value: number) => void;
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
