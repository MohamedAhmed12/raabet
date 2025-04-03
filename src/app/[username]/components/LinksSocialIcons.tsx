import { useLinkStore } from "@/app/store/use-link-store";
import { Icon } from "@/components/Icon";

export default function LinksSocialIcons() {
  const socials = useLinkStore((state) => state.link.socials);

  return (
    socials && (
      <div className="social-icons-container flex mt-[31px] justify-center items-center flex-wrap">
        {socials.map((social) => {
          return !social?.icon ? (
            <div key={social.id} className="w-full"></div>
          ) : (
            <a key={social.id}>
              <Icon
                name={social.icon}
                sizeClass="md"
                style={{ margin: "calc(4.2px + .18em)" }}
              />
            </a>
          );
        })}
      </div>
    )
  );
}
