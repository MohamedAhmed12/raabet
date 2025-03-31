import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CustomTooltip({
  trigger,
  content,
}: Readonly<{
  trigger: React.ReactNode;
  content: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent color="gray" className="max-w-[280px] font-noto-sans">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
