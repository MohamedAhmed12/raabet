import { useLinkStore } from "@/app/store/use-link-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";

export function LinksAvatar() {
  const user = useLinkStore((state) => state.link.user);
  const link = useLinkStore((state) => state.link);

  const profilePicShadow = link?.header_styles_profile_shadow * 1000;
  const profilePicBorder = link?.header_styles_profile_border_width * 1000;

  return (
    <Avatar
      className={cn(
        "size-[110px]",
        link.general_styles_is_secondary_bgcolor && "absolute top-[155px]"
      )}
      style={{
        boxShadow: `rgb(0, 0, 0) ${profilePicShadow * 0.0063}px ${
          profilePicShadow * 0.007
        }px 0px 0px`,
        borderWidth: `${profilePicBorder * 0.016}px`,
        borderColor: link.card_styles_card_border_color,
      }}
    >
      <AvatarImage
        src={user?.avatar || "/images/user-placeholder.png"}
        alt={user?.fullname}
      />
      <AvatarFallback>{user?.fullname}</AvatarFallback>
    </Avatar>
  );
}
