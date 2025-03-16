import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col", className)} {...props}>
      <div className="flex flex-col justify-center items-center font-noto-sans">
        <div className="mb-6 text-[40px] text-deep-blue-gray font-bold leading-[1.1] pb-3">
          <span className="pr-2">sign</span>
          <span className="relative">
            <span className="relative inline-block z-[1]">in</span>
            <div className="absolute inset-0 top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%] bg-amber-200"></div>
          </span>
        </div>
        <div className="mb-6 text-lg">
          Welcome back! Sign in to your Raabet account
        </div>
      </div>
      <div className="grid gap-3">
        <div className="grid">
          <Input
            id="email"
            type="email"
            placeholder="Email or Username"
            required
          />
        </div>
        <div className="grid">
          <Input id="email" type="password" placeholder="password" required />
        </div>
        <a
          href="#"
          className="text-xs"
        >
          Forgot your password?
        </a>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </div>
      <div
        className="text-center text-xs"
      >
        Not yet a member?
        <Link href="/auth/SignUp">
        <span className="underline underline-offset-4 px-1">Sign Up.</span>
        </Link>
      </div>
    </form>
  );
}
