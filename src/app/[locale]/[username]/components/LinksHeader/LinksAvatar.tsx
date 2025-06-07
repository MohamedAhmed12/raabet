import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";

export function LinksAvatar() {
  const user = useLinkStore((state) => state.link.user);
  const link = useLinkStore((state) => state.link);

  const profilePicShadow = (link?.header_styles_profile_shadow || 0) * 1000;
  const profilePicBorder =
    (link?.header_styles_profile_border_width || 0) * 1000;

  return (
    <Avatar
      className={cn(
        "size-[110px]",
        link.general_styles_is_secondary_bgcolor &&
          "absolute top-[155px] -translate-x-1/2"
      )}
      style={{
        boxShadow: `0px 0px ${profilePicShadow * 0.01}px ${
          profilePicShadow * 0.005
        }px rgba(0, 0, 0,0.3)`,
        borderWidth: `${profilePicBorder * 0.008}px`,
        borderColor: link.header_styles_profile_border_color,
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
