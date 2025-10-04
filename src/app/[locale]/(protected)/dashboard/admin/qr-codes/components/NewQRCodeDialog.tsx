"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
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
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { FileUser, Link, Loader2, Plus, QrCode } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import QRCodeStyling, { Options } from "qr-code-styling";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { useCreateQRCode } from "../hooks/useCreateQRCode";

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

  const { qrcodes } = useLinkStore(
    useShallow((state) => ({
      qrcodes: state.link.qrcodes,
    }))
  );
  const profileurl = qrcodes?.[0]?.url || "";

  const { mutateAsync, isPending, reset } = useCreateQRCode();

  // Generate QR code with customizations
  useEffect(() => {
    // Extension to add border for circular QR codes and logo overlay
    const extension = (svg: SVGElement, options: Options) => {
      const { width = qrSize, height = qrSize } = options;
      const size = Math.min(width, height);

      // Add border for circular QR codes
      if (qrShape === "circle") {
        const borderWidth = size === 200 ? 3 : 4;

        const borderAttributes = {
          fill: "none",
          x: (width - size + borderWidth) / 2,
          y: (height - size + borderWidth) / 2,
          width: size - borderWidth,
          height: size - borderWidth,
          stroke: foregroundColor,
          "stroke-width": borderWidth,
          rx: size / 2,
          display: url.trim().length == 0 ? "none" : "block",
        };

        const border = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        Object.entries(borderAttributes).forEach(([key, value]) => {
          border.setAttribute(key, value.toString());
        });

        svg.appendChild(border);
      }

      // Add logo overlay if logoUrl exists
      if (logoUrl) {
        const logoSize = Math.min(size * 0.2, 60); // Logo should be 20% of QR size, max 60px
        const logoX = (width - logoSize) / 2;
        const logoY = (height - logoSize) / 2;

        // Create a white background circle for the logo
        const logoBackground = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        logoBackground.setAttribute("cx", (width / 2).toString());
        logoBackground.setAttribute("cy", (height / 2).toString());
        logoBackground.setAttribute("r", (logoSize / 2 + 4).toString());
        logoBackground.setAttribute("fill", "white");

        // Create the logo image
        const logoImage = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "image"
        );
        logoImage.setAttribute("href", logoUrl);
        logoImage.setAttribute("x", logoX.toString());
        logoImage.setAttribute("y", logoY.toString());
        logoImage.setAttribute("width", logoSize.toString());

        svg.appendChild(logoBackground);
        svg.appendChild(logoImage);
      }
    };

    const options: Partial<Options> = {
      width: qrSize,
      height: qrSize,
      type: "svg",
      data: showProfileQR ? profileurl : url,
      shape: qrShape === "circle" ? "circle" : "square",
      qrOptions: {
        errorCorrectionLevel: qrLevel,
        typeNumber: 0,
      },
      dotsOptions: {
        type: qrShape === "circle" ? "dots" : "square",
        color: foregroundColor,
        roundSize: qrShape === "circle",
      },
      cornersSquareOptions: {
        type: "square",
        color: foregroundColor,
      },
      cornersDotOptions: {
        type: "square",
        color: foregroundColor,
      },
      backgroundOptions: {
        color: backgroundColor,
        round: qrShape === "circle" ? 10 : 0,
      },
    };

    const qrCodeInstance = new QRCodeStyling(options);

    // Always apply extension for both circle border and logo
    qrCodeInstance.applyExtension(extension);

    if (qrCodeRef.current) {
      qrCodeRef.current.innerHTML = "";
      qrCodeInstance.append(qrCodeRef.current);
      qrCodeInstanceRef.current = qrCodeInstance;
    }
  }, [
    url,
    profileurl,
    showProfileQR,
    qrSize,
    qrLevel,
    includeMargin,
    foregroundColor,
    backgroundColor,
    qrShape,
    logoUrl,
  ]);

  const handleCreateQRCode = async () => {
    try {
      // Reset cancellation flag
      isCancelledRef.current = false;

      await mutateAsync({ url });

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
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error(t("invalidFileType"));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t("fileTooLarge"));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoUrl(result);
        toast.success(t("logoUploadSuccess"));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success(t("logoRemoved"));
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
                    onChange={(e) => setQrSize(Number(e.target.value))}
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
                  <Label htmlFor="foreground" className="mb-2.5">
                    {t("foregroundLabel")}
                  </Label>
                  <div className="flex items-center space-x-1">
                    <Input
                      id="foreground"
                      type="color"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="h-9 p-1 border rounded w-full"
                    />
                    <Input
                      type="text"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="h-9 flex-1"
                      placeholder="#000000"
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="background" className="mb-2.5">
                    {t("backgroundLabel")}
                  </Label>
                  <div className="flex items-center space-x-1">
                    <Input
                      id="background"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="h-9 p-1 border rounded w-full"
                    />
                    <Input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="h-9 flex-1"
                      placeholder="#ffffff"
                      dir="ltr"
                    />
                  </div>
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

              <div className="flex items-center gap-1 my-5">
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
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1"
                    >
                      {logoUrl ? t("changeLogo") : t("uploadLogo")}
                    </Button>
                    {logoUrl && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={removeLogo}
                        className="px-3"
                      >
                        {t("removeLogo")}
                      </Button>
                    )}
                  </div>
                  {logoUrl && (
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <img
                        src={logoUrl}
                        alt="Logo preview"
                        className="w-8 h-8 object-cover rounded"
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
                      width: qrSize,
                      height: qrSize,
                      display: url.trim().length == 0 ? "none" : "block",
                    }}
                  />

                  {url.trim().length == 0 && !showProfileQR && (
                    <div className="flex flex-col items-center justify-center p-12 text-center">
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
          "flex justify-center items-center flex-col gap-2 !max-w-3xl",
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
