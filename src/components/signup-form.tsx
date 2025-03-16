import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col ", className)} {...props}>
      <div className="flex flex-col justify-center items-center font-noto-sans">
        <div className="mb-6 text-[40px] text-deep-blue-gray font-bold leading-[1.1] pb-3">
          <span>Join </span>
          <span className="relative">
            <span className="relative inline-block z-[1]">Liinks</span>
            <div className="absolute inset-0 top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%] bg-sky-300"></div>
          </span>
        </div>
        <div className="mb-6 text-lg text-center">
          Over 10,000 artists, creators, business owners, and more use Liinks to
          centralize their online presence.
        </div>
      </div>
      <div className="grid gap-3">
        <div className="grid">
          <Input id="Full Name" type="name" placeholder="Full Name" required  />
        </div>
        <div className="grid">
          <Input id="email" type="email" placeholder="Email" required />
        </div>
        <div className="grid">
          <Input id="email" type="password" placeholder="password" required />
        </div>
        <div className="flex  ">
          <a href="#" className="text-xs pr-0.5 pl-20 ">
            By joining, you agree to our
          </a>
          <a href="#" className="text-xs underline underline-offset-4 px-0.5">
            terms
          </a>
          <a href="#" className="text-xs px-0.5">
            and
          </a>
          <a href="#" className="text-xs underline underline-offset-4 px-0.5">
            privacy policy.
          </a>
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </div>
      <div className="text-center text-xs ">
        Already have an account?
        <Link href="/auth/login">
        <span className="underline underline-offset-4 px-1">Sign In.</span>
        </Link>
      </div>
    </form>
  );
}
