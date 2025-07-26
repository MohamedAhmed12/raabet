"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { createAndSendActivation } from "@/lib/activation";
import { cn } from "@/lib/cn";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function VerifyForm({
  email,
  onVerify,
}: {
  email: string;
  onVerify: () => void;
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendIsLoading, setResendIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);

  const t = useTranslations();
  const session = useSession();

  // @ts-expect-error: session.data may not match Session shape
  const userId = session?.data?.user?.id?.id as string;
  // @ts-expect-error: session.data may not match Session shape
  const fullname = session?.data?.user?.id?.fullname || ("" as string);

  const handleResendEmail = async () => {
    try {
      if (!userId) {
        toast.success(t("NotFoundPage.something_went_wrong"));
        return;
      }
      setResendIsLoading(true);
      await createAndSendActivation({
        userId,
        email,
        fullname,
        supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL as string,
      });
      setResendIsLoading(false);
      toast.success(t("Auth.activationEmailResent"));
    } catch (error) {
      console.error("Error resending activation email:", error);
      toast.error(t("Auth.activationEmailResentFailed"));
    } finally {
      setResendIsLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        setVerified(true);
        setMessage(`✅ ${t("Auth.activationSuccessful")}`);
        onVerify();
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error("Error verifying code:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full mx-auto px-[7vw] py-4">
      <div className="font-noto-sans">
        <div className="flex gap-4 mb-6 text-[40px] text-deep-blue-gray font-bold leading-[1.1] pb-3">
          <span>{t("Auth.confirmYour")}</span>
          <span className="relative ml-1">
            <span className="relative inline-block z-[1]">
              {t("Auth.email")}
            </span>
            <div className="h-[15px] absolute inset-0 top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%] bg-sky-300"></div>
          </span>
        </div>
        <div className="mb-6 text-lg text-center">
          {t("Auth.codeSentTo")}{" "}
          <span className="font-medium text-gray-900">{email}</span>
        </div>
      </div>

      {/* ShadCN OTP Input */}
      <div className="mb-6" dir="ltr">
        <InputOTP
          maxLength={4}
          value={code}
          onChange={(value) => setCode(value)}
        >
          <InputOTPGroup>
            {[...Array(4)].map((_, i) => (
              <InputOTPSlot key={i} index={i} className="w-12 h-12 text-xl" />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      {/* Confirm Button */}
      <Button
        onClick={handleVerify}
        disabled={loading || code.length !== 4 || verified}
        className="w-full h-11 bg-blue-600 hover:bg-blue-700 cursor-pointer"
      >
        {loading ? t("Auth.verifyingButton") : t("Auth.confirmButton")}
      </Button>

      <Separator className="my-[33px]" />

      {/* Message */}
      {message && (
        <p
          className={cn(
            "my-5 text-center",
            message.startsWith("✅") ? "text-green-500" : "text-red-500"
          )}
        >
          {message}
        </p>
      )}

      {/* Support Links */}
      <div className="flex flex-col gap-2 items-center text-sm">
        <div className="inline-flex gap-1">
          <span> {t("Auth.cantFindEmail")}</span>
          <Link
            href=""
            onClick={handleResendEmail}
            className="underline underline-offset-1 flex items-center gap-1"
          >
            {t("Auth.resendEmail")}
            {resendIsLoading && (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            )}
          </Link>
        </div>
        <div className="inline-flex gap-1">
          <span> {t("Auth.enteredWrongEmail")}</span>
          <Link href="/auth/sign-up" className="underline underline-offset-1">
            {t("Auth.changeEmail")}
          </Link>
        </div>
      </div>
    </div>
  );
}
