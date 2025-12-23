import { useTranslations } from "next-intl";
import { useUpdateLink } from "../../../hooks/useUpdateLink";
import { DashboardChromPicker } from "../../DashboardChromPicker";
import { DashboardSlider } from "../../DashboardSlider";
import { DashboardSwitch } from "../../DashboardSwitch";
import { useLinkStore } from "../../../../../../../../store/use-link-store";

export default function HeaderStyles() {
  const t = useTranslations("LinksPage.headerStyles");
  const { handleLinkPropertyValChange } = useUpdateLink();
  const linkRaw = useLinkStore((state) => state.linkRaw);

  return (
    <div className="section">
      <div className="section-title text-[.82rem] font-bold mb-[22px]">
        {t("title")}
      </div>
      <DashboardSlider
        label={t("profilePictureShadow")}
        defaultValue={[linkRaw?.header_styles_profile_shadow || 0]}
        max={1}
        step={0.001}
        onValueChange={(value) =>
          handleLinkPropertyValChange(
            "header_styles_profile_shadow",
            value,
            false
          )
        }
        onValueCommit={(value) => {
          console.log("value", value);

          handleLinkPropertyValChange("header_styles_profile_shadow", value);
        }}
      />
      <DashboardSlider
        label={t("profilePictureBorder")}
        defaultValue={[linkRaw?.header_styles_profile_border_width || 0]}
        max={1}
        step={0.001}
        onValueChange={(value) => {
          handleLinkPropertyValChange(
            "header_styles_profile_border_width",
            value,
            false
          );
        }}
        onValueCommit={(value) => {
          handleLinkPropertyValChange(
            "header_styles_profile_border_width",
            value
          );
        }}
      />

      {linkRaw?.header_styles_profile_border_width &&
      linkRaw?.header_styles_profile_border_width > 0 ? (
        <DashboardChromPicker
          label={t("profilePictureBorderColor")}
          currentColorLabel="header_styles_profile_border_color"
        />
      ) : null}

      <DashboardSwitch
        label={t("collapseLongBio")}
        tooltipContent={t("collapseLongBioTooltip")}
        checked={linkRaw?.header_styles_collapse_long_bio}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange(
            "header_styles_collapse_long_bio",
            checked
          )
        }
      />
      <DashboardSlider
        label={t("textSpacing")}
        defaultValue={[linkRaw?.header_styles_text_spacing || 0]}
        max={1}
        step={0.001}
        onValueChange={(value) =>
          handleLinkPropertyValChange(
            "header_styles_text_spacing",
            value,
            false
          )
        }
        onValueCommit={(value) =>
          handleLinkPropertyValChange("header_styles_text_spacing", value)
        }
      />
      <DashboardSlider
        label={t("socialIconSize")}
        defaultValue={[linkRaw?.header_styles_social_icons_size || 0]}
        max={1}
        step={0.001}
        onValueChange={(value) =>
          handleLinkPropertyValChange(
            "header_styles_social_icons_size",
            value,
            false
          )
        }
        onValueCommit={(value) =>
          handleLinkPropertyValChange("header_styles_social_icons_size", value)
        }
      />
    </div>
  );
}
