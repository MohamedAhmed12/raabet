import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Copy, Download, ExternalLink, QrCode } from "lucide-react";
import { useTranslations } from "next-intl";
import QRCodeStyling, { Options } from "qr-code-styling";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const QRCodesStyles = ["Square", "Circle"] as const;

interface GeneratorProps {
  qrSize: number;
  qrLevel: "L" | "M" | "Q" | "H";
  includeMargin: boolean;
  foregroundColor: string;
  backgroundColor: string;
  qrShape: "square" | "circle";
  setQrSize: (size: number) => void;
  setQrLevel: (level: "L" | "M" | "Q" | "H") => void;
  setIncludeMargin: (margin: boolean) => void;
  setQrShape: (shape: "square" | "circle") => void;
}

export default function Generator({
  qrSize,
  qrLevel,
  includeMargin,
  foregroundColor,
  backgroundColor,
  qrShape,
  setQrSize,
  setQrLevel,
  setIncludeMargin,
  setQrShape,
}: GeneratorProps) {
  const t = useTranslations("QRGenerator");
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrCodeInstanceRef = useRef<QRCodeStyling | null>(null);

  const [url, setUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("https://example.com");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get the current URL to display (user input or default)
  const getCurrentUrl = () => {
    return url.trim() ? generatedUrl : "";
  };

  const handleGenerate = () => {
    if (!url.trim()) {
      toast.error(t("validation.urlRequired"));
      return;
    }

    // Validate URL
    let validUrl = url;
    try {
      new URL(url);
    } catch {
      // If it's not a valid URL, try adding https://
      const urlWithProtocol = url.startsWith("http") ? url : `https://${url}`;
      try {
        new URL(urlWithProtocol);
        validUrl = urlWithProtocol;
      } catch {
        toast.error(t("validation.invalidUrl"));
        return;
      }
    }

    setGeneratedUrl(validUrl);
  };

  // Regenerate QR code when settings change
  useEffect(() => {
    if (qrCodeRef.current) {
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
            rx: size / 2, // Makes it circular
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

        if (logoUrl) {
          // NOTE: Logo should be 20% of QR size, max 60px
          const logoSize = Math.min(size * 0.2, 60);
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
          logoImage.setAttribute("height", logoSize.toString());
          logoImage.setAttribute("preserveAspectRatio", "xMidYMid meet");

          svg.appendChild(logoBackground);
          svg.appendChild(logoImage);
        }
      };

      const options: Partial<Options> = {
        width: qrSize,
        height: qrSize,
        type: "svg",
        data: getCurrentUrl(),
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
        },
      };

      const qrCodeInstance = new QRCodeStyling(options);

      qrCodeInstance.applyExtension(extension);

      qrCodeRef.current.innerHTML = "";
      qrCodeInstance.append(qrCodeRef.current);
      qrCodeInstanceRef.current = qrCodeInstance;
    }
  }, [
    url,
    generatedUrl,
    qrSize,
    qrLevel,
    includeMargin,
    foregroundColor,
    backgroundColor,
    qrShape,
    logoUrl,
    getCurrentUrl,
  ]);

  const handleDownload = () => {
    if (!qrCodeInstanceRef.current) return;
    try {
      qrCodeInstanceRef.current.download({
        name: `qr-code-${Date.now()}`,
        extension: "png",
      });
      toast.success(t("toast.downloadSuccess"));
    } catch (error) {
      toast.error(t("toast.downloadError"));
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(getCurrentUrl());
    toast.success(t("toast.copySuccess"));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error(t("toast.invalidFileType"));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t("toast.fileTooLarge"));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoUrl(result);
        toast.success(t("toast.logoUploadSuccess"));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success(t("toast.logoRemoved"));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Form */}
      <Card className="max-h-max">
        <CardHeader>
          <CardTitle>{t("form.title")}</CardTitle>
          <CardDescription>{t("form.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url" className="mb-3">
              {t("form.urlLabel")}
            </Label>
            <Input
              id="url"
              type="url"
              placeholder={t("form.urlPlaceholder")}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="size" className="mb-3">
                {t("form.sizeLabel")}
              </Label>
              <Input
                id="size"
                type="number"
                min="100"
                max="600"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="level" className="mb-3 w-full">
                {t("form.levelLabel")}
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
                  <SelectItem value="L">{t("form.levels.low")}</SelectItem>
                  <SelectItem value="M">{t("form.levels.medium")}</SelectItem>
                  <SelectItem value="Q">{t("form.levels.quartile")}</SelectItem>
                  <SelectItem value="H">{t("form.levels.high")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                id="margin"
                checked={includeMargin}
                onChange={(e) => setIncludeMargin(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="margin" className="mb-3">
                {t("form.includeMargin")}
              </Label>
            </div>

            <div className="space-y-2">
              <Label className="mb-3">{t("customize.shapeLabel")}</Label>
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
                      className="flex items-center space-x-2"
                    >
                      <div className="w-3 h-3 border-2 border-current rounded-sm" />
                      <span>{t(`customize.shape${style}`)}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="mb-3">{t("form.logoLabel")}</Label>
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
                  {logoUrl ? t("form.changeLogo") : t("form.uploadLogo")}
                </Button>
                {logoUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={removeLogo}
                    className="px-3"
                  >
                    {t("form.removeLogo")}
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
                    {t("form.logoPreview")}
                  </span>
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            className="w-full bg-deep-blue-gray hover:bg-deep-blue-gray"
            size="lg"
          >
            <QrCode className="w-4 h-4 me-2" />
            {t("form.generateButton")}
          </Button>
        </CardContent>
      </Card>

      {/* QR Code Display */}
      <Card>
        <CardHeader>
          <CardTitle>{t("preview.title")}</CardTitle>
          <CardDescription>{t("preview.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {url.trim() ? (
            <>
              <div className="flex justify-center p-6 bg-white rounded-lg border-2 border-dashed border-gray-200">
                <div
                  ref={qrCodeRef}
                  style={{
                    width: qrSize,
                    height: qrSize,
                  }}
                />
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">
                    {t("preview.urlLabel")}
                  </p>
                  <p className="text-sm font-mono break-all">
                    {getCurrentUrl()}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    onClick={handleDownload}
                    className="w-full"
                  >
                    <Download className="w-4 h-4 me-2" />
                    {t("actions.download")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCopyUrl}
                    className="w-full"
                  >
                    <Copy className="w-4 h-4 me-2" />
                    {t("actions.copyUrl")}
                  </Button>
                </div>

                <Button
                  variant="outline"
                  onClick={() => window.open(getCurrentUrl(), "_blank")}
                  className="w-full"
                >
                  <ExternalLink className="w-4 h-4 me-2" />
                  {t("actions.openUrl")}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <QrCode className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500">{t("preview.placeholder")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
