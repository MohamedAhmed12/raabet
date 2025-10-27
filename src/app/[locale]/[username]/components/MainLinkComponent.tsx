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
  const size = useMemo(() => {
    return link?.social_custom_logo_size ?? 0;
  }, [link?.social_custom_logo_size]);

  // Determine background style based on gradient settings
  const getBackgroundStyle = () => {
    const direction = link?.general_styles_gradient_direction || 145;
    const offset = link?.general_styles_gradient_offset || 50;
    
    // Check if gradient is enabled (gradient mode)
    if (link?.general_styles_enable_gradient === true) {
      // Create smooth gradient with controlled transition point
      const startPercent = Math.max(0, offset - 25);
      const endPercent = Math.min(100, offset + 25);
      
      return {
        background: `linear-gradient(${direction}deg, ${link?.general_styles_primary_bgcolor} ${startPercent}%, ${link?.general_styles_gradient_color} ${endPercent}%)`,
      };
    }
    
    // Check if split mode (gradient disabled but offset exists)
    if (link?.general_styles_enable_gradient === false && link?.general_styles_gradient_offset !== undefined) {
      // Create hard split - both colors meet at offset point
      return {
        background: `linear-gradient(${direction}deg, ${link?.general_styles_primary_bgcolor} 0%, ${link?.general_styles_primary_bgcolor} ${offset}%, ${link?.general_styles_gradient_color} ${offset}%, ${link?.general_styles_gradient_color} 100%)`,
      };
    }
    
    // Solid color mode
    return {
      backgroundColor: link?.general_styles_is_secondary_bgcolor
        ? link?.general_styles_secondary_bgcolor
        : link?.general_styles_primary_bgcolor,
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
            "shadow-[0px_7px_29px_0px_rgba(100,100,111,0.15)]"
          )}
          style={{
            color: link?.general_styles_primary_text_color,
            ...(() => {
                const direction = link?.general_styles_gradient_direction || 145;
                const offset = link?.general_styles_gradient_offset || 50;
                
                if (link?.general_styles_enable_gradient === true) {
                  // Smooth gradient
                  const startPercent = Math.max(0, offset - 25);
                  const endPercent = Math.min(100, offset + 25);
                  
                  return {
                    background: `linear-gradient(${direction}deg, ${link?.general_styles_primary_bgcolor} ${startPercent}%, ${link?.general_styles_gradient_color} ${endPercent}%)`,
                  };
                }
                
                if (link?.general_styles_enable_gradient === false && link?.general_styles_gradient_offset !== undefined) {
                  // Hard split
                  return {
                    background: `linear-gradient(${direction}deg, ${link?.general_styles_primary_bgcolor} 0%, ${link?.general_styles_primary_bgcolor} ${offset}%, ${link?.general_styles_gradient_color} ${offset}%, ${link?.general_styles_gradient_color} 100%)`,
                  };
                }
                
                // Solid
                return {
                  backgroundColor: link?.general_styles_primary_bgcolor,
                };
              })(),
            borderRadius: "inherit",
          }}
        >
          <div
            className={cn(
              "flex flex-col h-full p-[33px]",
              link?.general_styles_is_secondary_bgcolor &&
                "pt-[18px] mt-[175px]"
            )}
            style={getBackgroundStyle()}
          >
            <LinksNavbar isSticky={isSticky} link={link} />

            <div
              className={cn(
                "flex flex-col flex-1 mt-[15px]",
                link?.general_styles_is_secondary_bgcolor && "mt-[25px]"
              )}
            >
              <LinksHeader link={link} />
              <LinksSocialIcons link={link} />
              <LinksBlocks link={link} />
            </div>
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

export const MainLinkComponent = memo(MainLinkComponentContent);
