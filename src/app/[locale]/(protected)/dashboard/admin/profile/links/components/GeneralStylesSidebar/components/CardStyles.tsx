import { useTranslations } from "use-intl";
import { useUpdateLink } from "../../../hooks/useUpdateLink";
import { CardDesignToggleGroup } from "../../CardDesignToggleGroup";
import { DashboardChromPicker } from "../../DashboardChromPicker";
import { DashboardSlider } from "../../DashboardSlider";
import { cardDesigns } from "../constants";

export default function CardStyles() {
  const t = useTranslations("LinksPage.cardStyles");
  const { link, handleLinkPropertyValChange } = useUpdateLink();

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

      {link?.card_styles_design === 0 && (
        <DashboardChromPicker
          label={t("cardColor")}
          currentColorLabel="card_styles_card_color"
          onColorChange={({ hex }: { hex: string }) =>
            handleLinkPropertyValChange("card_styles_card_color", hex, false)
          }
          onChangeComplete={({ hex }: { hex: string }) =>
            handleLinkPropertyValChange("card_styles_card_color", hex)
          }
        />
      )}

      <DashboardChromPicker
        label={t("cardTextColor")}
        currentColorLabel="card_styles_text_color"
        onColorChange={({ hex }: { hex: string }) =>
          handleLinkPropertyValChange("card_styles_text_color", hex, false)
        }
        onChangeComplete={({ hex }: { hex: string }) =>
          handleLinkPropertyValChange("card_styles_text_color", hex)
        }
      />
      {link?.general_styles_is_label_exist === true && (
        <>
          <DashboardChromPicker
            label={t("labelColor")}
            currentColorLabel="card_styles_label_color"
            onColorChange={({ hex }: { hex: string }) =>
              handleLinkPropertyValChange("card_styles_label_color", hex, false)
            }
            onChangeComplete={({ hex }: { hex: string }) =>
              handleLinkPropertyValChange("card_styles_label_color", hex)
            }
          />
          <DashboardChromPicker
            label={t("labelTextColor")}
            currentColorLabel="card_styles_label_text_color"
            onColorChange={({ hex }: { hex: string }) =>
              handleLinkPropertyValChange(
                "card_styles_label_text_color",
                hex,
                false
              )
            }
            onChangeComplete={({ hex }: { hex: string }) =>
              handleLinkPropertyValChange("card_styles_label_text_color", hex)
            }
          />
        </>
      )}
      <DashboardSlider
        label={t("cardCorner")}
        defaultValue={[link?.card_styles_card_corner || 0]}
        max={1}
        step={0.001}
        onValueChange={(value) =>
          handleLinkPropertyValChange("card_styles_card_corner", value, false)
        }
        onValueCommit={(value) =>
          handleLinkPropertyValChange("card_styles_card_corner", value)
        }
      />
      {link?.card_styles_design === 0 && (
        <>
          <DashboardSlider
            label={t("cardBorder")}
            defaultValue={[link?.card_styles_card_border_width || 0]}
            max={1}
            step={0.001}
            onValueChange={(value) =>
              handleLinkPropertyValChange(
                "card_styles_card_border_width",
                value,
                false
              )
            }
            onValueCommit={(value) =>
              handleLinkPropertyValChange(
                "card_styles_card_border_width",
                value
              )
            }
          />
          {link?.card_styles_card_border_width &&
          link?.card_styles_card_border_width > 0 ? (
            <DashboardChromPicker
              label={t("cardBorderColor")}
              currentColorLabel="card_styles_card_border_color"
              onColorChange={({ hex }: { hex: string }) =>
                handleLinkPropertyValChange(
                  "card_styles_card_border_color",
                  hex,
                  false
                )
              }
              onChangeComplete={({ hex }: { hex: string }) =>
                handleLinkPropertyValChange(
                  "card_styles_card_border_color",
                  hex
                )
              }
            />
          ) : null}
          <DashboardSlider
            label={t("cardShadow")}
            defaultValue={[link?.card_styles_card_shadow || 0]}
            max={1}
            step={0.001}
            onValueChange={(value) =>
              handleLinkPropertyValChange(
                "card_styles_card_shadow",
                value,
                false
              )
            }
            onValueCommit={(value) =>
              handleLinkPropertyValChange("card_styles_card_shadow", value)
            }
          />
          <DashboardSlider
            label={t("cardSpacing")}
            defaultValue={[link?.card_styles_card_spacing || 0]}
            max={1}
            step={0.001}
            onValueChange={(value) =>
              handleLinkPropertyValChange(
                "card_styles_card_spacing",
                value,
                false
              )
            }
            onValueCommit={(value) =>
              handleLinkPropertyValChange("card_styles_card_spacing", value)
            }
          />
        </>
      )}
    </div>
  );
}
