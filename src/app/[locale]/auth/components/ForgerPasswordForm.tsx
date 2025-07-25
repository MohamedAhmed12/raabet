"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
} from "@radix-ui/react-dialog";
import { Icon } from "@/components/Icon";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function ForgetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const t = useTranslations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/forgotPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: email }),
    });

    setLoading(false);

    if (res.ok) {
      setShowModal(true);
    }

    if (res.status == 404) {
      toast.error(t("Shared.userNotFound"));
    }
  };
  const handleClose = () => {
    setShowModal(false);
    router.replace("/");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={cn("flex flex-col font-noto-sans", className)}
        {...props}
      >
        <div className="flex flex-col justify-center items-center">
          <div className="flex gap-5 mb-6 text-[64px] text-deep-blue-gray font-bold leading-[1.1] pb-3">
            <span>{t("Shared.reset")}</span>
            <span className="relative">
              <span className="relative inline-block z-[1] capitalize">
                {t("Auth.password")}
              </span>
              <div className="h-[22px] absolute inset-0 z-0 top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%] bg-purple-300"></div>
            </span>
          </div>
          <div className="mb-6 text-lg">
            {t("Auth.resetPasswordDescription")}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col w-full max-w-xl gap-1.5">
            <Label htmlFor="email" className="pl-1">
              {t("Auth.emailOrUsername")}
            </Label>
            <Input
              type="text"
              id="email"
              placeholder={t("Auth.emailOrUsernamePlaceholder")}
              className="h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full h-11 bg-black hover:bg-black cursor-pointer"
            disabled={loading}
          >
            {loading ? t("Shared.processing") : t("Auth.requestPasswordReset")}
          </Button>
        </div>
      </form>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        {/* ✅ Overlay with blur effect */}
        <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />

        {/* ✅ Modal content with higher z-index */}
        <DialogContent className="flex flex-col items-center max-w-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl transition-all duration-300 z-50 !border-blue-500 !border-2">
          <DialogTitle className="flex flex-col items-center text-lg font-semibold mb-2.5">
            <Icon
              name="circle-check-big"
              size={40}
              className="text-blue-500 mb-4"
            />
            <p className="text-2xl">{t("Auth.passwordResetRequested")}</p>
          </DialogTitle>
          <p className="text-l text-black">
            {t("Auth.passwordResetRequestedDescription")}
          </p>
          <Button
            onClick={handleClose}
            className="mx-2.5 my-4 bg-blue-500 hover:bg-blue-600 text-white"
            size="lg"
          >
            {t("Auth.okay")}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
