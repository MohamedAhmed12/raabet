"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

export default function FeedbackPopup() {
  const t = useTranslations("FeedbackPopup");
  const locale = useLocale();
  const [open, setOpen] = useState(true);
  const [rating, setRating] = useState(0);
  const [highlight, setHighlight] = useState("feature");
  const [message, setMessage] = useState("");

  const submitFeedback = () => {
    const feedbackData = {
      rating,
      highlight,
      message,
    };
    console.log("Submitted feedback:", feedbackData);
    setOpen(false);
    // You can send this to your backend or API here
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col justify-center items-center max-w-md font-noto-sans px-5">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl mb-4">
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col w-full gap-y-2">
          <div className="mb-4">
            <Label className="text-sm font-semibold uppercase">
              {t("rateExperience")}
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
              {t("highlightLabel")}
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
                <Label htmlFor="feature">{t("feature")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="issue" id="issue" />
                <Label htmlFor="issue">{t("issue")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">{t("other")}</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="mb-4">
            <Label className="text-sm font-semibold uppercase">
              {t("messageLabel")}
            </Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("messagePlaceholder")}
              className="mt-1"
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            onClick={submitFeedback}
            className="bg-deep-blue-gray hover:bg-deep-blue-gray text-white px-6 py-5 rounded-4xl font-bold leading-none"
            // className="bg-deep-blue-gray text-white px-6 py-3 rounded-4xl font-bold"
          >
            {t("submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
