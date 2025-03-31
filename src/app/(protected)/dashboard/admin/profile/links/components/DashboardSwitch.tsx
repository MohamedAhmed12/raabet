import { CustomTooltip } from "@/components/CustomTooltip";
import { Icon } from "@/components/Icon";
import { Switch } from "@/components/ui/switch";

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
      <CustomTooltip
        trigger={
          <Icon
            name="circle-help"
            sizeClass="sm"
            className="text-[#097cd4] cursor-help"
          />
        }
        content={tooltipContent}
      />

      <div className="text-sm mr-[22px] capitalize">{label}</div>
    </span>
    <Switch
      id="show-deleted"
      checked={checked}
      onCheckedChange={onCheckedChange}
      className="cursor-pointer"
    />
  </div>
);
