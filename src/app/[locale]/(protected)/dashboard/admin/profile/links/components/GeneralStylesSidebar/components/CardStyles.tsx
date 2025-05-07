import {useTranslations} from "use-intl";
import {useUpdateLink} from "../../../hooks/useUpdateLink";
import {CardDesignToggleGroup} from "../../CardDesignToggleGroup";
import {DashboardChromPicker} from "../../DashboardChromPicker";
import {DashboardSlider} from "../../DashboardSlider";
import {cardDesigns} from "../constants";

export default function CardStyles() {
  const t = useTranslations("LinksPage.cardStyles");
  const {link, handleLinkPropertyValChange} = useUpdateLink();

  return (
    <div className="section">
      <div className="section-title text-[.82rem] font-bold mb-[22px]">
        {t("title")}
      </div>

      <CardDesignToggleGroup
        initialVal={link?.card_styles_design?.toString()}
        title={t("designGroupTitle")}
        hasTooltip
        tooltipContent={t("designGrouptooltipContent")}
        toggleItems={cardDesigns}
        onValueChange={(value) => {
          const numericValue = parseInt(value);
          handleLinkPropertyValChange("card_styles_design", numericValue);
        }}
      />

      <DashboardChromPicker
        label={t("cardTextColor")}
        currentColor={link?.card_styles_text_color}
        onColorChange={({hex}: {hex: string}) =>
          handleLinkPropertyValChange("card_styles_text_color", hex)
        }
      />
      {link?.general_styles_is_label_exist === true && (
        <>
          <DashboardChromPicker
            label={t("labelColor")}
            currentColor={link?.card_styles_label_color}
            onColorChange={({hex}: {hex: string}) =>
              handleLinkPropertyValChange("card_styles_label_color", hex)
            }
          />
          <DashboardChromPicker
            label={t("labelTextColor")}
            currentColor={link?.card_styles_label_text_color}
            onColorChange={({hex}: {hex: string}) =>
              handleLinkPropertyValChange("card_styles_label_text_color", hex)
            }
          />
        </>
      )}
      <DashboardSlider
        label={t("cardCorner")}
        defaultValue={[0.02]}
        max={1}
        step={0.001}
        onValueChange={(value) =>
          handleLinkPropertyValChange("card_styles_card_corner", value)
        }
      />
      {link?.card_styles_design === 0 && (
        <>
          <DashboardChromPicker
            label={t("cardColor")}
            currentColor={link?.card_styles_card_color}
            onColorChange={({hex}: {hex: string}) =>
              handleLinkPropertyValChange("card_styles_card_color", hex)
            }
          />
          <DashboardSlider
            label={t("cardBorder")}
            defaultValue={[0.02]}
            max={1}
            step={0.001}
            onValueChange={(value) =>
              handleLinkPropertyValChange(
                "card_styles_card_border_width",
                value
              )
            }
          />
          {link?.card_styles_card_border_width > 0 && (
            <DashboardChromPicker
              label={t("cardBorderColor")}
              currentColor={link?.card_styles_card_border_color}
              onColorChange={({hex}: {hex: string}) =>
                handleLinkPropertyValChange(
                  "card_styles_card_border_color",
                  hex
                )
              }
            />
          )}
          <DashboardSlider
            label={t("cardShadow")}
            defaultValue={[0.02]}
            max={1}
            step={0.001}
            onValueChange={(value) =>
              handleLinkPropertyValChange("card_styles_card_shadow", value)
            }
          />
          <DashboardSlider
            label={t("cardSpacing")}
            defaultValue={[0.02]}
            max={1}
            step={0.001}
            onValueChange={(value) =>
              handleLinkPropertyValChange("card_styles_card_spacing", value)
            }
          />
        </>
      )}
    </div>
  );
}
