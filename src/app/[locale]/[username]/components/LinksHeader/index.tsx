"use client";

import { Link } from "@/app/[locale]/store/use-link-store";
import { Link as PrismaLink } from "@prisma/client";
import { cn } from "@/lib/cn";
import { User } from "next-auth";
import { useState } from "react";
import QRCodeDialog from "./QRCodeDialog";

type LinkWithUser = (Link | PrismaLink) & { user?: User };

export function LinksHeader({ link }: { link: Link | PrismaLink }) {
  const [collapseBio, setCollapseBio] = useState<boolean>(true);
  const linkWithUser = link as LinkWithUser;

  const handleToggleCollapseBio = () => {
    setCollapseBio((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center mb-[33px] text-current">
      <div className="flex flex-col w-full items-center justify-center">
        <QRCodeDialog
          user={linkWithUser?.user || null}
          displayname={link?.displayname || ""}
          QRCodeEnabled={link?.social_enable_qr_code || false}
          header_styles_profile_shadow={link?.header_styles_profile_shadow || 0}
          header_styles_profile_border_width={
            link?.header_styles_profile_border_width || 0
          }
          general_styles_soft_shadow={link?.general_styles_soft_shadow || false}
          general_styles_is_secondary_bgcolor={
            link?.general_styles_is_secondary_bgcolor || false
          }
          header_styles_profile_border_color={
            link?.header_styles_profile_border_color || ""
          }
        />
        <div
          className={cn(
            "mt-2 text-3xl capitalize font-semibold",
            link.title_font && `${link.title_font}`
          )}
        >
          {link?.displayname}
        </div>
        {/* bio */}
        {link.bio && (
          <h2
            dir="auto"
            className={cn(
              "font-normal text-base leading-[1.3] max-w-[300px] mt-[31px] break-words whitespace-pre-line text-center",
              link.text_font && `${link.text_font}`,
              link.header_styles_collapse_long_bio &&
                collapseBio &&
                "line-clamp-3",
              link.header_styles_collapse_long_bio && "cursor-pointer"
            )}
            onClick={handleToggleCollapseBio}
          >
            {link.bio}
          </h2>
        )}
      </div>
    </div>
  );
}
