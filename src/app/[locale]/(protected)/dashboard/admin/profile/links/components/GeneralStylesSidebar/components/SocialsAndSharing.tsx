import { useTranslations } from "next-intl";
import { useUpdateLink } from "../../../hooks/useUpdateLink";
import { DashboardChromPicker } from "../../DashboardChromPicker";
import { DashboardSlider } from "../../DashboardSlider";
import { DashboardSwitch } from "../../DashboardSwitch";

export default function SocialsAndSharing() {
  const t = useTranslations("LinksPage.headerStyles");
  const { link, handleLinkPropertyValChange } = useUpdateLink();

  return (
    <div className="section">
      <div className="section-title text-[.82rem] font-bold mb-[22px]">
        Social & Sharing
      </div>
      <DashboardSwitch
        label="Enable Add Contact"
        checked={link.general_styles_is_secondary_bgcolor}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange(
            "general_styles_is_secondary_bgcolor",
            checked
          )
        }
      />
      <DashboardSwitch
        label="Enable Share Button"
        checked={link.general_styles_is_secondary_bgcolor}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange(
            "general_styles_is_secondary_bgcolor",
            checked
          )
        }
      />
      <DashboardSwitch
        label="Click For QR Code"
        checked={link.general_styles_is_secondary_bgcolor}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange(
            "general_styles_is_secondary_bgcolor",
            checked
          )
        }
      />
      <DashboardSwitch
        label="Hide Links Branding"
        checked={link.general_styles_is_secondary_bgcolor}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange(
            "general_styles_is_secondary_bgcolor",
            checked
          )
        }
      />
      <DashboardSwitch
        label="Enable Verified Badge"
        checked={link.general_styles_is_secondary_bgcolor}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange(
            "general_styles_is_secondary_bgcolor",
            checked
          )
        }
      />
    </div>
  );
}
