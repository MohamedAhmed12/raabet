import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

export const CreateBlockFormFooter = ({onClose}: {onClose: () => void}) => {
  return (
    <>
      <Separator />
      <div className="flex self-end justify-between items-center gap-3 px-3 h-[66px] w-full">
        <Button
          variant={"outline"}
          className="flex-1 cursor-pointer"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button variant={"dashboard-default"} className="flex-1">
          create
        </Button>
      </div>
    </>
  );
};
