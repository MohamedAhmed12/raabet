"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { MainTitle } from "../profile/settings/components/MainTitle";
import { NewQRCodeDialog } from "./components/NewQRCodeDialog";
import QRCodeCard from "./components/QRCodeCard";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { useQRCodeList } from "./hooks/useQRCodeList";

export default function QRCodes() {
  const t = useTranslations("QR");
  const linkId = useLinkStore((state) => state.link.id);
  const { data: qrCodes, isLoading, error } = useQRCodeList();

  return (
    <div className="flex flex-col gap-6 justify-between items-center w-full max-w-[1200px]">
      <MainTitle title={t("title")} subTitle={t("subTitle")}></MainTitle>
      <NewQRCodeDialog />

      {error && (
        <div className="text-red-700 text-center text-2xl mt-[5rem]">
          Something went wrong while listing QR codes!
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      )}

      {qrCodes && (
        <div className="flex flex-col gap-4 flex-wrap w-150">
          {qrCodes.map((qr) => (
            <QRCodeCard
              key={qr.id}
              qr={qr}
            />
          ))}
        </div>
      )}
    </div>
  );
}
