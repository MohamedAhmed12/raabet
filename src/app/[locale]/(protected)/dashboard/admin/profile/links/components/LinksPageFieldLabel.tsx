import {cn} from "@/lib/utils";
import {useLocale} from "next-intl";

export const LinksPageFieldLabel = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  const locale = useLocale();
  return (
    <div
      className={cn(
        "text-[13px] capitalize",
        className,
        locale == "ar" ? "ml-[8px]" : "mr-[8px]"
      )}
    >
      {children}
    </div>
  );
};
