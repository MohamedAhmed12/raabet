import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import { useShallow } from "zustand/react/shallow";
import { useIncrementSocialClicks } from "../hooks/useIncrementSocialClicks";

export default function LinksSocialIcons() {
  const link = useLinkStore(useShallow((state) => state.link));
  const socialIconSize = (link?.header_styles_social_icons_size || 0) * 24;

  const { mutateAsync: incrementSocialClicks } = useIncrementSocialClicks();

  const handleSocialClick = (entityId: string) => {
    incrementSocialClicks({ entityId, linkId: link.id });
  };

  return (
    link?.socials && (
      <div className="social-icons-container flex mt-[31px] justify-center items-center flex-wrap gap-x-2 font-noto-sans">
        {link?.socials.map((social) => {
          return !social?.icon ? (
            <div key={social.id} className="w-full my-1"></div>
          ) : (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3"
              onClick={() => handleSocialClick(social.id)}
            >
              <div
                className={cn(
                  social.label &&
                    "flex items-center justify-center border-[0.2em] rounded-[2em] border-solid gap-2 px-2 py-1.5"
                )}
                style={{
                  color: link?.general_styles_primary_text_color,
                  borderColor: link?.general_styles_primary_text_color,
                }}
                dir="ltr"
              >
                <Icon name={social.icon} size={socialIconSize + 24} />
                {social.label && (
                  <span className="text-xs text-center font-semibold">
                    {social.label}
                  </span>
                )}
              </div>
            </a>
          );
        })}
      </div>
    )
  );
}
