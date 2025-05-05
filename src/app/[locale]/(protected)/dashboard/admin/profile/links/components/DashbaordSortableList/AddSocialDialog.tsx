'use client';

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Icon } from '@/components/Icon';
import { useState } from 'react';
import { toast } from 'sonner';
import { useLinkStore } from '@/app/[locale]/store/use-link-store';
import { iconNameType, socialIcons } from '@/assets/icons';
import { createSocial } from '../../actions/createSocial';

type IconNameType = keyof typeof socialIcons;

const iconList: { iconName: IconNameType; title: string }[] = Object.keys(socialIcons).map((key) => ({
    iconName: key as IconNameType,
    title: key.charAt(0).toUpperCase() + key.slice(1),
  }));

export const AddSocialDialog = () => {
  const [open, setOpen] = useState(false);
  const setLink = useLinkStore((state) => state.setLink);

  const handleAddSocial = async (icon: iconNameType) => {
    const linkId = useLinkStore.getState().link?.id;
    if (!linkId) {
      toast.error('Missing link ID');
      return;
    }

    const result = await createSocial({ linkId, icon });

    if (result.success && result.socials) {
      const currentLink = useLinkStore.getState().link;
      setLink({ ...currentLink, socials: result.socials });
    } else {
      toast.error(result.error || 'Failed to add social item');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="dashboard-general-style-controller w-full !justify-center !m-0 capitalize text-ms text-center !font-medium cursor-pointer">
          add social
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
              onClick={() => {
                handleAddSocial(iconName);
                setOpen(false);
              }}
              className="flex items-center justify-center flex-col border rounded-lg p-3 hover:bg-muted transition text-sm"
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