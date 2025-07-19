"use client";

import { memo, useCallback, useMemo } from "react";
import icons, { iconNameType } from "@/assets/icons";
import { cn } from "@/lib/utils";

type IconSize = "sm" | "md" | "lg";

interface IconProps {
  name: iconNameType;
  sizeClass?: IconSize;
  size?: number;
  className?: string;
  strokeWidth?: number | string;
  fontWeight?: number | string;
  fill?: string | undefined;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
}

const SIZE_MAP = {
  sm: { className: "!w-4 !h-4", size: 16 },
  md: { className: "!w-6 !h-6", size: 24 },
  lg: { className: "!w-8 !h-8", size: 32 },
} as const;

// Type guard to safely get an icon
const getSafeIcon = (name: iconNameType) => {
  const safeName = name in icons ? name : "alert-circle";
  return icons[safeName as keyof typeof icons];
};

const IconComponent = memo(
  ({
    name,
    sizeClass = "md",
    size: propSize,
    className = "",
    onClick,
    ...props
  }: IconProps) => {
    // Get the icon component, using a safe fallback
    const IconSvg = getSafeIcon(name);

    // Memoize the size calculations
    const { size, sizeClassName } = useMemo(() => {
      // If explicit size is provided, use it directly
      if (propSize) {
        return {
          size: propSize,
          sizeClassName: "", // Don't use sizeMap className when size is explicitly provided
        };
      }

      // Otherwise use sizeClass to get dimensions from SIZE_MAP
      const sizeConfig = SIZE_MAP[sizeClass] || SIZE_MAP.md;
      return {
        size: sizeConfig.size,
        sizeClassName: sizeConfig.className,
      };
    }, [propSize, sizeClass]);

    // Memoize the class names
    const iconClassName = useMemo(
      () => cn(sizeClassName, className),
      [sizeClassName, className]
    );

    // Memoize the click handler
    const handleClick = useCallback(
      (e: React.MouseEvent<SVGSVGElement>) => {
        if (onClick) {
          e.preventDefault();
          e.stopPropagation();
          onClick(e);
        }
      },
      [onClick]
    );

    // Don't render if the icon component is not found (shouldn't happen with our fallback)
    if (!IconSvg) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`Icon "${name}" not found`);
      }
      return null;
    }

    return (
      <IconSvg
        className={iconClassName}
        aria-hidden="true"
        size={size}
        onClick={onClick ? handleClick : undefined}
        {...props}
      />
    );
  }
);

// Add display name for better debugging
IconComponent.displayName = "Icon";

export { IconComponent as Icon };

// Re-export the icon name type for convenience
export type { iconNameType };
