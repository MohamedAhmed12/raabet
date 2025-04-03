import { Separator } from "@/components/ui/separator";
import { blocks, BlockType } from "../../../../../types/block";
import { Button } from "@/components/ui/button";

export const CreateBlockForm = ({
  type,
  onClose,
}: {
  type: BlockType;
  onClose: () => void;
}) => {
  const BlockComponent = blocks[type];

  return (
    <div className="flex flex-col absolute top-0 left-0 w-[520px] z-[9] h-screen font-noto-sans font-medium !bg-white w-[370px] border-1 border-r-[#d3d3d3]">
      <BlockComponent />

      <div className="">
        <Separator />
        <div className="flex self-end justify-between items-center gap-3 px-3 h-[66px]">
          <Button variant={"outline"} className="flex-1 cursor-pointer">
            Cancel
          </Button>
          <Button variant={"dashboard-default"} className="flex-1">
            create
          </Button>
        </div>
      </div>
    </div>
  );
};
