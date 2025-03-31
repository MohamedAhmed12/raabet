"use client";

import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";
import { AddContactDialog } from "./AddContactDialog";
import { LinksNavbarIcon } from "./StickyLinksNavbar";

export default function LinksNavbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10); // adjust 10 to whatever threshold you want
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky flex items-center justify-between top-0 z-50 text-current",
        isSticky ? "pt-[11px] mr-[-20px] ml-[-20px]" : "px-[11px]"
      )}
    >
      <div className="flex items-center gap-4 text-current">
        <AddContactDialog isSticky={isSticky} />
        <LinksNavbarIcon isSticky={isSticky} iconName="share" />
      </div>

      {/* Right section  will be released next itteration */}
      {/* <div className="flex items-center gap-4 stroke-[#6b5b71]">
        <LinksNavbarIcon isSticky={isSticky} iconName="search" />
      </div> */}
    </header>
  );
}
