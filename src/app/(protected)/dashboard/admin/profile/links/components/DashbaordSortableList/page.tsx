import { useLinkStore } from "@/app/store/use-link-store";
import { SortableItem } from "./SortableItem";

export const DashbaordSortableList = () => {
  const link = useLinkStore((state) => state.link);

  return (
    <ul className="list w-full">
      {link?.socials?.map((social, index) => (
        <SortableItem key={social.id} social={social} index={index} />
      ))}
    </ul>
  );
};
