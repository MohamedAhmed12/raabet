"use client";

import { iconNameType, socialIcons } from "@/assets/icons";
import { Icon } from "@/components/Icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateSocial } from "../../hooks/useCreateSocial";
import { useGetLink } from "../../hooks/useUpdateLink";

type IconNameType = keyof typeof socialIcons;

const iconList: { iconName: IconNameType; title: string }[] = Object.keys(
  socialIcons
).map((key) => ({
  iconName: key as IconNameType,
  title: key.charAt(0).toUpperCase() + key.slice(1),
}));

export const AddSocialDialog = () => {
  const t = useTranslations("LinksPage.generalStyles");
  const [open, setOpen] = useState(false);
  const getLink = useGetLink();
  const link = getLink();
  const queryClient = useQueryClient();

  const { mutateAsync: createSocialMutation, isPending } = useCreateSocial({
    onSuccess: () => {
      setOpen(false);
      toast.success(t("addSocialSuccess") || "Social added successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add social item");
    },
  });

  const handleAddSocial = async (icon: iconNameType) => {
    if (!link?.id) {
      toast.error("Missing link ID");
      return;
    }

    await createSocialMutation({ icon });
    await queryClient.refetchQueries({ queryKey: ["link"] });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="dashboard-general-style-controller w-full !justify-center !m-0 capitalize text-ms text-center !font-medium cursor-pointer">
          {t("addSocial")}
          <Icon name="link" size={13} className="ml-2" strokeWidth="3" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {iconList.map(({ iconName, title }) => (
            <button
              key={iconName}
              onClick={() => handleAddSocial(iconName)}
              disabled={isPending}
              className="flex items-center justify-center flex-col border rounded-lg p-3 hover:bg-muted transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name={iconName} size={20} />
              <span className="mt-2">{title}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
