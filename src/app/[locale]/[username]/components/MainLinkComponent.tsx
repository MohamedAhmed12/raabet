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

  const width = useMemo(() => {
    return 25 + (190 - 25) * size;
  }, [size]);

  const height = useMemo(() => {
    return 16 + (118 - 16) * size;
  }, [size]);

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
            "w-full flex flex-col max-w-[530px] min-h-[calc(100vh+60px)] max-w-[530px]",
            "shadow-[0px_7px_29px_0px_rgba(100,100,111,0.15)]"
          )}
          style={{
            color: link?.general_styles_primary_text_color,
            backgroundColor: link?.general_styles_primary_bgcolor,
            borderRadius: "inherit",
          }}
        >
          <div
            className={cn(
              "flex flex-col h-full p-[33px]",
              link?.general_styles_is_secondary_bgcolor &&
                "pt-[18px] mt-[175px]"
            )}
            style={{
              backgroundColor: link?.general_styles_is_secondary_bgcolor
                ? link?.general_styles_secondary_bgcolor
                : link?.general_styles_primary_bgcolor,
            }}
          >
            <LinksNavbar isSticky={isSticky} />

            <div
              className={cn(
                "flex flex-col flex-1",
                link?.general_styles_is_secondary_bgcolor && "mt-[25px]"
              )}
            >
              <LinksHeader />
              <LinksSocialIcons />
              <LinksBlocks />
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
                    width={width}
                    height={height}
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
