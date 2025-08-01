"use client";

import { useUpdateLink } from "@/app/[locale]/(protected)/dashboard/admin/profile/links/hooks/useUpdateLink";
import { ShareBtn } from "@/components/ShareBtn";
import { cn } from "@/lib/cn";
import { AddContactDialog } from "./AddContactDialog";

export default function LinksNavbar({ isSticky }: { isSticky: boolean }) {
  const { link } = useUpdateLink();

  return (
    <header
      className={cn(
        "sticky flex items-center justify-between top-0 z-5 text-current",
        isSticky && "pt-[11px] mr-[-20px] ml-[-20px]"
      )}
    >
      <div
        className={cn(
          "flex items-center text-current",
          !isSticky ? "gap-4" : "gap-2"
        )}
      >
        {link.social_enable_add_contacts && (
          <AddContactDialog isSticky={isSticky} />
        )}
        {link.social_enable_share_btn && (
          <ShareBtn
            isSticky={isSticky}
            className="border-none hover:bg-unset !p-0 bg-transparent text-unset"
            iconSize={21}
          />
        )}
      </div>

      {/* Right section  will be released next itteration */}
      {/* <div className="flex items-center gap-4 stroke-[#6b5b71]">
        <LinksNavbarIcon isSticky={isSticky} iconName="search" />
      </div> */}
    </header>
  );
}
