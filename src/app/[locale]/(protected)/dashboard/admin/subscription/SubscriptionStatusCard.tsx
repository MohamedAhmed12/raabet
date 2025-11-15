"use client";

import { SubscriptionStatus } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  XCircle,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface StatusConfig {
  icon: React.ComponentType<any>;
  color: string;
  title: string;
  description: string;
}

const getStatusConfigs = (t: (key: string) => string): Record<SubscriptionStatus, StatusConfig> => ({
  active: {
    icon: CheckCircle2,
    color: "text-green-600",
    title: t("status.active.title"),
    description: t("status.active.description"),
  },
  pending: {
    icon: Clock,
    color: "text-amber-600",
    title: t("status.pending.title"),
    description: t("status.pending.description"),
  },
  trialing: {
    icon: CalendarDays,
    color: "text-orange-700",
    title: t("status.trialing.title"),
    description: t("status.trialing.description"),
  },
  canceled: {
    icon: XCircle,
    color: "text-red-600",
    title: t("status.canceled.title"),
    description: t("status.canceled.description"),
  },
  failed: {
    icon: AlertCircle,
    color: "text-red-600",
    title: t("status.failed.title"),
    description: t("status.failed.description"),
  },
  none: {
    icon: AlertTriangle,
    color: "text-orange-600",
    title: t("status.none.title"),
    description: t("status.none.description"),
  },
});

export default function SubscriptionStatusCard({
  status,
}: {
  status: SubscriptionStatus;
}): React.ReactElement {
  const t = useTranslations("Subscription");
  const statusConfigs = getStatusConfigs(t);
  const config = statusConfigs[status];
  
  return (
    <div className="flex justify-center items-center pt-[3rem]">
      <Card className="flex justify-center items-center w-[300px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{config.title}</CardTitle>
          <CardDescription>{config.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <config.icon className={config.color} size={40} />
        </CardContent>
      </Card>
    </div>
  );
}
