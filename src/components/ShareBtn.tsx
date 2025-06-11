"use client";

import { generateVCardAction } from "@/app/[locale]/[username]/actions/generateVCardAction";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { Icon } from "@/components/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/cn";
import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export function ShareBtn() {
  const [isCopied, setIsCopied] = useState(false);

  const t = useTranslations("ShareBtn");
  const user = useLinkStore((state) => state.link.user);
  const profileurl = `${process.env.NEXT_PUBLIC_BASE_URL}/${user?.fullname}`;

  if (!user) return;

  const handleAddContact = async () => {
    const responseBlob = await generateVCardAction(user.fullname);

    if (!responseBlob) return toast.error("Something wrong happened!");

    // Create a download link for the Blob
    const link = document.createElement("a");
    link.href = URL.createObjectURL(responseBlob);
    link.download = `${user.fullname}_contact.vcf`;
    link.click(); // Programmatically trigger the download
  };

  const handleCopyURL = () => {
    navigator.clipboard.writeText(profileurl);
    setIsCopied(true);

    // Reset state after 3 seconds
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-black border-1 border-gray-300 rounded-sm !p-2 cursor-pointer bg-white hover:bg-gray-200">
          <Icon name="share" sizeClass="sm" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px] mb-5">
        <DialogHeader className="flex items-center">
          <DialogTitle>
            <Avatar className={cn("size-[110px]")}>
              <AvatarImage
                src={user?.avatar || "/images/user-placeholder.png"}
                alt={user?.fullname}
              />
              <AvatarFallback>{user?.fullname}</AvatarFallback>
            </Avatar>
          </DialogTitle>
        </DialogHeader>

        <DialogFooter className="flex !flex-col gap-4 font-noto-sans">
          <Button
            className="w-full flex !text-base capitalize bg-deep-blue-gray hover:bg-deep-blue-gray cursor-pointer"
            onClick={() => handleAddContact()}
          >
            <Icon size={30} name="user-round-plus" className="w-[30%]" />
            {t("addContact")}
          </Button>
          <Button
            className={cn(
              "w-full flex !text-base capitalize cursor-pointer",
              isCopied
                ? "bg-green-500 hover:bg-green-600"
                : "bg-deep-blue-gray hover:bg-deep-blue-gray"
            )}
            onClick={handleCopyURL}
          >
            {isCopied ? (
              <Check size={30} className="w-[30%]" />
            ) : (
              <Copy size={30} className="w-[30%]" />
            )}
            {isCopied ? t("copiedToClipboard") : t("copyURL")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
