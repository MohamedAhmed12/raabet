import { useLinkStore } from "@/app/store/use-link-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function LinksAvatar() {
  const user = useLinkStore((state) => state.link.user);

  return (
    <Avatar className="size-[110px]">
      <AvatarImage src={user?.avatar || '/images/user-placeholder.png'} alt={user.fullname} />
      <AvatarFallback>{user.fullname}</AvatarFallback>
    </Avatar>
  );
}
