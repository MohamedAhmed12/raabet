"use client";

import { generateVCardAction } from "@/app/[locale]/[username]/actions/generateVCardAction";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { LinksNavbarIcon } from "./StickyLinksNavbar";
import { useShallow } from "zustand/react/shallow";

export function AddContactDialog({ isSticky }: { isSticky: boolean }) {
  const user = useLinkStore(useShallow((state) => state.link.user));
  if (!user) return;

  const t = useTranslations("ShareBtn");

  const handleAddContact = async () => {
    const responseBlob = await generateVCardAction(user.fullname);

    if (!responseBlob) return toast.error("Something wrong happened!");

    // Create a download link for the Blob
    const link = document.createElement("a");
    link.href = URL.createObjectURL(responseBlob);
    link.download = `${user.fullname}_contact.vcf`;
    link.click(); // Programmatically trigger the download
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <LinksNavbarIcon isSticky={isSticky} iconName="user-round-plus" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px] font-noto-sans">
        <DialogHeader className="flex items-center">
          <DialogTitle>
            <Icon size={30} name="user-round-plus" />
          </DialogTitle>
        </DialogHeader>
        <div className="text-center mb-3">
          <span>{t("add")}</span>
          <span className="font-semibold mx-1">{user.fullname}</span>
          <span>{t("asContact")}</span>
        </div>
        <DialogFooter>
          <Button
            className="w-full flex !text-base capitalize bg-deep-blue-gray hover:bg-deep-blue-gray cursor-pointer"
            onClick={() => handleAddContact()}
          >
            {t("addContact")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
