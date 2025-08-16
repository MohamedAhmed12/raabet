"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();
  if (session?.status === "authenticated") {
    return redirect("/dashboard/admin/profile/links");
  }

  return children;
}
