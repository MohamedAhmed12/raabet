"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface SortableListProps<T> {
  items: T[];
  onDragEnd: (sortedItems: T) => void;
  children: React.ReactNode;
}

export const DashbaordSortableList = ({
  items,
  onDragEnd,
  children,
}: SortableListProps<T>) => {
  const handleDragEnd = async (event: DragEndEvent) => {
    const {active, over} = event;
    if (!over || !over.data?.current?.sortable?.items || active.id === over.id)
      return;
    const sortedItems = [...items];

    const i = active.data.current.sortable.index;
    const j = over.data.current.sortable.index;

    sortedItems[i].order = j;
    sortedItems[j].order = i;

    [sortedItems[i], sortedItems[j]] = [sortedItems[j], sortedItems[i]];

    onDragEnd(sortedItems);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};
