// "use client";

// import { useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/cn";

// const resetPasswordSchema = z
//   .object({
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// export default function ResetPasswordForm({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"form">) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ResetPasswordFormData>({
//     resolver: zodResolver(resetPasswordSchema),
//   });

//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const token = searchParams.get("token");

//   const onSubmit = async (data: ResetPasswordFormData) => {
//     if (!token) return;

//     setLoading(true);
//     try {
//       const response = await fetch("/api/resetPassword", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token, password: data.password }),
//       });

//       const result = await response.json();
//       if (!response.ok) throw new Error(result.message);

//       router.push("/auth/login");
//     } catch (error: unknown) {
//       setError((error as Error).message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
//       <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
//       {error && <p className="text-red-500 mb-3">{error}</p>}

//       <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col", className)} {...props}>
//         <div className="grid gap-3">
//           <div className="grid">
//             <Input type="password" placeholder="New Password" {...register("password")} required />
//             {errors.password && <p className="text-red-500">{errors.password.message}</p>}
//           </div>
//           <div className="grid">
//             <Input type="password" placeholder="Confirm Password" {...register("confirmPassword")} required />
//             {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
//           </div>
//           <Button type="submit" className="w-full bg-blue-400 hover:bg-blue-500 cursor-pointer" disabled={loading}>
//             {loading ? "Resetting..." : "Reset Password"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
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

      router.push("/auth/login");
    } catch (error: unknown) {
      setError((error as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center px-6 font-noto-sans w-7xl max-w-[650px]"
    >
      <div className="flex justify-center items-center w-full px-11 py-5">
        <h2 className="text-[32px] text-center">Reset Password</h2>
      </div>
      <div className="w-full p-[22px]">
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn("space-y-4", className)}
          {...props}
        >
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 text-sm">Password</label>
            <Input
              type="password"
              placeholder="Enter your new password"
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
            {loading ? "Resetting..." : "Reset"}
          </Button>
        </form>
      </div>
    </div>
  );
}
