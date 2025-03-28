"use client";

import { useLinkStore } from "@/app/store/use-link-store";
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
import { LinksNavbarIcon } from "../StickyLinksNavbar";
import { generateVCardAction } from "@/app/[username]/actions/generateVCardAction";
import { toast } from "sonner";

export function AddContactDialog({ isSticky }: { isSticky: boolean }) {
  const user = useLinkStore((state) => state.link.user);
  if (!user) return;

  const handleAddContact = async () => {
    const responseBlob = await generateVCardAction(user.fullname);

    if (!responseBlob) return toast.error("Something wrong happened!");

    // Get the Blob containing the vCard data
    // const blob = await response.blob();

    // Create a download link for the Blob
    const link = document.createElement("a");
    link.href = URL.createObjectURL(responseBlob);
    link.download = `${user.fullname}_contact.vcf`; // Set the filename
    link.click(); // Programmatically trigger the download
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <LinksNavbarIcon isSticky={isSticky} iconName="user-round-plus" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader className="flex items-center">
          <DialogTitle>
            <Icon
              size={30}
              name="user-round-plus"
              // className="stroke-[#6b5b71]"
            />
          </DialogTitle>
        </DialogHeader>
        <div className="text-center">{`Add ${user.fullname} as a contact.`}</div>
        <DialogFooter>
          <Button
            className="w-full flex items-center capitalize bg-deep-blue-gray hover:bg-deep-blue-gray cursor-pointer"
            onClick={() => handleAddContact()}
          >
            add contact
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
