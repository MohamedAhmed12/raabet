import { Copy, Download, QrCode } from "lucide-react";
import { useTranslations } from "next-intl";

const features = [
  {
    icon: QrCode,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
    titleKey: "features.fast.title",
    descriptionKey: "features.fast.description",
  },
  {
    icon: Download,
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
    titleKey: "features.download.title",
    descriptionKey: "features.download.description",
  },
  {
    icon: Copy,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100",
    titleKey: "features.copy.title",
    descriptionKey: "features.copy.description",
  },
];

export default function WhyOurQR() {
  const t = useTranslations("QRGenerator");

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
        {t("features.title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={index}
              className="text-center p-6 bg-white backdrop-blur-sm rounded-xl border border-white/20"
            >
              <div
                className={`w-12 h-12 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {t(feature.titleKey)}
              </h3>
              <p className="text-gray-600 text-sm">
                {t(feature.descriptionKey)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
