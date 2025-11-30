"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Link } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useGiveFeedback } from "../hooks/useGiveFeedback";
import { useUpdateFeedbackTimestamp } from "../hooks/useUpdateFeedbackTimestamp";
import { useSubscriptionStatus } from "../subscription/callback/useSubscriptionStatus";

interface FeedbackPopupProps {
  shouldBeOpen: boolean;
  setShouldBeOpen: (open: boolean) => void;
}

export default function FeedbackPopup({
  shouldBeOpen,
  setShouldBeOpen,
}: FeedbackPopupProps) {
  const [rating, setRating] = useState(0);
  const [highlight, setHighlight] = useState("feature");
  const [message, setMessage] = useState("");
  const [promoCode, setPromoCode] = useState<string | null>(null);

  const locale = useLocale();
  const t = useTranslations();
  const session = useSession();
  const fontClass = getFontClassClient(locale);
  const queryClient = useQueryClient();

  // @ts-expect-error: [to access user data in session it exists in id]
  const userId = session?.data?.user?.id?.id as string;

  // Get link data from QueryClient cache (without refetching)
  const cachedLinkData = queryClient.getQueryData<Link>(["link", { userId }]);

  const linkId = cachedLinkData?.id as string;

  const { data: sessionStatus } = useSubscriptionStatus({
    email: session?.data?.user?.email || "",
  });

  const { mutate: updateFeedbackTimestamp } = useUpdateFeedbackTimestamp();
  const { mutateAsync: giveFeedback, isPending } = useGiveFeedback({
    onSuccess: () => {
      toast.success(t("FeedbackPopup.submitSuccess"));
    },
    onError: () => {
      toast.error(t("NotFoundPage.something_went_wrong"));
    },
  });

  const feedbackSchema = useMemo(
    () =>
      z.object({
        rating: z.number().min(1, t("FeedbackPopup.validation.ratingRequired")),
        highlight: z
          .string()
          .min(1, t("FeedbackPopup.validation.highlightRequired")),
        message: z
          .string()
          .min(1, t("FeedbackPopup.validation.messageRequired"))
          .max(1000, t("FeedbackPopup.validation.messageTooLong")),
      }),
    [t]
  );

  const submitFeedback = async () => {
    // Validate form data
    const validate = feedbackSchema.safeParse({
      rating,
      highlight,
      message,
    });

    if (!validate.success) {
      // Show first validation error
      const firstError = validate.error.errors[0];
      console.error(firstError, "firstError");
      toast.error(firstError.message);
      return;
    }

    // If validation passes, submit the feedback
    if (!linkId) {
      return;
    }

    const result = await giveFeedback({
      linkId: linkId as string,
      rating,
      highlight,
      feedback: message,
    });

    if (!result.success) {
      toast.error(t("NotFoundPage.something_went_wrong"));
      return;
    }

    if (result?.promoCode) {
      // To DO send by email
      setPromoCode(result.promoCode);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Optimistically update cache with current timestamp to prevent immediate reopening
      if (cachedLinkData && linkId) {
        const now = new Date();
        queryClient.setQueryData<Link>(["link", { userId }], {
          ...cachedLinkData,
          last_feedback_ts: now,
        });

        // Update timestamp in background (fire-and-forget)
        updateFeedbackTimestamp(
          { linkId },
          {
            onError: (error) => {
              console.error("Failed to update feedback timestamp:", error);
              // Rollback optimistic update on error
              queryClient.setQueryData<Link>(
                ["link", { userId }],
                cachedLinkData
              );
            },
          }
        );
      }

      setShouldBeOpen(false);
    }
  };

  return (
    <Dialog open={shouldBeOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "flex flex-col justify-center items-center px-5 gap-0",
          fontClass,
          promoCode ? "!max-w-2xl" : ""
        )}
      >
        {!promoCode && (
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              {t("FeedbackPopup.title")}
            </DialogTitle>
            <DialogDescription className="text-center px-10 mb-4">
              {t("FeedbackPopup.description")}
            </DialogDescription>
          </DialogHeader>
        )}

        {!promoCode ? (
          <div className="flex flex-col w-full my-4">
            <div className="mb-4">
              <Label className="text-sm font-semibold uppercase">
                {t("FeedbackPopup.rateExperience")}
              </Label>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    onClick={() => setRating(i)}
                    className={`w-6 h-6 cursor-pointer transition-colors ${
                      i <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill={i <= rating ? "#facc15" : "none"}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <Label className="text-sm font-semibold uppercase">
                {t("FeedbackPopup.highlightLabel")}
              </Label>

              <RadioGroup
                value={highlight}
                onValueChange={setHighlight}
                className={cn(
                  "flex flex-col mt-2 space-y-2 items-start justify-start"
                )}
                dir={locale === "ar" ? "rtl" : "ltr"}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="feature" id="feature" />
                  <Label htmlFor="feature">{t("FeedbackPopup.feature")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="issue" id="issue" />
                  <Label htmlFor="issue">{t("FeedbackPopup.issue")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">{t("FeedbackPopup.other")}</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-4">
              <Label className="text-sm font-semibold uppercase">
                {t("FeedbackPopup.messageLabel")}
              </Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("FeedbackPopup.messagePlaceholder")}
                className="mt-1"
              />
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "text-center flex flex-col w-full gap-y-2 justify-center items-center ",
              sessionStatus !== "active" ? "px-20 py-6" : "px-5 py-6"
            )}
          >
            {sessionStatus !== "active" ? (
              <>
                <Label className="font-semibold uppercase text-2xl">
                  {t("FeedbackPopup.promoCode")}
                </Label>

                <div className="flex justify-center items-center">
                  <Input
                    value={promoCode}
                    readOnly
                    className="text-center py-8 !text-2xl"
                  />
                </div>
              </>
            ) : (
              <span className="text-xl">
                {t("FeedbackPopup.discountAlreadyApplied")}
              </span>
            )}
          </div>
        )}

        {!promoCode && (
          <DialogFooter className="mt-4">
            <Button
              onClick={submitFeedback}
              className="bg-deep-blue-gray hover:bg-deep-blue-gray text-white px-6 py-5 rounded-4xl font-bold leading-none !min-w-[100px]"
            >
              {isPending ? (
                <LoaderCircle className="animate-spin" size={20} />
              ) : (
                t("FeedbackPopup.submit")
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
