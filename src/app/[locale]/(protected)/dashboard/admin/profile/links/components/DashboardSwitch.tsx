import { Switch } from "@/components/ui/switch";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { HelperTooltip } from "../../../components/HelperTooltip";
import { LinksPageFieldLabel } from "./LinksPageFieldLabel";

export const DashboardSwitch = ({
  label,
  checked,
  tooltipContent,
  onCheckedChange,
}: Readonly<{
  label?: string;
  checked: boolean | undefined;
  tooltipContent?: string | React.ReactNode;
  onCheckedChange: (checked: boolean) => void;
}>) => {
  const locale = useLocale();
  // Initialize from prop once; then local state is the source of truth
  const [isChecked, setIsChecked] = useState<boolean>(() => !!checked);

  // Sync local state with prop changes
  useEffect(() => {
    setIsChecked(!!checked);
  }, [checked]);

  const handleChange = (value: boolean) => {
    setIsChecked(value);
    onCheckedChange(value);
  };
  return (
    <div className="dashboard-general-style-controller">
      <span className="flex gap-2 justify-center items-center">
        {tooltipContent && <HelperTooltip content={tooltipContent} />}
        <LinksPageFieldLabel>{label}</LinksPageFieldLabel>
      </span>
      <Switch
        id="show-deleted"
        dir={locale == "ar" ? "rtl" : "ltr"}
        checked={isChecked}
        thumbClassName={
          locale == "ar"
            ? "data-[state=checked]:translate-x-[calc(-100%+2px)] data-[state=unchecked]:translate-x-0"
            : ""
        }
        onCheckedChange={handleChange}
        className="cursor-pointer"
      />
    </div>
  );
};
