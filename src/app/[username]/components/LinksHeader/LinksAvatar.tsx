import { useLinkStore } from "@/app/store/use-link-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";

export function LinksAvatar() {
  const user = useLinkStore((state) => state.link.user);
  const isSecondBgColor = useLinkStore(
    (state) => state.link.general_styles_is_secondary_bgcolor
  );

  return (
    <Avatar
      className={cn("size-[110px]", isSecondBgColor && "absolute top-[155px]")}
    >
      <AvatarImage
        src={user?.avatar || "/images/user-placeholder.png"}
        alt={user?.fullname}
      />
      <AvatarFallback>{user?.fullname}</AvatarFallback>
    </Avatar>
  );
}
