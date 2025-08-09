import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

export const NotificationBanner = ({
  bgColor,
  children,
}: {
  bgColor: string;
  children: React.ReactNode;
}) => {
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);

  return (
    <div
      className={cn(
        "fixed z-2 flex items-center justify-center w-full h-[44px] font-semibold text-sm text-deep-blue-gray border-b-1 border-[#303030]",
        fontClass,
        bgColor
      )}
    >
      {children}
    </div>
  );
};
