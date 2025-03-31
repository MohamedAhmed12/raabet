"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { executeAction } from "@/lib/executeAction";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { authOptions } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

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
        redirect: false, // Prevent automatic redirection
      });

      if (result?.error) {
        setError("Invalid email or password"); // Show custom error message
      } else {
        router.push("/dashboard/admin"); // Redirect after successful login
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col", className)}
      {...props}
    >
      <div className="flex flex-col justify-center items-center font-noto-sans">
        <div className="mb-6 text-[40px] text-deep-blue-gray font-bold leading-[1.1] pb-3">
          <span className="pr-2">sign</span>
          <span className="relative">
            <span className="relative inline-block z-[1]">in</span>
            <div className="absolute inset-0 top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%] bg-amber-200"></div>
          </span>
        </div>
        <div className="mb-6 text-lg">
          Welcome back! Sign in to your Raabet account
        </div>
      </div>
      <div className="grid gap-3">
        <div className="grid">
          <Input
            id="email"
            type="email"
            placeholder="Email"
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
            placeholder="Password"
            {...register("password")}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <a href="#" className="text-xs">
          Forgot your password?
        </a>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </div>
      <div className="text-center text-xs">
        Not yet a member?
        <Link href="/auth/sign-up">
          <span className="underline underline-offset-4 px-1">Sign Up.</span>
        </Link>
      </div>
    </form>
  );
};
