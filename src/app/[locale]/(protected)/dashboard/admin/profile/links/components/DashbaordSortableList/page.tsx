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

    // Ensure there's a valid drop target and the dragged item isn't dropped on itself
    if (!over || !over.data?.current?.sortable?.items || active.id === over.id)
      return;

    const activeIndex = items.findIndex((item) => item.id === active.id);
    const overIndex = items.findIndex((item) => item.id === over.id);

    // If both items are found in the list
    if (activeIndex !== -1 && overIndex !== -1) {
      const updatedItems = [...items];
      const [movedItem] = updatedItems.splice(activeIndex, 1);
      updatedItems.splice(overIndex, 0, movedItem);

      // Update the order property based on the new index
      updatedItems.forEach((item, index) => {
        item.order = index + 1;
      });

      onDragEnd(updatedItems);
    }
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
