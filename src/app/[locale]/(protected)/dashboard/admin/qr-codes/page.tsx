"use client";

import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { toast } from "sonner";
import { MainTitle } from "../profile/settings/components/MainTitle";
import { NewQRCodeDialog } from "./components/NewQRCodeDialog";
import QRCodeCard from "./components/QRCodeCard";
import { useQRCodeStore } from "./store/qrCodeStore";

export default function QRCodes() {
  const t = useTranslations("QR");
  const session = useSession();

  // @ts-expect-error: [to access user data in session it exists in id]
  const userId = session?.data?.user?.id?.id as string;
  const { qrCodes, isLoading, error, fetchQRCodeList } = useQRCodeStore();

  useEffect(() => {
    fetchQRCodeList(userId);
  }, [userId, fetchQRCodeList]);

  return (
    <div className="flex flex-col gap-6 justify-between items-center w-full max-w-[1200px]">
      <MainTitle title={t("title")} subTitle={t("subTitle")}></MainTitle>
      <NewQRCodeDialog />

      {error && (
        <div className="text-red-700 text-center text-2xl mt-[5rem]">
          Something went wrong while listing QR codes!
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 flex-wrap w-150">
          {qrCodes.map((qr) => (
            <QRCodeCard
              key={qr.id}
              qr={qr}
              onDelete={() => {
                fetchQRCodeList(userId);
                toast.success("QR code deleted successfully");
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
