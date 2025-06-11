import { useTranslations } from "next-intl";
import { useUpdateLink } from "../../../hooks/useUpdateLink";
import { DashboardChromPicker } from "../../DashboardChromPicker";
import { DashboardSlider } from "../../DashboardSlider";
import { DashboardSwitch } from "../../DashboardSwitch";

export default function HeaderStyles() {
  const t = useTranslations("LinksPage.headerStyles");
  const { link, handleLinkPropertyValChange } = useUpdateLink();

  return (
    <div className="section">
      <div className="section-title text-[.82rem] font-bold mb-[22px]">
        {t("title")}
      </div>
      <DashboardSlider
        label={t("profilePictureShadow")}
        defaultValue={[link?.header_styles_profile_shadow || 0]}
        max={1}
        step={0.001}
        onValueChange={(value) =>
          handleLinkPropertyValChange("header_styles_profile_shadow", value)
        }
      />
      <DashboardSlider
        label={t("profilePictureBorder")}
        defaultValue={[link?.header_styles_profile_border_width || 0]}
        max={1}
        step={0.001}
        onValueChange={(value) => {
          handleLinkPropertyValChange(
            "header_styles_profile_border_width",
            value
          );
        }}
      />

      {link?.header_styles_profile_border_width &&
      link?.header_styles_profile_border_width > 0 ? (
        <DashboardChromPicker
          label={t("profilePictureBorderColor")}
          currentColor={link?.header_styles_profile_border_color}
          onColorChange={({ hex }: { hex: string }) =>
            handleLinkPropertyValChange(
              "header_styles_profile_border_color",
              hex
            )
          }
        />
      ) : null}

      <DashboardSwitch
        label={t("collapseLongBio")}
        tooltipContent={t("collapseLongBioTooltip")}
        checked={link?.header_styles_collapse_long_bio}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange(
            "header_styles_collapse_long_bio",
            checked
          )
        }
      />
      <DashboardSlider
        label={t("socialIconSize")}
        defaultValue={[link?.header_styles_social_icons_size || 0]}
        max={1}
        step={0.001}
        onValueChange={(value) =>
          handleLinkPropertyValChange("header_styles_social_icons_size", value)
        }
      />
    </div>
  );
}
