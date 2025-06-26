"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { QRCode, QRType } from "@prisma/client";
import { Download, Loader2, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { useProfileViewsList } from "../../analytics/metrics/hooks/useProfileViewsList";
import { useDeleteQRCode } from "../hooks/useDeleteQRCode";
import { useQRCode } from "../hooks/useQRCode";

interface QRCodeCardProps {
  qr: QRCode;
}

export default function QRCodeCard({ qr }: QRCodeCardProps) {
  const locale = useLocale();
  const t = useTranslations();

  const { data: profileViews } = useProfileViewsList()
  const { canvasRef, handleDownload } = useQRCode({
    url: qr.display_url,
    width: 160,
    height: 160,
  });

  const { mutateAsync, isPending } = useDeleteQRCode();

  const handleDelete = async () => {
    if (qr.isMain) return;
    try {
      await mutateAsync({ id: qr.id });
      toast.success("QR code deleted successfully");
    } catch (error) {
      toast.error("Failed to delete QR code");
    }
  };

  return (
    <Card>
      <CardContent className="flex justify-between w-full font-noto-sans">
        <div className="flex flex-col gap-3  max-w-[65%]">
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
    </Card>
  );
}
