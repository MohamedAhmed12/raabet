// components/ProfileDialog.tsx

"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { LinksAvatar } from "./LinksAvatar";
import { Icon } from "@/components/Icon";
import { QRCodeSVG } from "qrcode.react";

export default function QRCodeDialog() {
  const user = useLinkStore((state) => state.link.user);
  const link = useLinkStore((state) => state.link);
  const profileurl = `${process.env.NEXT_PUBLIC_NETWORK_BASE_URL}/${user?.fullname}`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer mb-5 ">
          <LinksAvatar />
        </div>
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
          <h2 className="text-lg font-semibold mt-2">{link.displayname}</h2>
          <p className="text-muted-foreground text-sm break-all pb-2">{`${process.env.NEXT_PUBLIC_BASE_URL_LABEL}/${user?.fullname}`}</p>
          <QRCodeSVG value={profileurl} size={200} marginSize={1} level="H" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
