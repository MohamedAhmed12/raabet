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

export function ShareBtn({ isSticky }: { isSticky?: boolean }) {
  const user = useLinkStore((state) => state.link.user);
  if (!user) return;

  //   const handleAddContact = async () => {
  //     const responseBlob = await generateVCardAction(user.fullname);

  //     if (!responseBlob) return toast.error("Something wrong happened!");

  //     // Create a download link for the Blob
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(responseBlob);
  //     link.download = `${user.fullname}_contact.vcf`;
  //     link.click(); // Programmatically trigger the download
  //   };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-black border-1 border-gray-300 rounded-sm !p-2 cursor-pointer bg-white hover:bg-gray-200">
          <Icon name="share" sizeClass="sm" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px] font-noto-sans">
        <DialogHeader className="flex items-center">
          <DialogTitle>
            <Icon size={30} name="user-round-plus" />
          </DialogTitle>
        </DialogHeader>
        <div className="text-center mb-3">
          <span>Add</span>
          <span className="font-semibold mx-1">{user.fullname}</span>
          <span>as a contact.</span>
        </div>
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
