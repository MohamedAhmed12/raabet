"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) => {
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async ({ email, password }: LoginFormData) => {
    try {
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: true, // Prevent automatic redirection
        callbackUrl: "/dashboard/admin",
      });

      if (result?.error) {
        setError("Invalid email or password"); // Show custom error message
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col font-noto-sans", className)}
      {...props}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="mb-6 text-[40px] text-deep-blue-gray font-bold leading-[1.1] pb-3">
          <span className="mx-3">{t("Auth.sign")}</span>
          <span className="relative">
            <span className="relative inline-block z-[1]">{t("Auth.in")}</span>
            <div className="absolute inset-0 top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%] bg-amber-200"></div>
          </span>
        </div>
        <div className="mb-6 text-lg">{t("Auth.welcomeBack")}</div>
      </div>
      <div className="grid gap-3">
        <div className="grid">
          <Input
            id="email"
            type="text"
            placeholder={t("Shared.email")}
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="grid">
          <Input
            id="password"
            type="password"
            placeholder={t("Auth.password")}
            {...register("password")}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Link href="/auth/forget-password">
          <span className="cursor-pointer text-xs">
            {t("Auth.forgotPassword")}
          </span>
        </Link>
        <Button
          type="submit"
          className="w-full bg-blue-400 hover:bg-blue-400 cursor-pointer"
        >
          {t("Auth.signIn")}
        </Button>
      </div>
      <div className="text-center text-sm mt-3">
        {t("Auth.notMember")}
        <Link href="/auth/sign-up">
          <span className="underline underline-offset-4 px-1">
            {t("Auth.signUp")}
          </span>
        </Link>
      </div>
    </form>
  );
};
