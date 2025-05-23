"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Loader2, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteQRCode } from "../actions/deleteQRCode";

export default function QRCodeCard({
  qr,
  onDelete,
}: {
  qr: any;
  onDelete: (id: string) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const t = useTranslations();
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

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qr.url;
    link.download = `qr-code-${qr.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardContent className="flex justify-between w-full">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 justify-center items-start">
            <div className="flex gap-2">
              <p className="text-xs text-muted-foreground">
                {t("Shared.type")}:
              </p>
              <p className="text-sm font-medium">{qr.type}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-xs text-muted-foreground">
                {t("Shared.views")}
              </p>
              <p className="text-sm font-medium">{qr.views}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handleDownload}
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
        <QRCodeSVG value={qr.url} size={90} marginSize={1} level="H" />
      </CardContent>
    </Card>
  );
}
