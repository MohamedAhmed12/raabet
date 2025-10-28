import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardChromPicker } from "@/app/[locale]/(protected)/dashboard/admin/profile/links/components/DashboardChromPicker";
import { Circle, Palette, Square } from "lucide-react";
import { useTranslations } from "next-intl";
import QRCodeStyling, { Options } from "qr-code-styling";
import { useEffect, useRef } from "react";

const QRCodesStyles = ["Square", "Circle"] as const;

interface CustomizeProps {
  foregroundColor: string;
  backgroundColor: string;
  qrShape: "square" | "circle";
  setForegroundColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setQrShape: (shape: "square" | "circle") => void;
  qrLevel: "L" | "M" | "Q" | "H";
  includeMargin: boolean;
}

export default function Customize({
  foregroundColor,
  backgroundColor,
  qrShape,
  setForegroundColor,
  setBackgroundColor,
  setQrShape,
  qrLevel,
  includeMargin,
}: CustomizeProps) {
  const t = useTranslations("QR");
  const previewQrCodeRef = useRef<HTMLDivElement>(null);

  // Regenerate preview QR code when settings change
  useEffect(() => {
    if (previewQrCodeRef.current) {
      // Extension to add border for circular QR codes
      const extension = (svg: SVGElement, options: Options) => {
        if (qrShape !== "circle") return;

        const { width = 200, height = 200 } = options;
        const size = Math.min(width, height);
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
      };

      const options: Partial<Options> = {
        width: 200,
        height: 200,
        type: "svg",
        data: "https://example.com",
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

      if (qrShape === "circle") {
        qrCodeInstance.applyExtension(extension);
      }

      previewQrCodeRef.current.innerHTML = "";
      qrCodeInstance.append(previewQrCodeRef.current);
    }
  }, [qrLevel, includeMargin, foregroundColor, backgroundColor, qrShape]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Palette className="w-5 h-5" />
          <span>{t("customize.title")}</span>
        </CardTitle>
        <CardDescription>{t("customize.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <DashboardChromPicker
              label={t("customize.foregroundLabel")}
              currentColor={foregroundColor}
              onChangeComplete={setForegroundColor}
            />
          </div>
          <div className="space-y-2">
            <DashboardChromPicker
              label={t("customize.backgroundLabel")}
              currentColor={backgroundColor}
              onChangeComplete={setBackgroundColor}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="mb-3">{t("customize.shapeLabel")}</Label>
          <Tabs
            value={qrShape}
            onValueChange={(value) => setQrShape(value as "square" | "circle")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              {QRCodesStyles.map((style) => (
                <TabsTrigger
                  key={style}
                  value={style.toLowerCase()}
                  className="flex items-center space-x-2"
                >
                  {style === "Square" ? <Square /> : <Circle />}
                  <span>{t(`customize.shape${style}`)}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">
            {t("customize.preview")}
          </h3>
          <div className="flex justify-center p-6 bg-white rounded-lg border-2 border-dashed border-gray-200">
            <div
              ref={previewQrCodeRef}
              style={{
                width: 200,
                height: 200,
                maxHeight: 200,
                maxWidth: 200,
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
