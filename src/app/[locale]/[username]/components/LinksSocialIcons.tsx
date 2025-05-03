import {useLinkStore} from "@/app/[locale]/store/use-link-store";
import {Icon} from "@/components/Icon";

export default function LinksSocialIcons() {
  const link = useLinkStore((state) => state.link);
  const socialIconSize = (link?.header_styles_social_icons_size || 0) * 24;

  return (
    link?.socials && (
      <div className="social-icons-container flex mt-[31px] justify-center items-center flex-wrap">
        {link?.socials.map((social) => {
          return !social?.icon ? (
            <div key={social.id} className="w-full"></div>
          ) : (
            <a key={social.id}>
              <Icon
                name={social.icon}
                size={socialIconSize + 24}
                style={{margin: "calc(4.2px + .21em)"}}
              />
            </a>
          );
        })}
      </div>
    )
  );
}
