import {useUpdateLink} from "../../../helper/UpdateLinkData";
import {CardDesignToggleGroup} from "../../CardDesignToggleGroup";
import {DashboardChromPicker} from "../../DashboardChromPicker";
import {DashboardSlider} from "../../DashboardSlider";
import {cardDesigns} from "../constants";

export default function CardStyles() {
  const {link, handleLinkPropertyValChange} = useUpdateLink();

  return (
    <div className="section">
      <div className="section-title text-[.82rem] font-bold mb-[22px]">
        Card Styles
      </div>

      <CardDesignToggleGroup
        initialVal={link?.card_styles_design?.toString()}
        title="Tactile Cards"
        hasTooltip
        tooltipContent="Tactile cards give your cards a soft, tactile, look and feel. When using tactile cards, your page's background color will be used as the card color. Some design options are not available when using tactile cards."
        toggleItems={cardDesigns}
        onValueChange={(value) => {
          const numericValue = parseInt(value);
          handleLinkPropertyValChange("card_styles_design", numericValue);
        }}
      />

      <DashboardChromPicker
        label="card text color"
        currentColor={link?.card_styles_text_color}
        onColorChange={({hex}: {hex: string}) =>
          handleLinkPropertyValChange("card_styles_text_color", hex)
        }
      />
      {link?.general_styles_is_label_exist === true && (
        <>
          <DashboardChromPicker
            label="label color"
            currentColor={link?.card_styles_label_color}
            onColorChange={({hex}: {hex: string}) =>
              handleLinkPropertyValChange("card_styles_label_color", hex)
            }
          />
          <DashboardChromPicker
            label="label text color"
            currentColor={link?.card_styles_label_text_color}
            onColorChange={({hex}: {hex: string}) =>
              handleLinkPropertyValChange("card_styles_label_text_color", hex)
            }
          />
        </>
      )}
      <DashboardSlider
        label="card corner"
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
            label="card color"
            currentColor={link?.card_styles_card_color}
            onColorChange={({hex}: {hex: string}) =>
              handleLinkPropertyValChange("card_styles_card_color", hex)
            }
          />
          <DashboardSlider
            label="card border"
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
          {link?.card_styles_card_border_width &&
            link?.card_styles_card_border_width > 0 && (
              <DashboardChromPicker
                label="card border color"
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
            label="card shadow"
            defaultValue={[0.02]}
            max={1}
            step={0.001}
            onValueChange={(value) =>
              handleLinkPropertyValChange("card_styles_card_shadow", value)
            }
          />
          <DashboardSlider
            label="card spacing"
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
