"use client";

import { Link } from "@/app/[locale]/store/use-link-store";
import { cn } from "@/lib/cn";
import { Link as PrismaLink } from "@prisma/client";
import Image from "next/image";
import { memo, useMemo } from "react";
import LinksBlocks from "./LinksBlocks";
import LinksFooter from "./LinksFooter";
import { LinksHeader } from "./LinksHeader";
import LinksNavbar from "./LinksHeader/LinksNavbar";
import LinksSocialIcons from "./LinksSocialIcons";

interface MainLinkComponentProps {
  link: Link | PrismaLink;
  isSticky: boolean;
  className?: string;
}

const MainLinkComponentContent = ({
  link,
  isSticky,
  className = "",
}: MainLinkComponentProps) => {
  const {
    size,
    bgType,
    primaryBgColor,
    gradientColor,
    gradientDirection,
    gradientOffset,
    isSecondaryBgColor,
    secondaryBgColor,
    bgImage,
    bgImageBlur,
  } = useMemo(
    () => ({
      size: link?.social_custom_logo_size ?? 0,
      bgType: link?.general_styles_background_type || "solid",
      primaryBgColor: link?.general_styles_primary_bgcolor,
      gradientColor: link?.general_styles_gradient_color,
      gradientDirection: link?.general_styles_gradient_direction || 145,
      gradientOffset: link?.general_styles_gradient_offset || 50,
      isSecondaryBgColor: link?.general_styles_is_secondary_bgcolor,
      secondaryBgColor: link?.general_styles_secondary_bgcolor,
      bgImage: link?.general_styles_bg_image,
      bgImageBlur: link?.general_styles_bg_image_blur,
    }),
    [link]
  );

  // Determine background style based on background_type
  const getBackgroundStyle = () => {
    // Check background type
    if (bgType === "gradient") {
      // Create smooth gradient with controlled transition point
      const startPercent = Math.max(0, gradientOffset - 25);
      const endPercent = Math.min(100, gradientOffset + 25);

      return {
        background: `linear-gradient(${gradientDirection}deg, ${primaryBgColor} ${startPercent}%, ${gradientColor} ${endPercent}%)`,
      };
    }

    // Check if split mode
    if (bgType === "split") {
      // Create hard split - both colors meet at offset point
      return {
        background: `linear-gradient(${gradientDirection}deg, ${primaryBgColor} 0%, ${primaryBgColor} ${gradientOffset}%, ${gradientColor} ${gradientOffset}%, ${gradientColor} 100%)`,
      };
    }

    // Solid color mode (default)
    return {
      backgroundColor: isSecondaryBgColor ? secondaryBgColor : primaryBgColor,
    };
  };

  return (
    link?.id && (
      <div
        className={cn("flex justify-center w-full", className)}
        style={{
          backgroundColor: link?.general_styles_desktop_bgcolor,
          borderRadius: "inherit",
        }}
      >
        <div
          className={cn(
            "w-full flex flex-col max-w-[530px] min-h-[calc(100vh)] max-w-[530px]",
            "shadow-[0px_7px_29px_0px_rgba(100,100,111,0.15)]",
            "relative"
          )}
          style={{
            color: link?.general_styles_primary_text_color,
            borderRadius: "inherit",
          }}
        >
          {/* Background layer for solid/gradient/split colors */}
          <div className="absolute inset-0 z-0" />

          {/* Blurred image background layer - only when background_type is "image" and blur is enabled */}
          {bgType === "image" && bgImage && (
            <div
              className="absolute inset-0 z-[1]"
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: bgImageBlur ? "blur(10px) brightness(0.8)" : "none",
                borderRadius: "inherit",
                transform: "scale(1.1)", // Scale up slightly to avoid edges showing
              }}
            />
          )}

          {/* Content layer - always on top */}
          <div
            className={cn(
              "flex flex-col h-full p-[33px] relative z-10",
              isSecondaryBgColor && "pt-[18px] mt-[175px]"
            )}
            style={getBackgroundStyle()}
          >
            <LinksNavbar isSticky={isSticky} link={link} />

            <div
              className={cn(
                "flex flex-col flex-1 mt-[15px]",
                isSecondaryBgColor && "mt-[25px]"
              )}
            >
              <LinksHeader link={link} />
              <LinksSocialIcons link={link} />
              <LinksBlocks link={link} />
            </div>

            {/* footer */}
            <div className="flex justify-center">
              {!link.social_enable_hide_raabet_branding ? (
                <LinksFooter />
              ) : (
                link.social_custom_logo && (
                  <Image
                    src={link.social_custom_logo}
                    className="mt-7.5"
                    alt="Custom logo"
                    width={25 + (190 - 25) * size}
                    height={16 + (118 - 16) * size}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

MainLinkComponentContent.displayName = "MainLinkComponent";

export const MainLinkComponent = memo(
  MainLinkComponentContent,
  (prevProps, nextProps) => {
    // Skip re-render only if all props are the same (including object references)
    return (
      prevProps.link === nextProps.link &&
      prevProps.isSticky === nextProps.isSticky &&
      prevProps.className === nextProps.className
    );
  }
);
