import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";
import { User } from "next-auth";
import { useLocale } from "next-intl";
import Image from "next/image";

export function LinksAvatar({
  user,
  header_styles_profile_shadow,
  header_styles_profile_border_width,
  general_styles_soft_shadow,
  general_styles_is_secondary_bgcolor,
  header_styles_profile_border_color,
  QRCodeEnabled,
}: {
  user: User | null;
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
          boxShadow: general_styles_soft_shadow
            ? `0 ${4 + profilePicShadow * 2}px ${12 + profilePicShadow * 4}px ${
                -3 + profilePicShadow * 2
              }px rgba(0, 0, 0, ${0.15 + profilePicShadow * 0.08})`
            : `rgba(0, 0, 0) ${profilePicShadow * 6.3}px ${
                profilePicShadow * 7
              }px 0px 0px`,
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
