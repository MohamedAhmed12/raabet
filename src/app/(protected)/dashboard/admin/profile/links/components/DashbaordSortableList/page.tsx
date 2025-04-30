'use client';

import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { SortableItem } from './SortableItem';
import { useLinkStore } from '@/app/store/use-link-store';

export const DashbaordSortableList = () => {
  const link = useLinkStore((state) => state.link);
  const [socials, setSocials] = useState(link?.socials || []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !over.data?.current?.sortable?.items || active.id === over.id)
      return;
    const sortedSocial = [...socials];

    const i = active.data.current.sortable.index;
    const j = over.data.current.sortable.index;

    sortedSocial[i].order = j;
    sortedSocial[j].order = i;

    [sortedSocial[i], sortedSocial[j]] = [sortedSocial[j], sortedSocial[i]];

    setSocials(sortedSocial);

    try {
      const res = await fetch('/api/socials/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sortedSocial),
      });

      if (!res.ok) throw new Error('Failed to update order');
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={socials.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="list w-full">
          {socials.map((social, index) => (
            <SortableItem key={social.id} social={social} index={index} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};
