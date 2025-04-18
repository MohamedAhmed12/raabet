import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import VerifyForm from "./verifyForm";
import { GalleryVerticalEnd } from "lucide-react";

export default async function VerifyPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return <p>You must be logged in to verify your account.</p>;
  }

  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <div className="flex flex-1 flex-col">
        <div className="flex justify-center w-full gap-2 md:justify-start">
          <a href="#" className="flex items-center h-[70px] w-full pl-8 pr-6 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4 " />
            </div>
            Raabet Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full h-full max-w-full max-h-screen">
          <VerifyForm email={session.user.email} />
          </div>
        </div>
      </div>
      <div className="flex-1 relative hidden bg-muted lg:block">
        <img
          src="https://d1ym67wyom4bkd.cloudfront.net/assets/bundles/db9264c8bc4385992e0f73e2eb736dbc6cb1dfaf/graphics/signup-graphic.png"
          alt="verify"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
