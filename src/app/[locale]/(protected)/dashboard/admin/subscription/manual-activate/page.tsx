"use client";

import { Badge } from "@/components/ui/badge";
import { UserRole } from "@prisma/client";
import { format } from "date-fns";
import { Loader2, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { useAdminSubscriptionsCheck } from "./hook/useAdminSubscriptionsCheck";
import { useAdminSubscriptionsManualActivate } from "./hook/useAdminSubscriptionsManualActivate";
import { toast } from "sonner";

export default function SubscriptionManualActivatePage() {
  const [userId, setUserId] = useState("");
  const [hasValidCoupon, setHasValidCoupon] = useState(false);
  const session = useSession();
  const router = useRouter();

  // @ts-expect-error: [to access user data in session it exists in id]
  const authUser = session?.data?.user?.id;

  const {
    data: subscription,
    isFetching,
    refetch,
    error,
  } = useAdminSubscriptionsCheck(userId);

  const { mutateAsync: handleManualActivate } =
    useAdminSubscriptionsManualActivate({
      onSuccess: () => {
        refetch();
        toast.success("Subscription manually activated successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  if (authUser?.role === UserRole.USER) {
    return router.replace("/dashboard/admin/profile/links");
  }

  const handleSearch = () => {
    refetch();
  };

  const formatDate = (dateInput?: string | Date | null) => {
    if (!dateInput) return "Not set";
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    return format(date, "PPpp");
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-6xl w-xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Subscription Lookup</h1>
        <p className="text-muted-foreground">
          Enter a user ID to view subscription details
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter user ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border border-input rounded-md px-3 py-2 w-full max-w-md"
        />
        <button
          onClick={handleSearch}
          disabled={!userId || isFetching}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md disabled:opacity-50 flex items-center gap-2 cursor-pointer"
        >
          {isFetching ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          Search
        </button>
        <button
          onClick={() =>
            subscription &&
            handleManualActivate({ subscription, hasValidCoupon })
          }
          disabled={!userId || isFetching}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md disabled:opacity-50 flex items-center gap-2 cursor-pointer"
        >
          {isFetching ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Manual Activate"
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-md">
          {(error as Error).message}
        </div>
      )}

      {subscription?.coupons && subscription.coupons.length > 0 && (
        <div className="flex items-center gap-2">
          <label htmlFor="coupon" className="cursor-pointer">
            Has valid Coupon
          </label>
          <input
            type="checkbox"
            name="coupon"
            id="coupon"
            checked={hasValidCoupon}
            onChange={() => setHasValidCoupon(!hasValidCoupon)}
            className="cursor-pointer"
          />
        </div>
      )}

      {subscription && (
        <div className="border rounded-md p-6 space-y-4">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-lg font-semibold">Subscription Details</h2>
            <Badge
              className="text-lg px-4 py-1.5 rounded-xl"
              variant={subscription.status === "active" ? "success" : "gray"}
            >
              {subscription.status}
            </Badge>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="font-medium">
                {subscription.paymentMethod || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium">
                {subscription.amount !== undefined
                  ? `$${subscription.amount.toFixed(2)}`
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expires At:</span>
              <span className="font-medium">
                {formatDate(subscription.expiresAt)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Stripe Session ID:</span>
              <span className="font-mono text-sm truncate">
                {subscription.stripeSessionId || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created At:</span>
              <span className="font-medium">
                {formatDate(subscription.createdAt)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated:</span>
              <span className="font-medium">
                {formatDate(subscription.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
