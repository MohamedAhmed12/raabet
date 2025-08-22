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

  // @ts-expect-error: session.data may not match Session shape
  const isCurrentUserConfirmed = session?.data?.user?.id?.is_confirmed;

  useEffect(() => {
    if (session?.status === "authenticated" && isCurrentUserConfirmed) {
      router.replace("/dashboard/admin/profile/links");
    }
  }, [session?.status, router, isCurrentUserConfirmed]);

  if (session?.status === "loading") return <Loading />;

  return children;
}
