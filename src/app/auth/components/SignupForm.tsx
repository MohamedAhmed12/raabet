"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/app/actions/auth";
import { cn } from "@/lib/cn";
import Link from "next/link";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    // setLoading(true);
    const result = await signup(data);

    if (result?.error) {
      setError(result.error);
      // setloadin(false)
    } else {
      // setloadin(false)
      router.push("/auth/login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("flex flex-col ", className)}
        {...props}
      >
        <div className="flex flex-col justify-center items-center font-noto-sans">
          <div className="mb-6 text-[40px] text-deep-blue-gray font-bold leading-[1.1] pb-3">
            <span>Join </span>
            <span className="relative">
              <span className="relative inline-block z-[1]">Liinks</span>
              <div className="absolute inset-0 top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%] bg-sky-300"></div>
            </span>
          </div>
          <div className="mb-6 text-lg text-center">
            Over 10,000 artists, creators, business owners, and more use Liinks
            to centralize their online presence.
          </div>
        </div>
        <div className="grid gap-3">
          <div className="grid">
            <Input
              id="Full Name"
              type="name"
              {...register("fullname")}
              placeholder="Full Name"
              required
            />{" "}
            {errors.fullname && (
              <p className="text-red-500">{errors.fullname.message}</p>
            )}
          </div>
          <div className="grid">
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Email"
              required
            />{" "}
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid">
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="password"
              required
            />{" "}
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="flex  ">
            <a href="#" className="text-xs pr-0.5 pl-20 ">
              By joining, you agree to our
            </a>
            <a href="#" className="text-xs underline underline-offset-4 px-0.5">
              terms
            </a>
            <a href="#" className="text-xs px-0.5">
              and
            </a>
            <a href="#" className="text-xs underline underline-offset-4 px-0.5">
              privacy policy.
            </a>
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </div>
        <div className="text-center text-xs ">
          Already have an account?
          <Link href="/auth/login">
            <span className="underline underline-offset-4 px-1">Sign In.</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
