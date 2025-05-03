import {Separator} from "@/components/ui/separator";

export const CreateUpdateBlockFormHeader = ({title}: {title: string}) => {
  return (
    <span>
      <div className="text-xl capitalize p-[22px] font-bold leading-none">
        {title}
      </div>
      <Separator />
    </span>
  );
};
