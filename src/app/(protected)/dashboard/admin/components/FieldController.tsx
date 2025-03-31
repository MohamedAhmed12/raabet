import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/cn";

export const FieldController = ({
  title,
  children,
  titleIcon,
}: Readonly<{
  title?: string;
  children: React.ReactNode;
  titleIcon?: React.ReactNode;
}>) => (
  <Card className="mt-4 font-noto-sans">
    {title && (
      <CardHeader
        className={cn("flex flex-row", titleIcon && "justify-between")}
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
