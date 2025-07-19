"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";

export default function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const t = useTranslations();
  const resetPasswordSchema = z.object({
    password: z.string().min(6, t("Shared.passwordMinLimit")),
  });

  type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch("/api/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: data.password }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      router.replace("/auth/login");
    } catch (error: unknown) {
      setError((error as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 font-noto-sans w-7xl max-w-[650px]">
      <div className="flex justify-center items-center w-full px-11 py-5">
        <h2 className="text-[32px] text-center">{t("Auth.resetPassword")}</h2>
      </div>
      <div className="w-full p-[22px]">
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn("space-y-4", className)}
          {...props}
        >
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 text-sm">
              {t("Auth.password")}
            </label>
            <Input
              type="password"
              placeholder={t("Auth.enterYourNewPassword")}
              {...register("password")}
              required
              className="px-4 py-2 border rounded-md text-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? t("Shared.resetting") : t("Shared.reset")}
          </Button>
        </form>
      </div>
    </div>
  );
}
