import { cn } from "@/lib/utils";

export const NotificationBanner = ({
  bgColor,
  children,
}: {
  bgColor: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "fixed z-2 flex items-center justify-center w-full h-[44px] font-semibold text-sm text-deep-blue-gray border-b-1 border-[#303030] font-noto-sans",
        bgColor
      )}
    >
      {children}
    </div>
  );
};
