import Image from "next/image";
import SignUpForm from "../components/SignupForm";
import { GalleryVerticalEnd } from "lucide-react";

export default function SignUp() {
  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="\" className="flex items-center gap-2 font-medium" dir="ltr">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Rabet Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="flex-1 relative hidden bg-muted lg:block">
        <Image
          src="/images/login-bg.jpg"
          alt="Sign-up"
          fill
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
