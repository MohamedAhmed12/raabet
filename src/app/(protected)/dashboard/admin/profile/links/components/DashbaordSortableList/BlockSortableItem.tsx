import { Block } from "@/app/types/block";
import { CustomTooltip } from "@/components/CustomTooltip";
import { Icon } from "@/components/Icon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { z } from "zod";

const schema = z.object({
  website: z.string().url("Please enter a valid URL"),
});

export const BlockSortableItem = ({block}: {block: Block}) => {
  const {setNodeRef, attributes, listeners, transform, transition} =
    useSortable({
      id: block.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center bg-white rounded-lg border border-blue-300 shadow-md hover:shadow-lg font-noto-sans font-light h-[62px] overflow-hidden not-last:mb-3"
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center justify-center px-1 min-h-max cursor-move bg-gray-100 h-full">
        <Icon name="grip-vertical" sizeClass="sm" />
      </div>

      <div className="w-full flex flex-col px-2.5 py-2">
        <div className="text-dashboard-primary text-sm mb-[6px]">
          {block.title}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400 capitalize">{block.type}</div>
          <div className="flex space-x-1 text-gray-600">
            <CustomTooltip
              trigger={
                <Icon
                  name="copy"
                  sizeClass="sm"
                  className="cursor-pointer hover:bg-gray-100"
                />
              }
              content={"Copy Block"}
            />
            <CustomTooltip
              trigger={
                <Icon
                  name="pencil"
                  sizeClass="sm"
                  className="cursor-pointer hover:bg-gray-100"
                />
              }
              content={"Edit"}
            />{" "}
            <CustomTooltip
              trigger={
                <Icon
                  name="clock"
                  sizeClass="sm"
                  className="cursor-pointer hover:bg-gray-100"
                />
              }
              content={"Schedule"}
            />
            <CustomTooltip
              trigger={
                <Icon
                  name="delete"
                  sizeClass="sm"
                  className="cursor-pointer hover:bg-gray-100"
                />
              }
              content={"Delete"}
            />
          </div>
        </div>
      </div>
    </li>
  );
};
