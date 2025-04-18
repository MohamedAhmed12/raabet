import {Separator} from "@/components/ui/separator";

export const CreateBlockFormHeader = ({title}: {title: string}) => {
  return (
    <>
      <div className="text-xl capitalize p-[22px] font-bold leading-none">
        {title}
      </div>
      <Separator />
    </>
  );
};
