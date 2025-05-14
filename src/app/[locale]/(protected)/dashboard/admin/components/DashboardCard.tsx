import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {HelperTooltip} from "./HelperTooltip";
import {cn} from "@/lib/utils";

export const DashboardCard = ({
  hasHelperTooltip = false,
  HelperTooltipContent,
  children,
  headerContent,
  title,
  className,
}: {
  hasHelperTooltip?: boolean;
  HelperTooltipContent?: React.ReactNode;
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  title: string;
  className?: string;
}) => {
  return (
    <Card className={cn("p-0 font-noto-sans", className)}>
      <CardHeader className="p-0 ">
        <CardTitle
          className="flex justify-between w-full font-normal text-[14px] text-center dashboard-general-style-controller text-deep-blue-gray bg-[#fafafa] !mb-0 !rounded-t-xl !rounded-b-none"
          style={{borderWidth: 0, borderBottomWidth: 1}}
        >
          <span className="flex justify-center items-center gap-2 ">
            {hasHelperTooltip && (
              <HelperTooltip content={HelperTooltipContent} />
            )}
            <span className="capitalize font-medium">{title}</span>
          </span>

          {headerContent}
        </CardTitle>
      </CardHeader>

      <CardContent className="py-3 px-[11px]">{children}</CardContent>
    </Card>
  );
};
