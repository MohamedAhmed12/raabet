import { Link, useLinkStore } from "@/app/store/use-link-store";
import { DashboardSlider } from "../../DashboardSlider";
import { DashboardSwitch } from "../../DashboardSwitch";
import { DashboardChromPicker } from "../../DashboardChromPicker";

export default function HeaderStyles() {
  const { link, setLink } = useLinkStore((state) => state);

  const handleLinkPropertyValChange = (
    key: keyof Link,
    val: string | boolean | number
  ) => {
    setLink({ [key]: val });
  };

  return (
    <div className="section">
      <div className="section-title text-[.82rem] font-bold mb-[22px]">
        Header Styles
      </div>
      <DashboardSlider
        label="Profile Picture Shadow"
        defaultValue={[0.02]}
        max={1}
        step={0.001}
        onValueChange={(value) =>
          handleLinkPropertyValChange("header_styles_profile_shadow", value)
        }
      />
      <DashboardSlider
        label="Profile Picture border"
        defaultValue={[0]}
        max={1}
        step={0.001}
        onValueChange={(value) =>
          handleLinkPropertyValChange(
            "header_styles_profile_border_width",
            value
          )
        }
      />

      {link.header_styles_profile_border_width > 0 && (
        <DashboardChromPicker
          label="profile picture border color"
          currentColor={link.header_styles_profile_border_color}
          onColorChange={({ hex }: { hex: string }) =>
            handleLinkPropertyValChange(
              "header_styles_profile_border_color",
              hex
            )
          }
        />
      )}

      <DashboardSwitch
        label="Collapse Long Bio"
        tooltipContent="aaa"
        checked={link.header_styles_collapse_long_bio}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange(
            "header_styles_collapse_long_bio",
            checked
          )
        }
      />
      <DashboardSlider
        label="Social Icon Size"
        defaultValue={[0.02]}
        max={1}
        step={0.001}
        onValueChange={(value) =>
          handleLinkPropertyValChange("header_styles_social_icons_size", value)
        }
      />
    </div>
  );
}
