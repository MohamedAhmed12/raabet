"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface SubscriptionBannerProps {
  status: string;
}

const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({ status }) => {
  const t = useTranslations();
  if (status === "active" || status === null) return null;

  let message: React.ReactNode = null;
  let conditionalStyle = "";

  switch (status) {
    case "pending":
      message = <>{t("ActivationBanner.pending")}</>;
      conditionalStyle = "bg-amber-200 text-yellow-800";
      break;
    case "none":
    case "trialing":
      message = (
        <>
          {t("ActivationBanner.firstHalf")}
          <Link
            href="/dashboard/admin/subscription"
            className="mx-1 underline font-bold"
          >
            {t("Shared.subscribe")}
          </Link>
          {t("ActivationBanner.secondHalf")}
        </>
      );
      conditionalStyle = "bg-light-orange";
      break;
    case "failed":
    case "canceled":
      message = (
        <>
          {t("ActivationBanner.paymentIssuesFirstHalf")}
          <Link
            href="/dashboard/admin/subscription"
            className="mx-1 underline font-bold"
          >
            {t("Shared.payment")}
          </Link>
          {t("Shared.method")}
        </>
      );
      conditionalStyle = "bg-red-100";
      break;
    default:
      return null;
  }

  return (
    <div
      className={`fixed z-2 flex items-center justify-center w-full p-4 text-center h-[44px] font-semibold text-md border-b-1 font-noto-sans text-deep-blue-gray ${conditionalStyle}`}
    >
      {message}.
    </div>
  );
};

export default SubscriptionBanner;
