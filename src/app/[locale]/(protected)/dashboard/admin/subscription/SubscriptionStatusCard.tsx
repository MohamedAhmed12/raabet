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

interface StatusConfig {
  icon: React.ComponentType<any>;
  color: string;
  title: string;
  description: string;
}

const statusConfigs: Record<SubscriptionStatus, StatusConfig> = {
  active: {
    icon: CheckCircle2,
    color: "text-green-600",
    title: "Active Subscription",
    description:
      "Your subscription is active. You can continue using all features.",
  },
  pending: {
    icon: Clock,
    color: "text-amber-600",
    title: "Subscription Pending",
    description:
      "Your subscription is pending. Please complete the payment process.",
  },
  trialing: {
    icon: CalendarDays,
    color: "text-orange-700",
    title: "You have 14 days trial",
    description: "You are currently on a trial period.",
  },
  canceled: {
    icon: XCircle,
    color: "text-red-600",
    title: "Subscription Canceled",
    description: "Your subscription has been canceled.",
  },
  failed: {
    icon: AlertCircle,
    color: "text-red-600",
    title: "Payment Failed",
    description: "Payment processing failed. Please try again.",
  },
  none: {
    icon: AlertTriangle,
    color: "text-orange-600",
    title: "No Subscription",
    description: "You don't have an active subscription.",
  },
};

export default function SubscriptionStatusCard({
  status,
}: {
  status: SubscriptionStatus;
}): React.ReactElement {
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
