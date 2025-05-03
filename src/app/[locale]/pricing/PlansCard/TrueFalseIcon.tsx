import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

export const TrueFalseIcon = ({
  className,
  exist,
}: {
  className?: string;
  exist: boolean;
}) => (
  <div
    className={cn(
      "rounded-full p-[7px] shadow-[1.5px_1.5px_0px_#1d1d28] border-1 border-deep-blue-gray",
      exist ? "bg-[#75f0b8]" : "bg-[#fe96a2]",
      className
    )}
  >
    <Icon name={exist ? "check" : "x"} size={10} strokeWidth={5} />
  </div>
);
