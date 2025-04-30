import {Separator} from "@/components/ui/separator";

export const CreateBlockFormHeader = ({title}: {title: string}) => {
  return (
    <span>
      <div className="text-xl capitalize p-[22px] font-bold leading-none">
        {title}
      </div>
      <Separator />
    </span>
  );
};
