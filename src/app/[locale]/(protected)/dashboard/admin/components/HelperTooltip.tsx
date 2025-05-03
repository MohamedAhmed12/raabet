import { CustomTooltip } from "@/components/CustomTooltip";
import { Icon } from "@/components/Icon";

export function HelperTooltip({
  content,
}: Readonly<{
  content: React.ReactNode;
}>) {
  return (
    <CustomTooltip
      trigger={
        <Icon
          name="circle-help"
          sizeClass="sm"
          className="text-[#097cd4] cursor-help"
        />
      }
      content={content}
    />
  );
}
