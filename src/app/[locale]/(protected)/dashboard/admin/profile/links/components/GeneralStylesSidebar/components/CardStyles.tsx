import type { Link } from "@/app/[locale]/types/link";
import { useState } from "react";
import { useTranslations } from "use-intl";
import { useUpdateLinkField } from "../../../hooks/useUpdateLink";
import { CardDesignToggleGroup } from "../../CardDesignToggleGroup";
import { DashboardChromPicker } from "../../DashboardChromPicker";
import { DashboardSlider } from "../../DashboardSlider";
import { cardDesigns } from "../constants";

export default function CardStyles({ linkRaw }: { linkRaw?: Link }) {
  const t = useTranslations("LinksPage.cardStyles");
  const updateLinkField = useUpdateLinkField();

  const [localCardDesign, setLocalCardDesign] = useState<number>(
    linkRaw?.card_styles_design || 0
  );
  return (
    <div className="section">
      <div className="section-title text-[.82rem] font-bold mb-[22px]">
        {t("title")}
      </div>

      <CardDesignToggleGroup
        initialVal={localCardDesign?.toString()}
        title={t("designGroupTitle")}
        hasTooltip
        tooltipContent={t("designGrouptooltipContent")}
        toggleItems={cardDesigns}
        onValueChange={(value) => {
          const numericValue = parseInt(value);
          setLocalCardDesign(numericValue);
          updateLinkField("card_styles_design", numericValue);
        }}
      />

      {localCardDesign === 0 && (
        <DashboardChromPicker
          label={t("cardColor")}
          currentColorLabel="card_styles_card_color"
        />
      )}

      <DashboardChromPicker
        label={t("cardTextColor")}
        currentColorLabel="card_styles_text_color"
      />
      <DashboardChromPicker
        label={t("labelColor")}
        currentColorLabel="card_styles_label_color"
      />
      <DashboardSlider
        label={t("cardCorner")}
        defaultValue={[linkRaw?.card_styles_card_corner || 0]}
        max={1}
        step={0.001}
        onValueChange={(value) =>
          updateLinkField("card_styles_card_corner", value, false)
        }
        onValueCommit={(value) =>
          updateLinkField("card_styles_card_corner", value)
        }
      />
      {localCardDesign === 0 && (
        <>
          <DashboardSlider
            label={t("cardBorder")}
            defaultValue={[linkRaw?.card_styles_card_border_width || 0]}
            max={1}
            step={0.001}
            onValueChange={(value) =>
              updateLinkField("card_styles_card_border_width", value, false)
            }
            onValueCommit={(value) =>
              updateLinkField("card_styles_card_border_width", value)
            }
          />
          {linkRaw?.card_styles_card_border_width &&
          linkRaw?.card_styles_card_border_width > 0 ? (
            <DashboardChromPicker
              label={t("cardBorderColor")}
              currentColorLabel="card_styles_card_border_color"
            />
          ) : null}
          <DashboardSlider
            label={t("cardShadow")}
            defaultValue={[linkRaw?.card_styles_card_shadow || 0]}
            max={1}
            step={0.001}
            onValueChange={(value) =>
              updateLinkField("card_styles_card_shadow", value, false)
            }
            onValueCommit={(value) =>
              updateLinkField("card_styles_card_shadow", value)
            }
          />
          <DashboardSlider
            label={t("cardSpacing")}
            defaultValue={[linkRaw?.card_styles_card_spacing || 0]}
            max={1}
            step={0.001}
            onValueChange={(value) =>
              updateLinkField("card_styles_card_spacing", value, false)
            }
            onValueCommit={(value) =>
              updateLinkField("card_styles_card_spacing", value)
            }
          />
        </>
      )}
    </div>
  );
}
