import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {HelperTooltip} from "./HelperTooltip";

export const DashboardCard = ({
  HelperTooltipContent,
  children,
  headerContent,
  title,
}: {
  HelperTooltipContent: React.ReactNode;
  children: React.ReactNode;
  headerContent: React.ReactNode;
  title: string;
}) => {
  return (
    <Card className="p-0 font-noto-sans">
      <CardHeader className="p-0">
        <CardTitle className="flex justify-between w-full font-normal text-[14px] text-center dashboard-general-style-controller text-deep-blue-gray bg-[#fafafa] !mb-0">
          <span className="flex justify-center items-center gap-2 ">
            <HelperTooltip content={HelperTooltipContent} />
            {title}
          </span>

          {headerContent}
        </CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
};
