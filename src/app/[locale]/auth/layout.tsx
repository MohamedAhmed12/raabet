"use client";

import { useEffect } from "react";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.replace("/dashboard/admin/profile/links");
    }
  }, [session?.status, router]);

  if (session?.status === "loading") return <Loading />;

  return children;
}
