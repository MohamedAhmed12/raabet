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
import { Settings as SettingsIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface SettingsProps {
  qrSize: number;
  setQrSize: (size: number) => void;
  qrLevel: "L" | "M" | "Q" | "H";
  setQrLevel: (level: "L" | "M" | "Q" | "H") => void;
  includeMargin: boolean;
  setIncludeMargin: (margin: boolean) => void;
}

export default function Settings({
  qrSize,
  setQrSize,
  qrLevel,
  setQrLevel,
  includeMargin,
  setIncludeMargin,
}: SettingsProps) {
  const t = useTranslations("QRGenerator");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          <SettingsIcon className="w-5 h-5" />
          <span>{t("settings.title")}</span>
        </CardTitle>
        <CardDescription>{t("settings.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">
            {t("errorCorrection.explanation.title")}
          </h4>
          <p className="text-sm text-gray-600">
            {t("errorCorrection.explanation.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="size-setting">{t("settings.sizeLabel")}</Label>
            <Input
              id="size-setting"
              type="number"
              min="100"
              max="600"
              value={qrSize}
              onChange={(e) => setQrSize(Number(e.target.value))}
            />
            <p className="text-sm text-gray-500">{t("settings.sizeHelper")}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="level-setting">
              {t("settings.errorCorrectionLabel")}
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
                <SelectItem value="L">
                  {t("errorCorrection.low.title")}
                </SelectItem>
                <SelectItem value="M">
                  {t("errorCorrection.medium.title")}
                </SelectItem>
                <SelectItem value="Q">
                  {t("errorCorrection.quartile.title")}
                </SelectItem>
                <SelectItem value="H">
                  {t("errorCorrection.high.title")}
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Dynamic helper message based on selected level */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md mt-3">
              <p className="text-sm text-blue-800 font-medium mb-1">
                {qrLevel === "L" && t("errorCorrection.low.title")}
                {qrLevel === "M" && t("errorCorrection.medium.title")}
                {qrLevel === "Q" && t("errorCorrection.quartile.title")}
                {qrLevel === "H" && t("errorCorrection.high.title")}
              </p>
              <p className="text-sm text-blue-700">
                {qrLevel === "L" && t("errorCorrection.low.description")}
                {qrLevel === "M" && t("errorCorrection.medium.description")}
                {qrLevel === "Q" && t("errorCorrection.quartile.description")}
                {qrLevel === "H" && t("errorCorrection.high.description")}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="margin-setting"
              checked={includeMargin}
              onChange={(e) => setIncludeMargin(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="margin-setting">{t("settings.marginLabel")}</Label>
          </div>
          <p className="text-sm text-gray-500">{t("settings.marginHelper")}</p>
        </div>
      </CardContent>
    </Card>
  );
}
