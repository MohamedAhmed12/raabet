"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUser, Link, Plus } from "lucide-react";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { useTranslations } from "next-intl";
// import { useState } from "react";

export const NewQRCodeDialog = () => {
  const [showProfileQR, setShowProfileQR] = useState(false);
  const [showQRGenerator, setShowQRGenerator] = useState(false);

  const t = useTranslations("QR");
  const user = useLinkStore((state) => state.link.user);
  const profileurl = `${process.env.NEXT_PUBLIC_NETWORK_BASE_URL}/${user?.fullname}`;

  const renderDialogContent = () => {
    if (showProfileQR) {
      return (
        <QRCodeSVG
          value={profileurl}
          size={200}
          marginSize={1}
          level="H"
          className="mt-5"
        />
      );
    }
    if (showQRGenerator) {
      // return <QRGenerator />;
    }
    return (
      <div className="flex gap-4 mt-7 w-full">
        <Button
          variant="outline"
          className="cursor-pointer flex flex-col flex-1 h-25"
          onClick={() => setShowProfileQR(true)}
        >
          <FileUser className="!h-5 !w-5" />
          <p>Profile</p>
        </Button>
        <Button
          variant="outline"
          className="cursor-pointer flex flex-col flex-1 h-25"
          onClick={() => setShowQRGenerator(true)}
        >
          <Link className="!h-5 !w-5" />
          <p>URL</p>
        </Button>
      </div>
    );
  };

  return (
    <Dialog
      onOpenChange={() => {
        setShowQRGenerator(false);
        setShowProfileQR(false);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer h-10 font-noto-sans"
        >
          {t("newQR")}
          <Plus className="w-4 h-4 mr-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex justify-center items-center flex-col gap-2 font-noto-sans !max-w-115">
        <DialogTitle>
          {showProfileQR ? t("profileQRTitle") : t("newQR")}
        </DialogTitle>
        {renderDialogContent()}
      </DialogContent>
    </Dialog>
  );
};
