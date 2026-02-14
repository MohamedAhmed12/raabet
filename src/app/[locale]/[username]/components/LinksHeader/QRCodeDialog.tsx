"use client";

import { Icon } from "@/components/Icon";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "next-auth";
import { QRCodeSVG } from "qrcode.react";
import { LinksAvatar } from "./LinksAvatar";

export default function QRCodeDialog({
  user,
  displayname,
  QRCodeEnabled,
  header_styles_profile_shadow,
  header_styles_profile_border_width,
  general_styles_soft_shadow,
  general_styles_is_secondary_bgcolor,
  header_styles_profile_border_color,
  general_styles_background_type,
}: {
  user: User | null;
  displayname: string;
  QRCodeEnabled: boolean;
  header_styles_profile_shadow: number;
  header_styles_profile_border_width: number;
  general_styles_soft_shadow: boolean;
  general_styles_is_secondary_bgcolor: boolean;
  header_styles_profile_border_color: string;
  general_styles_background_type: string;
}) {
  const profileurl = `${process.env.NEXT_PUBLIC_BASE_URL}/${
    user?.fullname || ""
  }`;

  return !QRCodeEnabled ? (
    <LinksAvatar
      user={user}
      header_styles_profile_shadow={header_styles_profile_shadow}
      header_styles_profile_border_width={header_styles_profile_border_width}
      general_styles_soft_shadow={general_styles_soft_shadow}
      general_styles_background_type={general_styles_background_type}
      general_styles_is_secondary_bgcolor={general_styles_is_secondary_bgcolor}
      header_styles_profile_border_color={header_styles_profile_border_color}
      QRCodeEnabled={QRCodeEnabled}
    />
  ) : (
    <Dialog>
      <DialogTrigger>
        <LinksAvatar
          user={user}
          header_styles_profile_shadow={header_styles_profile_shadow}
          general_styles_background_type={general_styles_background_type}
          header_styles_profile_border_width={
            header_styles_profile_border_width
          }
          general_styles_soft_shadow={general_styles_soft_shadow}
          general_styles_is_secondary_bgcolor={
            general_styles_is_secondary_bgcolor
          }
          header_styles_profile_border_color={
            header_styles_profile_border_color
          }
          QRCodeEnabled={QRCodeEnabled}
        />
      </DialogTrigger>

      <DialogContent className="max-w-[250] max-h-[340] h-full mx-auto text-center pt-6 pb-5">
        <DialogTitle className="sr-only"></DialogTitle>
        <div className="flex flex-col items-center">
          <Icon
            name="link"
            size={30}
            strokeWidth={3}
            fontWeight={800}
            className="mx-4 text-[#1b97f5]"
          />
          <h2 className="text-lg font-semibold mt-2">{displayname}</h2>
          <p className="text-muted-foreground text-sm break-all pb-2">{`${
            process.env.NEXT_PUBLIC_BASE_URL_LABEL
          }/${user?.fullname || ""}`}</p>
          <QRCodeSVG value={profileurl} size={200} marginSize={1} level="H" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
