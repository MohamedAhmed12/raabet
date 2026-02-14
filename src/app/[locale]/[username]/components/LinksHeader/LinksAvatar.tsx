import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";
import { User } from "next-auth";
import { useLocale } from "next-intl";
import Image from "next/image";

export function LinksAvatar({
  user,
  general_styles_background_type,
  header_styles_profile_shadow,
  header_styles_profile_border_width,
  general_styles_soft_shadow,
  general_styles_is_secondary_bgcolor,
  header_styles_profile_border_color,
  QRCodeEnabled,
}: {
  user: User | null;
  general_styles_background_type: string;
  header_styles_profile_shadow: number;
  header_styles_profile_border_width: number;
  general_styles_soft_shadow: boolean;
  general_styles_is_secondary_bgcolor: boolean;
  header_styles_profile_border_color: string;
  QRCodeEnabled: boolean;
}) {
  const locale = useLocale();

  const profilePicShadow = header_styles_profile_shadow || 0;
  const profilePicBorder = (header_styles_profile_border_width || 0) * 1000;

  if (!user) return null;

  let boxShadow = "none";

  if (profilePicShadow > 0) {
    if (general_styles_soft_shadow) {
      boxShadow = `${profilePicShadow * 6.3}px ${profilePicShadow * 7}px ${
        7 + profilePicShadow * 3
      }px 0px rgba(0, 0, 0, ${0.25 + profilePicShadow * 0.12})`;
    } else {
      boxShadow = `rgba(0, 0, 0) ${profilePicShadow * 6.3}px ${
        profilePicShadow * 7
      }px 0px 0px`;
    }
  }

  return (
    <div className={`relative mb-5 ${QRCodeEnabled ? "cursor-pointer" : ""}`}>
      <Avatar
        className={cn(
          "size-[110px]",
          general_styles_is_secondary_bgcolor && general_styles_background_type !== "image" &&
            `absolute top-[-120px] ${
              locale === "ar" ? "translate-x-1/2" : "-translate-x-1/2"
            }`
        )}
        style={{
          boxShadow,
          borderWidth: `${profilePicBorder * 0.008}px`,
          borderColor: header_styles_profile_border_color,
        }}
      >
        <Image
          src={user.avatar || "/images/user-placeholder.png"}
          alt={user.fullname || ""}
          fill
          priority
        />
      </Avatar>
    </div>
  );
}
