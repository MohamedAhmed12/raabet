import { iconNameType } from "@/assets/icons";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import React, { MouseEventHandler, ReactNode } from "react";

interface LinksNavbarIconProps {
  isSticky: Boolean;
  iconName: iconNameType;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const LinksNavbarIcon: React.FC<LinksNavbarIconProps> = ({
  isSticky = false,
  iconName,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer",
        isSticky &&
          `pointer-events-auto backdrop-blur-md shadow-[0px_0px_20px_2px_rgba(0,0,0,0.1)] rounded-[22.5px] h-[45px] w-[45px] bg-[rgba(0,0,0,0.25)] flex items-center justify-center`,
        className
      )}
    >
      <Icon
        size={21}
        name={iconName}
        className={cn(!isSticky ? "stroke-[#6b5b71]" : "stroke-white")}
      />
    </div>
  );
};
