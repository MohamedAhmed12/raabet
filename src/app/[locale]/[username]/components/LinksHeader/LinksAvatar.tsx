import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";
import { useLocale } from "next-intl";
import { useShallow } from "zustand/react/shallow";

export function LinksAvatar() {
  const locale = useLocale();
  const {
    user,
    header_styles_profile_shadow,
    header_styles_profile_border_width,
    general_styles_is_secondary_bgcolor,
    header_styles_profile_border_color,
    QRCodeEnabled,
  } = useLinkStore(
    useShallow((state) => ({
      user: state.link.user,
      header_styles_profile_shadow: state.link?.header_styles_profile_shadow,
      header_styles_profile_border_width:
        state.link?.header_styles_profile_border_width,
      general_styles_is_secondary_bgcolor:
        state.link?.general_styles_is_secondary_bgcolor,
      header_styles_profile_border_color:
        state.link?.header_styles_profile_border_color,
      QRCodeEnabled: state.link.social_enable_qr_code,
    }))
  );
  const profilePicShadow = header_styles_profile_shadow || 0;
  const profilePicBorder = (header_styles_profile_border_width || 0) * 1000;

  return (
    <div className={`relative mb-5 ${QRCodeEnabled ? "cursor-pointer" : ""}`}>
      <Avatar
        className={cn(
          "size-[110px]",
          general_styles_is_secondary_bgcolor &&
            `absolute top-[-120px] ${
              locale === "ar" ? "translate-x-1/2" : "-translate-x-1/2"
            }`
        )}
        style={{
          boxShadow: ` rgba(0, 0, 0) ${profilePicShadow * 6.3}px ${
            profilePicShadow * 7
          }px 0px 0px`,
          borderWidth: `${profilePicBorder * 0.008}px`,
          borderColor: header_styles_profile_border_color,
        }}
      >
        <AvatarImage
          src={user?.avatar || "/images/user-placeholder.png"}
          alt={user?.fullname}
          priority
          fetchPriority="high"
          loading="eager"
        />
        <AvatarFallback>{user?.fullname}</AvatarFallback>
      </Avatar>
    </div>
  );
}
