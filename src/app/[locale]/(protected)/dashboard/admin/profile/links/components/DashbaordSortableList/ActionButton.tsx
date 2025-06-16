import { iconNameType } from "@/assets/icons";
import { CustomTooltip } from "@/components/CustomTooltip";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import { memo, useMemo } from "react";

interface ActionButtonProps {
  icon: iconNameType;
  onClick: (e: React.MouseEvent) => void;
  content: string;
  className?: string;
  isLoading?: boolean;
}

const ActionButtonComponent = ({
  icon,
  onClick,
  content,
  className = "",
  isLoading = false,
}: ActionButtonProps) => {
  const trigger = useMemo(
    () => (
      <div onClick={onClick}>
        <Icon
          name={isLoading ? "loader-circle" : icon}
          sizeClass="sm"
          className={cn("cursor-pointer hover:bg-gray-100", className, {
            "animate-spin": isLoading,
          })}
        />
      </div>
    ),
    [isLoading, icon]
  );

  return <CustomTooltip trigger={trigger} content={content} />;
};

ActionButtonComponent.displayName = "ActionButton";

export const ActionButton = memo(ActionButtonComponent);
