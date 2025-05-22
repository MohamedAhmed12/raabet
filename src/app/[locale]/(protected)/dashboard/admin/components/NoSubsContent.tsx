"use client";

import React from "react";
import { ShieldX } from 'lucide-react';
import { useTranslations } from "next-intl";

interface NoSubsContentProps {
  children: React.ReactNode;
  status: string;
}

export function NoSubsContent({ children, status }: NoSubsContentProps) {
  const t = useTranslations("Subscription");

  if (status === "active") {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center m-auto self-center font-noto-sans">
      <ShieldX className="w-25 h-25 mb-4 text-slate-500" />
      <p className="text-center text-slate-500 font-semibold">
        {t("restricted")}
      </p>
    </div>
  );
}

export default NoSubsContent;
