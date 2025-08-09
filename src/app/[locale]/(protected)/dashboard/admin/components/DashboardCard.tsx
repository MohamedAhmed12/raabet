import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { HelperTooltip } from "./HelperTooltip";

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
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);

  return (
    <Card className={cn("p-0", className, fontClass)}>
      <CardHeader className="p-0 ">
        <CardTitle
          className="flex justify-between w-full font-normal text-[14px] text-center dashboard-general-style-controller text-deep-blue-gray bg-[#fafafa] !mb-0 !rounded-t-xl !rounded-b-none"
          style={{ borderWidth: 0, borderBottomWidth: 1 }}
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
