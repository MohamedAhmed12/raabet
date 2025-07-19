"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import VerifyForm from "./verifyForm";

export default function VerifyPage() {
  const session = useSession();
  const router = useRouter();
  // @ts-expect-error: [to access user data in session it exists in id]
  const authUser = session?.data?.user?.id;

  if (
    session.status === "unauthenticated" ||
    (session.status === "authenticated" && !authUser?.email)
  ) {
    router.replace("/auth/login");
  }

  const onVerify = async () => {
    try {
      console.log("onVerify");
      const currentData = session;
      // @ts-expect-error: [to access user data in session it exists in id]
      const authUser = currentData?.data?.user?.id;

      if ("is_confirmed" in authUser) {
        authUser.is_confirmed = true;
      }

      await session.update(authUser);

      console.log("last onVerify");
      router.replace("/dashboard/admin/profile/links");
    } catch (error) {
      console.error(222111, error);
    }
  };

  return (
    authUser && (
      <div className="flex min-h-svh flex-col lg:flex-row font-noto-sans">
        <div className="flex flex-1 flex-col">
          <div className="flex justify-center w-full gap-2 md:justify-start">
            <a
              href="#"
              className="flex items-center h-[70px] w-full pl-8 gap-2 font-medium"
              dir="ltr"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4 " />
              </div>
              Rabet Inc.
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full h-full max-w-full max-h-screen">
              <VerifyForm email={authUser.email} onVerify={() => onVerify()} />
            </div>
          </div>
        </div>
        <div className="flex-1 relative hidden bg-muted lg:block">
          <Image
            src="/images/login-bg.png"
            alt="verify"
            fill
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    )
  );
}
