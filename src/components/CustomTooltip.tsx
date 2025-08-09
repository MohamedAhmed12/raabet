import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { memo } from "react";

function CustomTooltipComponent({
  trigger,
  content,
}: Readonly<{
  trigger: React.ReactNode;
  content: React.ReactNode;
}>) {
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);

  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent color="gray" className={cn("max-w-[280px]", fontClass)}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

CustomTooltipComponent.displayName = "CustomTooltip";

export const CustomTooltip = memo(CustomTooltipComponent);
