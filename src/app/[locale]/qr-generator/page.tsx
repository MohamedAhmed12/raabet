"use client";

import { PublicContainer } from "@/components/PublicContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Palette, QrCode, Settings as SettingsIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import Customize from "./components/Customize";
import Generator from "./components/Generator";
import Settings from "./components/Settings";
import WhyOurQR from "./components/WhyOurQR";

export default function QRGeneratorPage() {
  const t = useTranslations("QRGenerator");
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);

  const [qrSize, setQrSize] = useState(256);
  const [qrLevel, setQrLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [includeMargin, setIncludeMargin] = useState(true);
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [qrShape, setQrShape] = useState<"square" | "circle">("square");
  const [activeTab, setActiveTab] = useState("generator");

  return (
    <PublicContainer>
      <div
        className={cn(
          "min-h-screen bg-stone-50",
          fontClass,
          locale === "ar" ? "rtl" : "ltr"
        )}
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center ">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {t("title")}
                </h1>
                <p className="text-sm text-gray-600">{t("description")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <Tabs
            dir={locale === "ar" ? "rtl" : "ltr"}
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="generator"
                className="flex items-center space-x-2"
              >
                <QrCode className="w-4 h-4" />
                <span>{t("tabs.generator")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="customize"
                className="flex items-center space-x-2"
              >
                <Palette className="w-4 h-4" />
                <span>{t("tabs.customize")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center space-x-2"
              >
                <SettingsIcon className="w-4 h-4" />
                <span>{t("tabs.settings")}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generator" className="space-y-6">
              <Generator
                qrSize={qrSize}
                qrLevel={qrLevel}
                includeMargin={includeMargin}
                foregroundColor={foregroundColor}
                backgroundColor={backgroundColor}
                qrShape={qrShape}
                setQrSize={setQrSize}
                setQrLevel={setQrLevel}
                setIncludeMargin={setIncludeMargin}
                setQrShape={setQrShape}
              />
            </TabsContent>

            <TabsContent value="customize" className="space-y-6">
              <Customize
                foregroundColor={foregroundColor}
                backgroundColor={backgroundColor}
                qrShape={qrShape}
                setForegroundColor={setForegroundColor}
                setBackgroundColor={setBackgroundColor}
                setQrShape={setQrShape}
                qrLevel={qrLevel}
                includeMargin={includeMargin}
              />
            </TabsContent>
            <TabsContent value="settings" className="space-y-6">
              <Settings
                qrSize={qrSize}
                setQrSize={setQrSize}
                qrLevel={qrLevel}
                setQrLevel={setQrLevel}
                includeMargin={includeMargin}
                setIncludeMargin={setIncludeMargin}
              />
            </TabsContent>
          </Tabs>

          <WhyOurQR />
        </div>
      </div>
    </PublicContainer>
  );
}
