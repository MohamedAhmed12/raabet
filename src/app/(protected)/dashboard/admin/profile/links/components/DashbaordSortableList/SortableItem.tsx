import { LinkSocial } from "@/app/store/use-link-store";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSortable } from "@dnd-kit/sortable";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CSS } from "@dnd-kit/utilities";
import { z } from "zod";

const schema = z.object({
  website: z.string().url("Please enter a valid URL"),
});

export const SortableItem = ({
  social,
  index,
}: {
  social: LinkSocial;
  index: number;
}) => {
  const isSeparator = !social?.icon;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({
    id: social.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onSubmit = () => {};

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="item w-full flex justify-between items-center mb-5"
      {...attributes}
      {...listeners}
    >
      <Icon
        name="grip-vertical"
        size={isSeparator ? 15 : 18}
        strokeWidth={2}
        className="cursor-move"
      />

      {!isSeparator ? (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full !mb-0 mx-2">
          <div>
            <Input
              id="website"
              {...register("website")}
              placeholder="Enter website URL"
              icon={<Icon name={social?.icon} sizeClass="sm" />}
            />
            {errors.website && <p>{errors.website.message}</p>}
          </div>
        </form>
      ) : (
        <div className="flex flex-1 justify-center items-center overflow-hidden mx-2">
          <Separator />
          <span className="mx-3 text-zinc-600">Separator</span>
          <Separator />
        </div>
      )}
      <div className="actions">
        {!isSeparator && (
          <Icon
            name="pencil"
            size={16}
            className="cursor-pointer text-dashboard-primary mb-[3px]"
          />
        )}
        <Icon
          name="delete"
          size={16}
          className="cursor-pointer text-red-600"
        />
      </div>
    </li>
  );
};
