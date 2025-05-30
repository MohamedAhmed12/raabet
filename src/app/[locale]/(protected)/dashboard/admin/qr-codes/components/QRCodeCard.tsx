"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Loader2, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { deleteQRCode } from "../actions/deleteQRCode";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { QRType } from "@prisma/client";
import QRCodeStyling, { Options } from "qr-code-styling";
import { useQRCode } from "../hooks/useQRCode";

export default function QRCodeCard({
  qr,
  onDelete,
}: {
  qr: any;
  onDelete: (id: string) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const t = useTranslations();
  const profile_views = useLinkStore((state) => state.link.profile_views);
  const { canvasRef, handleDownload } = useQRCode({
    url: qr.url,
    width: 160,
    height: 160,
    onDownload: () => {},
  });
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteQRCode(qr.id);
      onDelete(qr.id);
    } catch (error) {
      toast.error("Failed to delete QR code");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card>
      <CardContent className="flex justify-between w-full font-noto-sans">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 justify-center items-start">
            <div className="flex justify-center items-center gap-2">
              <p className="text-xs text-dark-foreground font-semibold ">
                {t("Shared.type")}:
              </p>
              <p className="text-sm">{qr.type}</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <p className="text-xs text-dark-foreground font-semibold">
                {t("Shared.views")}:
              </p>
              <p className="text-sm">
                {qr.type === QRType.profile ? profile_views : qr.views}
              </p>
            </div>
            {qr.type === QRType.url && (
              <div className="flex justify-center items-center gap-2">
                <p className="text-xs text-dark-foreground font-semibold">
                  {t("Shared.url")}:
                </p>
                <p className="text-sm">{qr.url}</p>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => handleDownload(qr.id)}
            >
              <Download className="w-4 h-4 " />
            </Button>
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={isDeleting}
              className="cursor-pointer"
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" color="red" />
              )}
            </Button>
          </div>
        </div>

        <div ref={canvasRef} />
      </CardContent>
    </Card>
  );
}
