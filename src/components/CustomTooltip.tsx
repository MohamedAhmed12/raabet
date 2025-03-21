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
  // console.log('conten',content);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent color="gray" className="max-w-[280px]">{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
