"use client";

import { ForgetPasswordForm } from "@/components/ForgerPassword-form";
  
export default function ForgetPassword() {
  return (
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <ForgetPasswordForm />
          </div>
        </div>
      </div>
  )
}
