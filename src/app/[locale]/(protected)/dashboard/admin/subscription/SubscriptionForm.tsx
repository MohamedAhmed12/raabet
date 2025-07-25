"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SubscriptionStatus } from "@prisma/client";
import { Upload } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUploadScreenshot } from "./hooks/useUploadScreenshot";
import { createStripeCustomerSession } from "./actions/createStripeCustomerSession";
import { GCSFileLoader } from "../profile/links/components/LinkBuilderSidebar/GCSFileLoader";
import { toast } from "sonner";

interface SubscriptionFormProps {
  status: SubscriptionStatus;
}

export default function SubscriptionForm({ status }: SubscriptionFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showManualPayment, setShowManualPayment] = useState(false);
  const [uploadedInvoice, setUploadedInvoice] = useState<string | null>(null);
  const { mutate: uploadScreenshot, isPending } = useUploadScreenshot();

  const t = useTranslations();
  const locale = useLocale();
  const linkId = useLinkStore((state) => state.link.id);

  useEffect(() => {
    async function fetchClientSecret() {
      try {
        const result = await createStripeCustomerSession();
        setClientSecret(result?.clientSecret);
      } catch (error) {
        console.error("Failed to create Stripe customer session:", error);
      }
    }

    // Only fetch client secret if subscription is not active
    if (status !== "active") {
      fetchClientSecret();
    }
  }, [status]);

  const handleFileUploader = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    if (file) {
      try {
        // Generate a unique filename with user ID and date
        const fileExtension = file.name.split(".").pop();
        const fileName = `invoice_${Date.now()}.${fileExtension}`;
        const filePath = `invoices/${linkId}/${fileName}`;

        const publicUrl = await GCSFileLoader(linkId, file, filePath);
        setUploadedInvoice(publicUrl);

        await uploadScreenshot(publicUrl);

        toast.success(t("Subscription.InvoiceUploadedSuccessfully"));
      } catch (error) {
        console.error("Upload V-Cash or Instapay failed:", error);
        toast.error(t("Subscription.InvoiceUploadFailed"));
      }
    }
  };

  const handleSwitchPaymentMethod = () => {
    setShowManualPayment((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      {showManualPayment ? (
        <div
          className="w-full flex gap-3 justify-center items-center"
          style={{ minHeight: "inherit" }}
        >
          {/* upload V-Cash & Instapay Invoice button */}
          <div className="w-[40%] max-w-[400px]">
            <label
              htmlFor="custom_logo"
              className="file-upload-label text-sm flex items-center justify-between gap-2 px-4 p-3 relative border rounded-lg bg-white shadow-sm cursor-pointer"
            >
              <span className="capitalize">
                {isPending
                  ? t("LinksPage.generalStyles.header.uploading")
                  : t("Subscription.uploadInvoice")}
              </span>
              {!isPending && <Upload className="size-5" />}
              {isPending && (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
              )}
            </label>
            <Input
              id="custom_logo"
              type="file"
              className="hidden"
              onChange={handleFileUploader}
            />
          </div>

          {/* V-Cash & Instapay Preview Box */}
          <label
            htmlFor="custom_logo"
            className="relative min-w-xs border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
            style={{ minHeight: "inherit" }}
          >
            {uploadedInvoice ? (
              <Image src={uploadedInvoice} alt="Invoice preview" fill />
            ) : (
              <span className="text-lg text-gray-400 text-center w-[70%]">
                {t("Subscription.uploadInvoiceHelperTxt")}
              </span>
            )}
          </label>
        </div>
      ) : (
        clientSecret && (
          <stripe-pricing-table
            className={cn("", `${locale}-stripe`)}
            pricing-table-id={
              locale === "ar"
                ? process.env.NEXT_PUBLIC_STRIPE_AR_PRICING_TABLE_ID
                : process.env.NEXT_PUBLIC_STRIPE_ENG_PRICING_TABLE_ID
            }
            publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
            customer-session-client-secret={clientSecret}
          />
        )
      )}

      <div className="fixed bottom-6 end-6">
        <Button
          variant="ghost"
          className={cn(
            "flex items-center justify-center gap-2 rounded-full p-0 shadow-lg focus:outline-none w-[150px] h-[60px] cursor-pointer hover:bg-gray-200",
            showManualPayment && "bg-[#635BFF] text-white"
          )}
          onClick={handleSwitchPaymentMethod}
        >
          {!showManualPayment ? (
            <Image
              src="/images/instapay-v-cash.png"
              alt="Instapay"
              width={250}
              height={60}
              className="object-cover !w-full !h-full"
            />
          ) : (
            <span className="text-base font-base text-center p-2">
              Pay With <span className="font-extrabold">Stripe</span>
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
