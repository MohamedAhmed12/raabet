import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

export const CreateUpdateBlockFormFooter = ({
  submitbtnLabel,
  onClose,
  onSubmit,
  isLoading,
}: {
  submitbtnLabel: string;
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}) => {
  return (
    <span>
      <Separator />
      <div className="flex self-end justify-between items-center gap-3 p-3 h-[66px] w-full">
        <Button
          variant={"outline"}
          className="flex-1 !text-base cursor-pointer"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant={"dashboard-default"}
          className="flex-1 !text-base"
          disabled={isLoading}
          onClick={onSubmit}
        >
          {isLoading ? (
            <Loader2 className="w-10 h-10 animate-spin" />
          ) : (
            submitbtnLabel
          )}
        </Button>
      </div>
    </span>
  );
};
