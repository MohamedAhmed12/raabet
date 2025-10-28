"use client";

import { DashboardChromPicker } from "@/app/[locale]/(protected)/dashboard/admin/profile/links/components/DashboardChromPicker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { logError } from "@/lib/errorHandling";
import {
  removeLogo as removeLogoUtil,
  handleLogoUpload as uploadLogo,
} from "@/lib/qrCodeUtils";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useUpdateQRCode } from "../hooks/useUpdateQRCode";
import { useQRCode } from "../hooks/useQRCode";
import { QRCode } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Shape = "square" | "circle";

interface EditQRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qr: QRCode;
}

export function EditQRCodeDialog({
  open,
  onOpenChange,
  qr,
}: EditQRCodeDialogProps) {
  const t = useTranslations("QR");

  const [websiteUrl, setWebsiteUrl] = useState(qr.destination_url || qr.url);
  const [displayUrl, setDisplayUrl] = useState("");
  const [qrSize, setQrSize] = useState(qr.qrSize);
  const [qrLevel, setQrLevel] = useState<"L" | "M" | "Q" | "H">(
    qr.qrLevel as "L" | "M" | "Q" | "H"
  );
  const [includeMargin, setIncludeMargin] = useState(qr.includeMargin);
  const [foregroundColor, setForegroundColor] = useState(qr.foregroundColor);
  const [backgroundColor, setBackgroundColor] = useState(qr.backgroundColor);
  const [qrShape, setQrShape] = useState<Shape>(
    qr.qrShape as "square" | "circle"
  );
  const [logoUrl, setLogoUrl] = useState<string>(qr.logoUrl ?? "");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync, isPending, reset } = useUpdateQRCode();
  const queryClient = useQueryClient();

  const { canvasRef } = useQRCode({
    url: displayUrl, // Use the destination URL for live preview
    qrSize, // Use the state values for live preview
    qrShape,
    qrLevel,
    foregroundColor,
    backgroundColor,
    logoUrl: logoUrl || undefined,
  });

  useEffect(() => {
    setDisplayUrl(qr.display_url);
  }, [qr.display_url]);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    uploadLogo(
      event,
      (newUrl) => {
        setLogoUrl(newUrl);
        toast.success(t("logoUploadSuccess"));
      },
      (errorMessage) => {
        toast.error(errorMessage);
      }
    );
  };

  const removeLogo = () => {
    removeLogoUtil(fileInputRef, () => {
      setLogoUrl("");
      toast.success(t("logoRemoved"));
    });
  };

  const handleSave = async () => {
    try {
      const res = await mutateAsync({
        id: qr.id,
        destination_url: websiteUrl,
        customization: {
          qrSize,
          qrLevel,
          includeMargin,
          foregroundColor,
          backgroundColor,
          qrShape,
          logoUrl: logoUrl || null,
        },
      });

      // Update the specific QR code in the cache with new data
      queryClient.setQueryData(["listQRCodes"], (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.map((item: any) =>
          item.id === qr.id ? { ...item, ...res.qr } : item
        );
      });

      onOpenChange(false);
      toast.success(t("updateSuccess"));
    } catch (e) {
      const msg = e instanceof Error ? e.message : t("updateError");
      toast.error(msg);

      logError(e, {
        action: "handleSave update QR code",
        errorType: "UnknownError",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) reset();
        onOpenChange(o);
      }}
    >
      <DialogContent className="!max-w-3xl">
        <DialogTitle>{t("editQR")}</DialogTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">{t("urlLabel")}</Label>
              <Input
                id="url"
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="size">{t("sizeLabel")}</Label>
                <Input
                  id="size"
                  type="number"
                  min={100}
                  max={600}
                  value={qrSize}
                  onChange={(e) =>
                    setQrSize(Math.min(600, Number(e.target.value)))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level" className="mb-2.5">
                  {t("levelLabel")}
                </Label>
                <Select
                  value={qrLevel}
                  onValueChange={(value) =>
                    setQrLevel(value as "L" | "M" | "Q" | "H")
                  }
                >
                  <SelectTrigger className="w-full" dir="inherit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">{t("levels.low")}</SelectItem>
                    <SelectItem value="M">{t("levels.medium")}</SelectItem>
                    <SelectItem value="Q">{t("levels.quartile")}</SelectItem>
                    <SelectItem value="H">{t("levels.high")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <DashboardChromPicker
                label={t("foregroundLabel")}
                currentColor={foregroundColor}
              />
              <DashboardChromPicker
                label={t("backgroundLabel")}
                currentColor={backgroundColor}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("shapeLabel")}</Label>
              <Tabs
                value={qrShape}
                onValueChange={(v) => setQrShape(v as Shape)}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  {["square", "circle"].map((s) => (
                    <TabsTrigger
                      key={s}
                      value={s}
                      className="flex items-center space-x-1"
                    >
                      <div className="w-3 h-3 border-2 border-current rounded-sm" />
                      <span>{s}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center gap-2 my-6">
              <input
                type="checkbox"
                id="margin"
                checked={includeMargin}
                onChange={(e) => setIncludeMargin(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="margin">{t("includeMargin")}</Label>
            </div>

            <div className="space-y-2 mt-4">
              <Label>{t("logoLabel")}</Label>
              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload-edit"
                />
                <div className="flex gap-2 mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="!text-sm"
                  >
                    {logoUrl ? t("changeLogo") : t("uploadLogo")}
                  </Button>
                  {logoUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={removeLogo}
                      className="!text-sm"
                    >
                      {t("removeLogo")}
                    </Button>
                  )}
                </div>
                {logoUrl && (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <Image
                      src={logoUrl}
                      alt="Logo preview"
                      width={32}
                      height={32}
                      className="object-cover rounded"
                    />
                    <span className="text-sm text-gray-600">
                      {t("logoPreview")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col h-full">
            <Label className="text-sm font-medium text-gray-700 mb-2">
              {t("yourQRCode")}
            </Label>

            <div className="flex-1 flex justify-center items-center p-6 bg-white rounded-lg border-2 border-dashed border-gray-200">
              <div
                ref={canvasRef}
                style={{
                  width: qrSize > 320 ? 320 : qrSize,
                  height: qrSize > 320 ? 320 : qrSize,
                  backgroundColor: "white",
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-1 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button
            variant="dashboard-default"
            className="bg-deep-blue-gray hover:bg-deep-blue-gray min-w-[150px]"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              t("save")
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
