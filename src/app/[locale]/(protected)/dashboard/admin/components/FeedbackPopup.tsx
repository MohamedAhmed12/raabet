"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useGiveFeedback } from "../hooks/useGiveFeedback";
import { useUpdateFeedbackTimestamp } from "../hooks/useUpdateFeedbackTimestamp";

export default function FeedbackPopup({
  onOpenFeedbackPopup,
}: {
  onOpenFeedbackPopup: (open: boolean) => void;
}) {
  const [rating, setRating] = useState(0);
  const [highlight, setHighlight] = useState("feature");
  const [message, setMessage] = useState("");

  const locale = useLocale();
  const t = useTranslations();
  const linkId = useLinkStore((state) => state.link.id);

  const { mutate: updateFeedbackTimestamp } = useUpdateFeedbackTimestamp();
  const { mutate: giveFeedback } = useGiveFeedback({
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
    []
  );

  const submitFeedback = () => {
    // Validate form data
    const result = feedbackSchema.safeParse({
      rating,
      highlight,
      message,
    });

    if (!result.success) {
      // Show first validation error
      const firstError = result.error.errors[0];
      console.error(firstError, "firstError");
      toast.error(firstError.message);
      return;
    }

    // If validation passes, submit the feedback
    giveFeedback({
      linkId,
      rating,
      highlight,
      feedback: message,
    });

    handleOnOpenChange(false);
  };

  const handleOnOpenChange = (open: boolean) => {
    updateFeedbackTimestamp({ linkId });
    onOpenFeedbackPopup(open);
  };

  return (
    <Dialog open={true} onOpenChange={handleOnOpenChange}>
      <DialogContent className="flex flex-col justify-center items-center max-w-md font-noto-sans px-5">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl mb-4">
            {t("FeedbackPopup.title")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col w-full gap-y-2">
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

        <DialogFooter className="mt-4">
          <Button
            onClick={submitFeedback}
            className="bg-deep-blue-gray hover:bg-deep-blue-gray text-white px-6 py-5 rounded-4xl font-bold leading-none"
          >
            {t("FeedbackPopup.submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
