"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function VerifyForm({ email }: { email: string }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("✅ Activation successful!");
      setTimeout(() => router.replace("/auth/login"), 2000);
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full mx-auto px-[7vw] py-4">
      <div className="font-noto-sans">
        <div className="mb-6 text-[40px] text-deep-blue-gray font-bold leading-[1.1] pb-3">
          <span>Confirm your </span>
          <span className="relative ml-1">
            <span className="relative inline-block z-[1]">email</span>
            <div className="absolute inset-0 top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%] bg-sky-300"></div>
          </span>
        </div>
        <div className="mb-6 text-lg text-center">
          We sent a code to{" "}
          <span className="font-medium text-gray-900">{email}</span>
        </div>
      </div>

      {/* ShadCN OTP Input */}
      <div className="mb-6">
        <InputOTP
          maxLength={4}
          value={code}
          onChange={(value) => setCode(value)}
        >
          <InputOTPGroup>
            {[...Array(4)].map((_, i) => (
              <InputOTPSlot key={i} index={i} className="w-12 h-12 text-xl" />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      {/* Confirm Button */}
      <Button
        onClick={handleVerify}
        disabled={loading || code.length !== 4}
        className="w-full h-11 bg-blue-600 hover:bg-blue-700 cursor-pointer"
      >
        {loading ? "Verifying..." : "Confirm"}
      </Button>

      <Separator className="my-[33px]" />

      {/* Message */}
      {message && (
        <p
          className={cn(
            "my-5 text-center",
            message.startsWith("✅") ? "text-green-500" : "text-red-500"
          )}
        >
          {message}
        </p>
      )}

      {/* Support Links */}
      <div className="text-center text-sm">
        <div className="mb-4">
          Can&lsquo;t find the email?{" "}
          <Link href="" className="underline underline-offset-1">
            Resend a new confirmation email
          </Link>
        </div>
        <div>
          Entered the wrong email address?{" "}
          <Link href="#" className="underline underline-offset-1">
            Change email
          </Link>
        </div>
      </div>
    </div>
  );
}
