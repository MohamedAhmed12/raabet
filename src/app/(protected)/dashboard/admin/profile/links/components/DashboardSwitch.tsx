import { Switch } from "@/components/ui/switch";
import { HelperTooltip } from "../../../components/HelperTooltip";

export const DashboardSwitch = ({
  label,
  checked,
  tooltipContent,
  onCheckedChange,
}: Readonly<{
  label?: string;
  checked: boolean;
  tooltipContent?: string;
  onCheckedChange: (checked: boolean) => void;
}>) => (
  <div className="dashboard-general-style-controller">
    <span className="flex gap-2 justify-center items-center">
      <HelperTooltip content={tooltipContent} />
      <div className="text-[13px] mr-[22px] capitalize">{label}</div>
    </span>
    <Switch
      id="show-deleted"
      checked={checked}
      onCheckedChange={onCheckedChange}
      className="cursor-pointer"
    />
  </div>
);
