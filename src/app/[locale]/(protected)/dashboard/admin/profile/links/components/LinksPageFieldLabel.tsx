import {cn} from "@/lib/utils";
import {useLocale} from "next-intl";

export const LinksPageFieldLabel = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const locale = useLocale();
  return (
    <div
      className={cn(
        "text-[13px] capitalize",
        locale == "ar" ? "ml-[22px]" : "mr-[22px]"
      )}
    >
      {children}
    </div>
  );
};
