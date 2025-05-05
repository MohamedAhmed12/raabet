'use client';

import { LinkSocial, useLinkStore } from '@/app/[locale]/store/use-link-store';
import { toast } from 'sonner';
import { createSeparator } from '../../actions/createSeparator';
import { updateSocials } from '../../actions/updateSocials';
import { AddSocialDialog } from '../DashbaordSortableList/AddSocialDialog';
import { DashbaordSortableList } from '../DashbaordSortableList/page';
import { SocialSortableItem } from '../DashbaordSortableList/SocialSortableItem';
import { DashboardAccordion } from '../DashboardAccordion';

export const Socials = () => {
  const socials = useLinkStore((state) => state.link.socials);
  const setLink = useLinkStore((state) => state.setLink);

  const handleAddSeparator = async () => {
    const linkId = useLinkStore.getState().link.id;
    if (!linkId) {
      toast.error('Missing link ID');
      return;
    }

    const result = await createSeparator(linkId);

    if (result.success && result.socials) {
      const currentLink = useLinkStore.getState().link;
      setLink({ ...currentLink, socials: result.socials });
    } else {
      toast.error(result.error || 'Failed to add separator');
    }
  };

  const onDragEnd = async (data: LinkSocial[]) => {
    const oldSocials = [...socials!];
    setLink({
      socials: data,
    });

    try {
      await updateSocials(data);
    } catch (error) {
      toast.error('Something went wrong while sorting socials!');
      setLink({
        socials: oldSocials,
      });
    }
  };

  return (
    <DashboardAccordion
      mainLabel="Socials"
      content="Link out to your various online profiles. Please paste the full urls to your profiles."
    >
      {socials && (
        <DashbaordSortableList items={socials} onDragEnd={onDragEnd}>
          <ul className="list w-full">
            {socials.map((item) => (
              <SocialSortableItem key={item.id} item={item} />
            ))}
          </ul>
        </DashbaordSortableList>
      )}
      <div className="footer flex flex-col items-center justify-center gap-2 flex-end mt-4 w-full">
      <AddSocialDialog />
      <button
          className="dashboard-general-style-controller w-full !justify-center !m-0 capitalize text-ms text-center !font-medium cursor-pointer"
          onClick={handleAddSeparator}
        >
          add separator
        </button>
      </div>
    </DashboardAccordion>
  );
};