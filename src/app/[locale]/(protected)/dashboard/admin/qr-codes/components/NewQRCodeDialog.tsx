"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardChromPicker } from "@/app/[locale]/(protected)/dashboard/admin/profile/links/components/DashboardChromPicker";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { FileUser, Link, Loader2, Plus, QrCode } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import QRCodeStyling from "qr-code-styling";
import {
  createQRCodeInstance,
  QRCodeConfig,
  handleLogoUpload as uploadLogo,
  removeLogo as removeLogoUtil,
} from "@/lib/qrCodeUtils";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useCreateQRCode } from "../hooks/useCreateQRCode";
import { useGetLink } from "../../profile/links/hooks/useUpdateLink";
import Image from "next/image";

const QRCodesStyles = ["Square", "Circle"] as const;

export const NewQRCodeDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [showProfileQR, setShowProfileQR] = useState(false);
  const [showQRGenerator, setShowQRGenerator] = useState(false);
  const [url, setUrl] = useState("");

  // QR Code customization options
  const [qrSize, setQrSize] = useState(200);
  const [qrLevel, setQrLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [includeMargin, setIncludeMargin] = useState(true);
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [qrShape, setQrShape] = useState<"square" | "circle">("square");
  const [logoUrl, setLogoUrl] = useState("");

  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrCodeInstanceRef = useRef<QRCodeStyling | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isCancelledRef = useRef(false);

  const t = useTranslations("QR");
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);
  const getLink = useGetLink();
  const link = getLink();
  const fullname = link?.user?.fullname;
  const profileurl = fullname
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/${fullname}`
    : "";

  const { mutateAsync, isPending, reset } = useCreateQRCode();

  // Generate QR code with customizations
  useEffect(() => {
    const displaySize = qrSize > 320 ? 320 : qrSize;
    const config: QRCodeConfig = {
      qrSize,
      qrShape,
      qrLevel,
      includeMargin,
      foregroundColor,
      backgroundColor,
      logoUrl,
    };

    const qrCodeInstance = createQRCodeInstance(
      showProfileQR ? profileurl : url,
      displaySize,
      config
    );

    if (qrCodeRef.current) {
      qrCodeRef.current.innerHTML = "";
      qrCodeInstance.append(qrCodeRef.current);
      qrCodeInstanceRef.current = qrCodeInstance;
    }
  }, [
    url,
    fullname,
    showProfileQR,
    qrSize,
    qrLevel,
    includeMargin,
    foregroundColor,
    backgroundColor,
    qrShape,
    logoUrl,
    profileurl,
  ]);

  const handleCreateQRCode = async () => {
    try {
      // Reset cancellation flag
      isCancelledRef.current = false;

      await mutateAsync({
        url,
        customization: {
          qrSize,
          qrLevel,
          includeMargin,
          foregroundColor,
          backgroundColor,
          qrShape,
          logoUrl,
        },
      });

      // Check if cancelled after the request
      if (isCancelledRef.current) {
        return;
      }

      handleOnOpenChange(false);
      toast.success(t("createSuccess"));
    } catch (error) {
      // Don't show error if it was cancelled
      if (isCancelledRef.current) {
        return;
      }

      const errorMessage =
        error instanceof Error ? error.message : t("createError");
      toast.error(errorMessage);
    }
  };

  const handleProfileQRSelected = () => {
    setShowProfileQR(true);
    setUrl(profileurl);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    uploadLogo(
      event,
      (logoUrl) => {
        setLogoUrl(logoUrl);
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

  const renderDialogContent = () => {
    if (showQRGenerator || showProfileQR) {
      return (
        <div className="space-y-6 w-full">
          {!showProfileQR && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="url" className="mb-1">
                {t("urlLabel")}
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Customization Options */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="size" className="mb-2.5">
                    {t("sizeLabel")}
                  </Label>
                  <Input
                    id="size"
                    type="number"
                    min="100"
                    max="1000"
                    value={qrSize}
                    onChange={(e) =>
                      setQrSize(
                        Number(e.target.value) > 600
                          ? 600
                          : Number(e.target.value)
                      )
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
                <div className="space-y-2">
                  <DashboardChromPicker
                    label={t("foregroundLabel")}
                    currentColor={foregroundColor}
                  />
                </div>
                <div className="space-y-2">
                  <DashboardChromPicker
                    label={t("backgroundLabel")}
                    currentColor={backgroundColor}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="mb-2.5">{t("shapeLabel")}</Label>
                <Tabs
                  value={qrShape}
                  onValueChange={(value) =>
                    setQrShape(value as "square" | "circle")
                  }
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    {QRCodesStyles.map((style) => (
                      <TabsTrigger
                        key={style}
                        value={style.toLowerCase()}
                        className="flex items-center space-x-1"
                      >
                        <div className="w-3 h-3 border-2 border-current rounded-sm" />
                        <span>{t(`shape${style}`)}</span>
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
                <Label className="mb-2.5">{t("logoLabel")}</Label>
                <div className="space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <div className="flex gap-2 w-3">
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

            {/* Right Side - QR Code Preview */}
            <div className="flex flex-col h-full">
              <div className="flex flex-col h-full space-y-2">
                <Label className="text-sm font-medium text-gray-700 mb-2">
                  {t("yourQRCode")}
                </Label>

                <div className="flex-1 flex justify-center items-center p-6 bg-white rounded-lg border-2 border-dashed border-gray-200">
                  <div
                    ref={qrCodeRef}
                    style={{
                      width: qrSize > 320 ? 320 : qrSize,
                      height: qrSize > 320 ? 320 : qrSize,
                      display:
                        !showProfileQR && url.trim().length == 0
                          ? "none"
                          : "block",
                      backgroundColor: "white",
                    }}
                  />

                  {url.trim().length == 0 && !showProfileQR && (
                    <div className="flex flex-col items-center justify-center text-center">
                      <QrCode className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-gray-500">
                        {t("preview.placeholder")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* action buttons */}
          {!showProfileQR && (
            <div className="flex justify-end space-x-1">
              <Button
                variant="outline"
                className="!text-base"
                onClick={() => {
                  // Cancel any ongoing request
                  isCancelledRef.current = true;
                  // Reset the mutation state
                  reset();
                  handleOnOpenChange(false);
                }}
              >
                {t("cancel")}
              </Button>
              <Button
                variant={"dashboard-default"}
                className="!text-base bg-deep-blue-gray hover:bg-deep-blue-gray min-w-[150px]"
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
          )}
        </div>
      );
    }
    return (
      <div className="flex gap-4 mt-7 w-full">
        <Button
          variant="outline"
          className="cursor-pointer flex flex-col flex-1 h-25"
          onClick={() => handleProfileQRSelected()}
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
    // Cancel any ongoing request when closing
    if (!open) {
      isCancelledRef.current = true;
      // Reset the mutation state
      reset();
    }

    setOpen(open);
    setShowQRGenerator(false);
    setShowProfileQR(false);
    setUrl("");
    // Reset customization options to defaults
    setQrSize(200);
    setQrLevel("M");
    setIncludeMargin(true);
    setForegroundColor("#000000");
    setBackgroundColor("#ffffff");
    setQrShape("square");
    setLogoUrl("");
  };

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn("cursor-pointer h-10 !text-base", fontClass)}
          onClick={() => setOpen(true)}
        >
          {t("newQR")}
          <Plus className="w-4 h-4 mr-2" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "flex justify-center items-center flex-col gap-2 !max-w-3xl overflow-y-auto",
          !showProfileQR ? "p-6" : "p-7",
          fontClass
        )}
      >
        <DialogTitle className="mt-3 mb-5">
          {showProfileQR ? t("profileQRTitle") : t("newQR")}
        </DialogTitle>
        {renderDialogContent()}
      </DialogContent>
    </Dialog>
  );
};
