import { useUpdateLink } from "../../../hooks/useUpdateLink";
import { DashboardChromPicker } from "../../DashboardChromPicker";
import { DashboardSwitch } from "../../DashboardSwitch";

export default function GeneralStyles() {
  const { link, handleLinkPropertyValChange } = useUpdateLink();

  return (
    <div className="section">
      <div className="section-title text-[.82rem] font-bold mb-[22px]">
        General Styles
      </div>
      <DashboardChromPicker
        label="primary text color"
        currentColor={link.general_styles_primary_text_color}
        onColorChange={({ hex }: { hex: string }) =>
          handleLinkPropertyValChange("general_styles_primary_text_color", hex)
        }
      />
      <DashboardChromPicker
        label="primary background color"
        currentColor={link.general_styles_primary_bgcolor}
        onColorChange={({ hex }: { hex: string }) =>
          handleLinkPropertyValChange("general_styles_primary_bgcolor", hex)
        }
      />
      <DashboardSwitch
        label="secondary background"
        checked={link.general_styles_is_secondary_bgcolor}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange(
            "general_styles_is_secondary_bgcolor",
            checked
          )
        }
      />

      {link.general_styles_is_secondary_bgcolor && (
        <DashboardChromPicker
          label="secondary primary background color"
          currentColor={link.general_styles_secondary_bgcolor}
          onColorChange={({ hex }: { hex: string }) =>
            handleLinkPropertyValChange("general_styles_secondary_bgcolor", hex)
          }
        />
      )}

      <DashboardChromPicker
        label="desktop background color"
        currentColor={link.general_styles_desktop_bgcolor}
        onColorChange={({ hex }: { hex: string }) =>
          handleLinkPropertyValChange("general_styles_desktop_bgcolor", hex)
        }
      />

      {/* to be applied next itteration */}
      {/* 
      <Tabs
        onValueChange={(val) =>
          handleLinkPropertyValChange("general_styles_soft_shadow", val == "1")
        }
        defaultValue={link.general_styles_soft_shadow ? "1" : "0"}
        className="w-full"
      >
        <TabsList className="flex gap-2 w-full">
          <TabsTrigger value="1" className="cursor-pointer capitalize">
            soft shadow
          </TabsTrigger>
          <TabsTrigger value="0" className="cursor-pointer capitalize">
            solid shadow
          </TabsTrigger>
        </TabsList>
      </Tabs> */}
    </div>
  );
}
