'use client';

import { LinkSocial, useLinkStore } from '@/app/[locale]/store/use-link-store';
import { Icon } from '@/components/Icon';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { deleteSocial } from '../../actions/deleteSocial';
import { updateLinkUrl } from '../../actions/updateLinkUrl';
import { updateSocialLabel } from '../../actions/updateSocialLabel';
import { EditSocialLabelDialog } from './EditSocialLabelDialog';

const schema = z.object({
  website: z.string().url('Please enter a valid URL'),
});

export const SocialSortableItem = ({ item }: { item: LinkSocial }) => {
  const isSeparator = !item?.icon;
  const [isFocused, setIsFocused] = useState(false);
  const [isPending, startTransition] = useTransition();
  const setLink = useLinkStore((state) => state.setLink);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      website: item.url || '',
    },
  });

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: item.id,
      disabled: isFocused,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    willChange: 'transform',
  };

  const onSubmit = async (data: { website: string }) => {
    await updateLinkUrl(item.id, data.website);
  };

  const handleDelete = async () => {
    const linkId = useLinkStore.getState().link.id ?? '';
    startTransition(async () => {
      const result = await deleteSocial(item.id, linkId);
      if (result.success && result.socials) {
        const currentLink = useLinkStore.getState().link;
        useLinkStore.getState().setLink({
          ...currentLink,
          socials: result.socials,
        });
      } else {
        console.error('Failed to delete item:', result.error);
      }
    });
  };

  const handleDialogSubmit = async (value: string) => {
    const currentLink = useLinkStore.getState().link;
    const updatedSocials = currentLink.socials.map((social) =>
      social.id === item.id ? { ...social, label: value } : social
    );
  
    useLinkStore.getState().setLink({
      ...currentLink,
      socials: updatedSocials,
    });
    const response = await updateSocialLabel(item.id, value);

    if (response.success) {
      console.log('Label updated:', response.updatedSocial);
      // Optionally refresh or update the local state to reflect changes
    } else {
      console.error('Failed to update label:', response.error);
    }    // your logic here
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="item w-full flex justify-between items-center mb-5"
    >
      <div {...attributes} {...listeners} className="cursor-move mr-2">
        <Icon
          name="grip-vertical"
          size={isSeparator ? 15 : 18}
          strokeWidth={2}
          className="cursor-move"
        />
      </div>

      {!isSeparator ? (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full !mb-0 mx-2">
          <div>
            <Input
              id="website"
              {...register('website')}
              placeholder="Enter website URL"
              icon={<Icon name={item?.icon} sizeClass="sm" />}
              onFocus={handleFocus}
              onBlur={(e) => {
                handleBlur();
                handleSubmit(onSubmit)();
              }}
            />
            {errors.website && <p>{errors.website.message}</p>}
          </div>
        </form>
      ) : (
        <div className="flex flex-1 justify-center items-center overflow-hidden mx-2">
          <Separator />
          <span className="mx-3 text-zinc-600">Separator</span>
          <Separator />
        </div>
      )}
      <div className="actions">
        {!isSeparator && (
          <EditSocialLabelDialog
            iconName="pencil"
            placeholder="Icon Label"
            initialValue={item.label}
            onSubmit={handleDialogSubmit}
          />
        )}
        <Icon
          name="delete"
          size={16}
          className="cursor-pointer text-red-600"
          onClick={() => {
            handleDelete();
          }}
        />
      </div>
    </li>
  );
};