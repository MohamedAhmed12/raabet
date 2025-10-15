"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { QRCode, QRType } from "@prisma/client";
import { Download, Edit, Loader2, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { useProfileViewsList } from "../../analytics/metrics/hooks/useProfileViewsList";
import { useDeleteQRCode } from "../hooks/useDeleteQRCode";
import { useQRCode } from "../hooks/useQRCode";
import { useState } from "react";
import { EditQRCodeDialog } from "./EditQRCodeDialog";

interface QRCodeCardProps {
  qr: QRCode;
}

export default function QRCodeCard({ qr }: QRCodeCardProps) {
  const locale = useLocale();
  const t = useTranslations();
  const fontClass = getFontClassClient(locale);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data: profileViews } = useProfileViewsList();
  const { canvasRef, handleDownload } = useQRCode({
    url: qr.display_url,
    qrSize: qr.qrSize,
    qrShape: qr.qrShape as "square" | "circle",
    qrLevel: qr.qrLevel as "L" | "M" | "Q" | "H",
    foregroundColor: qr.foregroundColor,
    backgroundColor: qr.backgroundColor,
    logoUrl: qr.logoUrl || undefined,
  });

  const { mutateAsync, isPending } = useDeleteQRCode();

  const handleDelete = async () => {
    if (qr.isMain) return;
    try {
      await mutateAsync({ id: qr.id });
      toast.success("QR code deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete QR code");
    }
  };

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  return (
    <Card>
      <CardContent className={cn("flex justify-between w-full", fontClass)}>
        <div className="flex flex-col gap-3 max-w-[65%] me-3">
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
                {qr.type === QRType.profile ? profileViews?.length : qr.views}
              </p>
            </div>
            {qr.type === QRType.url && (
              <div
                className={cn(
                  "flex justify-center items-center gap-2 max-w-full",
                  locale === "ar" ? "ml-2" : "mr-2"
                )}
              >
                <p className="text-xs text-dark-foreground font-semibold">
                  {t("Shared.url")}:
                </p>
                <p className="text-sm truncate">{qr.url}</p>
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
              onClick={handleEdit}
              className="cursor-pointer"
            >
              <Edit className="w-4 h-4" />
            </Button>
            {!qr.isMain ? (
              <Button
                variant="outline"
                onClick={handleDelete}
                disabled={isPending}
                className="cursor-pointer"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" color="red" />
                )}
              </Button>
            ) : null}
          </div>
        </div>

        <div ref={canvasRef} />
      </CardContent>
      {isEditOpen ? (
        <EditQRCodeDialog open={isEditOpen} onOpenChange={setIsEditOpen} qr={qr as any} />
      ) : null}
    </Card>
  );
}
