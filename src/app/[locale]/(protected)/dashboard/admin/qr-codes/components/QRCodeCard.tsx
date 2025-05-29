"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Loader2, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { deleteQRCode } from "../actions/deleteQRCode";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { QRType } from "@prisma/client";
import QRCodeStyling, { Options } from "qr-code-styling";
import QRCodeStylingOptions from "qr-code-styling";

export default function QRCodeCard({
  qr,
  onDelete,
}: {
  qr: any;
  onDelete: (id: string) => void;
}) {
  const QRStylingOptions: Partial<Options> = {
    width: 150,
    height: 150,
    type: "canvas",
    data: qr.url,
    shape: "circle",
    qrOptions: {
      errorCorrectionLevel: "M",
      typeNumber: 0,
    },
    dotsOptions: {
      type: "dots",
      roundSize: true,
    },
    cornersSquareOptions: {
      type: "square",
    },
    cornersDotOptions: {
      type: "dot",
    },
    margin: 1,
  };

  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const QRCodeInstanceRef = useRef<QRCodeStyling | null>(null);

  const t = useTranslations();
  const profile_views = useLinkStore((state) => state.link.profile_views);

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

  useEffect(() => {
    try {
      if (!qr.url) return;

      // Create QR code instance
      QRCodeInstanceRef.current = new QRCodeStyling(QRStylingOptions);

      // Append to canvas if available
      if (canvasRef.current && canvasRef.current.children.length === 0) {
        QRCodeInstanceRef.current.append(canvasRef.current);
      }

      return () => {
        if (QRCodeInstanceRef.current) {
          QRCodeInstanceRef.current = null;
        }
        if (canvasRef.current) {
          canvasRef.current = null;
        }
      };
    } catch (error) {
      console.error("Failed to create QR code:", error);
      toast.error("Failed to create QR code");
    }
  }, [qr.url]);

  const handleDownload = () => {
    if (!canvasRef.current) {
      toast.error("QR code is not available");
      return;
    }

    try {
      // Create QR code instance
      const downloadQR = new QRCodeStyling({
        ...QRStylingOptions,
        width: 600,
        height: 600,
      });
      downloadQR.download({
        name: `qr-code-${qr.id}`,
        extension: "png",
      });
    } catch (error) {
      console.error("Failed to download QR code:", error);
      toast.error("Failed to download QR code");
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
        {/* <QRCodeCanvas
          ref={canvasRef}
          value={qr.url}
          size={90}
          marginSize={1}
          level="H"
        /> */}

        <div ref={canvasRef} />
      </CardContent>
    </Card>
  );
}
