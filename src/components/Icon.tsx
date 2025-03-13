import icons, { iconNameType } from "@/assets/icons";
import { cn } from "@/lib/utils";

type IconSize = "sm" | "md" | "lg";

interface IconProps {
  name: iconNameType;
  sizeClass?: IconSize;
  size?: number;
  className?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number | string;
  fontWeight?: number | string;
  fill?: string | undefined;
  onClick?: () => void;
}

const sizeMap = {
  sm: "w-4 h-4", // 16px
  md: "w-6 h-6", // 24px
  lg: "w-8 h-8", // 32px
};

export const Icon: React.FC<IconProps> = ({
  name,
  sizeClass = "md",
  size,
  className = "",
  onClick,
  ...props
}) => {
  const IconComponent = icons[name];
  const sizeClassName = !size && sizeMap[sizeClass];

  return (
    <IconComponent
      className={cn(`${sizeClassName} ${className}`)}
      aria-hidden="true"
      size={size}
      onClick={onClick}
      {...props}
    />
  );
};
