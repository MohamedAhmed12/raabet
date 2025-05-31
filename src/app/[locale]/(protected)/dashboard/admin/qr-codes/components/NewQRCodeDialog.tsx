"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUser, Link, Plus, Loader2 } from "lucide-react";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useCreateQRCode } from "../hooks/useCreateQRCode";
import { useQueryClient } from "@tanstack/react-query";

export const NewQRCodeDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [showProfileQR, setShowProfileQR] = useState(false);
  const [showQRGenerator, setShowQRGenerator] = useState(false);
  const [url, setUrl] = useState("");

  const t = useTranslations("QR");
  const queryClient = useQueryClient();
  const user = useLinkStore((state) => state.link.user);
  const profileurl = `${process.env.NEXT_PUBLIC_NETWORK_BASE_URL}/${user?.fullname}`;

  const { mutateAsync, isPending } = useCreateQRCode();

  const handleCreateQRCode = async () => {
    try {
      await mutateAsync({ url });
      handleOnOpenChange(false);
      toast.success("QR code created successfully");
    } catch (error) {
      console.error("Failed to create QR code:", error);
      toast.error("Failed to create QR code");
    }
  };

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
      return (
        <div className="space-y-4 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{t("urlLabel")}</label>
            <input
              type="url"
              placeholder="https://example.com"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowQRGenerator(false);
                setUrl("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant={"dashboard-default"}
              onClick={async () => handleCreateQRCode()}
              disabled={isPending || !url}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                t("createQRCode")
              )}
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="flex gap-4 mt-7 w-full">
        <Button
          variant="outline"
          className="cursor-pointer flex flex-col flex-1 h-25"
          onClick={() => setShowProfileQR(true)}
        >
          <FileUser className="!h-5 !w-5" />
          <p>{t("profile")}</p>
        </Button>
        <Button
          variant="outline"
          className="cursor-pointer flex flex-col flex-1 h-25"
          onClick={() => setShowQRGenerator(true)}
        >
          <Link className="!h-5 !w-5" />
          <p>{t("url")}</p>
        </Button>
      </div>
    );
  };

  const handleOnOpenChange = (open: boolean) => {
    setOpen(open);
    setShowQRGenerator(false);
    setShowProfileQR(false);
    setUrl("");
  };

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer h-10 font-noto-sans"
          onClick={() => setOpen(true)}
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
