import {Switch} from "@/components/ui/switch";
import {useLocale} from "next-intl";
import {HelperTooltip} from "../../../components/HelperTooltip";
import {LinksPageFieldLabel} from "./LinksPageFieldLabel";

export const DashboardSwitch = ({
  label,
  checked,
  tooltipContent,
  onCheckedChange,
}: Readonly<{
  label?: string;
  checked: boolean | undefined;
  tooltipContent?: string |React.ReactNode;
  onCheckedChange: (checked: boolean) => void;
}>) => {
  const locale = useLocale();
  return (
    <div className="dashboard-general-style-controller">
      <span className="flex gap-2 justify-center items-center">
        {tooltipContent && <HelperTooltip content={tooltipContent} />}
        <LinksPageFieldLabel>{label}</LinksPageFieldLabel>
      </span>
      <Switch
        id="show-deleted"
        dir={locale == "ar" ? "rtl" : "ltr"}
        checked={checked}
        thumbClassName={
          locale == "ar"
            ? "data-[state=checked]:translate-x-[calc(-100%+2px)] data-[state=unchecked]:translate-x-0"
            : ""
        }
        onCheckedChange={onCheckedChange}
        className="cursor-pointer"
      />
    </div>
  );
};
