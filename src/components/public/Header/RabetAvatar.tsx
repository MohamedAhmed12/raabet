"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useRouter } from "@/i18n/navigation";
import { useMemo } from "react";

type SessionUser = {
  id?: {
    fullname?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export const RabetAvatar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const t = useTranslations("Header");

  const sessionUser = session?.user as SessionUser | null;
  const user = sessionUser?.id;

  const { fullName, email, image } = useMemo(() => {
    return {
      email: user?.email || "",
      image: user?.image || "",
      fullName: user?.fullname || "",
    };
  }, [user]);

  if (!user) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/", redirect: false });
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className=" h-10 w-10 rounded-full p-0">
          <Avatar className="h-10 w-10">
            <AvatarImage src={image} alt={fullName} />
            <AvatarFallback className="bg-deep-blue-gray text-white">
              {fullName ? getInitials(fullName) : "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <NextLink
            href="/dashboard/admin/profile/links"
            className="cursor-pointer hover:bg-gray-100"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            {t("dashboard")}
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer hover:bg-gray-100"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
