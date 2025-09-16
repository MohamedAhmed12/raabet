"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { GCSFileLoader } from "../profile/links/components/LinkBuilderSidebar/GCSFileLoader";
import { createStripeCustomerSession } from "./actions/createStripeCustomerSession";
import { useCoupon } from "./hooks/useCoupon";
import { useUploadScreenshot } from "./hooks/useUploadScreenshot";

interface SubscriptionFormProps {
  refetch: () => void;
}

export default function SubscriptionForm({ refetch }: SubscriptionFormProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showManualPayment, setShowManualPayment] = useState(false);
  const [isUploadingInvoice, setIsUploadingInvoice] = useState(false);
  const [uploadedInvoice, setUploadedInvoice] = useState<string | null>(null);

  const t = useTranslations();
  const locale = useLocale();
  const { data: session, update } = useSession();
  const { linkId, userId } = useLinkStore(
    useShallow((state) => ({
      linkId: state.link.id,
      userId: state.link.user?.id,
    }))
  );

  // @ts-expect-error: [to access user data in session it exists in id]
  const sessionUser = useMemo(() => session?.user?.id, [session?.user?.id]);
  const { data: coupon } = useCoupon(sessionUser?.id);
  const feesToPay = useMemo(() => {
    return (
      ((coupon?.value || 0) / 100) *
      parseFloat(process.env.NEXT_PUBLIC_SUBSCRIPTION_VALUE || "0")
    );
  }, [coupon?.value]);

  const { mutateAsync: uploadScreenshot, isPending } = useUploadScreenshot({
    onSuccess: () => {
      // Clear any existing timeout to prevent memory leaks
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        refetch();
        timeoutRef.current = null;
      }, 1500);
    },
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const fetchClientSecret = useCallback(async () => {
    try {
      const result = await createStripeCustomerSession();

      setClientSecret(result?.clientSecret);

      if (result?.user && sessionUser) {
        await update({
          ...sessionUser,
          ...result?.user,
        });
      }
    } catch (error) {
      console.error("Failed to create Stripe customer session:", error);
    }
  }, [sessionUser, update]);

  useEffect(() => {
    // Only fetch client secret if subscription is not active
    if (!clientSecret) {
      fetchClientSecret();
    }
  }, [sessionUser, fetchClientSecret, clientSecret]);

  const handleFileUploader = useMemo(
    () => async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.[0];

      if (file) {
        try {
          setIsUploadingInvoice(true);
          // Generate a unique filename with user ID and date
          const fileExtension = file.name.split(".").pop();
          const fileName = `invoice_${Date.now()}.${fileExtension}`;
          const humanDate = format(Date.now(), "d-M-yyyy");
          const filePath = `invoices/${humanDate}/${userId}/${fileName}`;

          const publicUrl = await GCSFileLoader(linkId, file, filePath);
          setUploadedInvoice(publicUrl);

          await uploadScreenshot(publicUrl);
          toast.success(t("Subscription.InvoiceUploadedSuccessfully"));
        } catch (error) {
          console.error("Upload V-Cash or Instapay failed:", error);
          toast.error(t("Subscription.InvoiceUploadFailed"));
        } finally {
          setIsUploadingInvoice(false);
        }
      }
    },
    [linkId, userId, uploadScreenshot, t]
  );

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
                {isPending || isUploadingInvoice
                  ? t("LinksPage.generalStyles.header.uploading")
                  : t("Subscription.uploadInvoice")}
              </span>
              {!isPending && !isUploadingInvoice && (
                <Upload className="size-5" />
              )}
              {(isPending || isUploadingInvoice) && (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
              )}
            </label>
            <Input
              id="custom_logo"
              type="file"
              className="hidden"
              onChange={handleFileUploader}
            />

            {coupon && (
              <p className="mt-1 ms-1 text-gray-400">
                {t("Subscription.couponHelperTxt", { feesToPay })}
              </p>
            )}
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
              priority
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
