import { Block } from "@/app/types/block";
import { Icon } from "@/components/Icon";

export const BlockItem = ({block}: {block: Block}) => {
  return (
    <div className="flex items-center bg-white rounded-lg border border-blue-300 shadow-md hover:shadow-lg font-noto-sans font-light h-[62px] overflow-hidden not-last:mb-3">
      <div className="flex items-center justify-center px-1 min-h-max cursor-grab bg-gray-100 h-full">
        <Icon name="grip-vertical" sizeClass="sm" />
      </div>

      <div className="w-full flex flex-col p-2">
        <div className="text-dashboard-primary text-sm mb-[6px]">
          {block.title}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400 capitalize">{block.type}</div>
          <div className="flex space-x-1 text-gray-600">
            <button className="cursor-pointer hover:bg-gray-100">
              <Icon name="copy" sizeClass="sm" />
            </button>

            <button className="cursor-pointer hover:bg-gray-100">
              <Icon name="delete" sizeClass="sm" />
            </button>

            <button className="cursor-pointer hover:bg-gray-100">
              <Icon name="settings" sizeClass="sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
