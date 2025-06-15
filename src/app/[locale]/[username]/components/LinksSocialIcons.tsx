import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import { useShallow } from "zustand/react/shallow";

export default function LinksSocialIcons() {
  const link = useLinkStore(useShallow((state) => state.link));
  const socialIconSize = (link?.header_styles_social_icons_size || 0) * 24;
  return (
    link?.socials && (
      <div className="social-icons-container flex mt-[31px] justify-center items-center flex-wrap">
        {link?.socials.map((social) => {
          return !social?.icon ? (
            <div key={social.id} className="w-full"></div>
          ) : (
            <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer">
              {!social.label ? (
                <Icon
                  name={social.icon}
                  size={socialIconSize + 24}
                  // @ts-expect-error: [props distruct in Icon component]
                  style={{margin: "calc(4.2px + .21em)"}}
                />
              ) : (
                <div
                  className={cn(
                    "flex items-center justify-center border-[0.2em] rounded-[2em] border-solid"
                  )}
                  style={{
                    color: link?.general_styles_primary_text_color,
                    borderColor: link?.general_styles_primary_text_color,
                  }}
                  dir="ltr"
                >
                  <Icon
                    name={social.icon}
                    size={socialIconSize + 24}
                    // @ts-expect-error: [props distruct in Icon component]
                    style={{margin: "calc(4.2px + .21em)"}}
                  />
                  <span className="text-xs text-center font-semibold mr-2">
                    {social.label}
                  </span>
                </div>
              )}
            </a>
          );
        })}
      </div>
    )
  );
}
