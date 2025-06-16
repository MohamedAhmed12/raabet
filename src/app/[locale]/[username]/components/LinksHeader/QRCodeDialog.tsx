"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { Icon } from "@/components/Icon";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { useShallow } from "zustand/react/shallow";
import { LinksAvatar } from "./LinksAvatar";

export default function QRCodeDialog() {
  const { fullname, displayname, QRCodeEnabled } = useLinkStore(
    useShallow((state) => ({
      fullname: state.link.user?.fullname,
      displayname: state.link.displayname,
      QRCodeEnabled: state.link.social_enable_qr_code,
    }))
  );
  const profileurl = `${process.env.NEXT_PUBLIC_BASE_URL}/${fullname}`;

  return !QRCodeEnabled ? (
    <LinksAvatar />
  ) : (
    <Dialog>
      <DialogTrigger>
        <LinksAvatar />
      </DialogTrigger>

      <DialogContent className="max-w-[250] max-h-[340] h-full mx-auto text-center pt-6 pb-5">
        <DialogTitle className="sr-only"></DialogTitle>
        <div className="flex flex-col items-center">
          <Icon
            name="link"
            size={30}
            width={30}
            strokeWidth={3}
            fontWeight={800}
            className="mx-4 text-[#1b97f5]"
          />
          <h2 className="text-lg font-semibold mt-2">{displayname}</h2>
          <p className="text-muted-foreground text-sm break-all pb-2">{`${process.env.NEXT_PUBLIC_BASE_URL_LABEL}/${fullname}`}</p>
          <QRCodeSVG value={profileurl} size={200} marginSize={1} level="H" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
