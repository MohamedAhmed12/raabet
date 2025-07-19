import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { memo } from "react";

function CustomTooltipComponent({
  trigger,
  content,
}: Readonly<{
  trigger: React.ReactNode;
  content: React.ReactNode;
}>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent color="gray" className="max-w-[280px] font-noto-sans">
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

CustomTooltipComponent.displayName = "CustomTooltip";

export const CustomTooltip = memo(CustomTooltipComponent);
