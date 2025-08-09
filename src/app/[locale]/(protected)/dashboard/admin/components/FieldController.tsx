import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { getFontClassClient } from "@/lib/fonts";
import { useLocale } from "next-intl";

export const FieldController = ({
  title,
  children,
  titleIcon,
}: Readonly<{
  title?: string;
  children: React.ReactNode;
  titleIcon?: React.ReactNode;
}>) => {
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);

  return (
    <Card className={cn("mt-4", fontClass)}>
      {title && (
        <CardHeader
          className={cn("flex flex-row gap-0", titleIcon && "justify-between")}
        >
          <CardTitle className="flex capitalize font-semibold items-center">
            {title}
          </CardTitle>

          {titleIcon}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
};
