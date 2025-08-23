"use client";

import { signup } from "@/app/[locale]/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { getFontClassClient } from "@/lib/fonts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signupSchema = z.object({
  fullname: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations();
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      const signUpResult = await signup(data);

      if (signUpResult?.ok) {
        const logInResult = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        if (logInResult?.ok) {
          return router.replace("/dashboard/admin/profile/links");
        }
      } else {
        setIsLoading(false);
      }

      setError(signUpResult?.error);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "max-w-md mx-auto mt-10 p-6 border rounded-lg shadow",
        fontClass
      )}
    >
      <h2 className="text-2xl font-semibold mb-4">{t("Auth.signUp")}</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("flex flex-col ", className)}
        {...props}
      >
        <div className="flex flex-col justify-center items-center">
          <div className="flex gap-3 mb-6 text-[40px] text-deep-blue-gray font-bold leading-[1.1] pb-3">
            <span>{t("Auth.join")}</span>
            <span className="relative">
              <span className="relative inline-block z-[1]">Rabet</span>
              <div className="h-[15px] absolute inset-0 top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%] bg-sky-300"></div>
            </span>
          </div>
          <div className="mb-6 text-lg text-center">
            {t("Auth.signUpDescription")}
          </div>
        </div>
        <div className="grid gap-3">
          <div className="grid">
            <Input
              id="Full Name"
              type="name"
              {...register("fullname")}
              placeholder={t("Auth.fullname")}
              required
            />{" "}
            {errors.fullname && (
              <p className="text-red-500">{errors.fullname.message}</p>
            )}
          </div>
          <div className="grid">
            <Input
              id="email"
              type="text"
              {...register("email")}
              placeholder={t("Shared.email")}
              required
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid">
            <div className="flex relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder={t("Auth.password")}
                required
              />
              <button
                type="button"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="!text-xs text-gray-400 font-medium flex justify-center items-center gap-2">
            {t("Auth.joining")}
            <Link
              href="/terms"
              className="!text-xs underline underline-offset-4"
            >
              {t("Auth.terms")}
            </Link>
            {t("Auth.and")}
            <Link
              href="/privacy"
              className="!text-xs underline underline-offset-4"
            >
              {t("Auth.privacy")}
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-400 cursor-pointer !text-lg"
          >
            {isLoading ? (
              <Loader2 className="w-15 h-15 animate-spin" />
            ) : (
              t("Auth.signUp")
            )}
          </Button>
        </div>
        <div className="inline-flex gap-1 justify-center text-xs mt-3">
          {t("Auth.alreadyHaveAcc")}
          <Link href="/auth/login">
            <span className="underline underline-offset-4">
              {t("Auth.signIn")}
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
