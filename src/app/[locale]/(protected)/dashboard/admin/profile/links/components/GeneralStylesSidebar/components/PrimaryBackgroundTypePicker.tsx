"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { Link } from "../../../../../../../../store/use-link-store";
import { DashboardChromPicker } from "../../DashboardChromPicker";
import { DashboardSlider } from "../../DashboardSlider";

interface PrimaryBackgroundTypePickerProps {
  link: Link;
  onColorChange: (
    key: keyof Link,
    value: string | boolean | number,
    shouldPersistToDatabase?: boolean
  ) => void;
}

export function PrimaryBackgroundTypePicker({
  link,
  onColorChange,
}: PrimaryBackgroundTypePickerProps) {
  const t = useTranslations("LinksPage");

  const handleOnChange = (
    key: keyof Link,
    value: string | boolean | number,
    shouldPersistToDatabase?: boolean
  ) => {
    onColorChange(key, value, shouldPersistToDatabase);
  };

  return (
    <div className="mb-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between dashboard-general-style-controller cursor-pointer"
          >
            <span className="flex items-center">{t("primaryBgColor")}</span>
            {link?.general_styles_primary_bgcolor && (
              <div
                className="rounded-full w-6 h-6"
                style={{
                  background:
                    link.general_styles_enable_gradient &&
                    link.general_styles_gradient_color
                      ? (() => {
                          const direction =
                            link.general_styles_gradient_direction || 145;
                          const offset =
                            link.general_styles_gradient_offset || 50;
                          const startPercent = Math.max(0, offset - 25);
                          const endPercent = Math.min(100, offset + 25);
                          return `linear-gradient(${direction}deg, ${link.general_styles_primary_bgcolor} ${startPercent}%, ${link.general_styles_gradient_color} ${endPercent}%)`;
                        })()
                      : link.general_styles_enable_gradient === false &&
                        link.general_styles_gradient_offset !== undefined &&
                        link.general_styles_gradient_color
                      ? (() => {
                          const direction =
                            link.general_styles_gradient_direction || 145;
                          const offset =
                            link.general_styles_gradient_offset || 50;
                          return `linear-gradient(${direction}deg, ${link.general_styles_primary_bgcolor} 0%, ${link.general_styles_primary_bgcolor} ${offset}%, ${link.general_styles_gradient_color} ${offset}%, ${link.general_styles_gradient_color} 100%)`;
                        })()
                      : link.general_styles_primary_bgcolor,
                }}
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-96 p-4"
          side="right"
          sideOffset={-250}
          align="start"
          style={{ transform: "translateY(105px)" }}
        >
          <div className="mb-3">
            <h4 className="font-semibold">{t("primaryBgColor")}</h4>
          </div>
          <Tabs
            defaultValue={
              link?.general_styles_enable_gradient === true
                ? "gradient"
                : link?.general_styles_enable_gradient === false &&
                  link?.general_styles_gradient_offset !== undefined
                ? "split"
                : "solid"
            }
            onValueChange={(value) => {
              if (value === "gradient") {
                handleOnChange("general_styles_enable_gradient", true);
                handleOnChange("general_styles_gradient_offset", 50);
              } else if (value === "split") {
                handleOnChange("general_styles_enable_gradient", false);
                handleOnChange("general_styles_gradient_offset", 50);
              } else {
                handleOnChange("general_styles_enable_gradient", false);
              }
            }}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="solid">{t("solid")}</TabsTrigger>
              <TabsTrigger value="gradient">{t("gradient")}</TabsTrigger>
              <TabsTrigger value="split">{t("split")}</TabsTrigger>
            </TabsList>
            <div className="mt-3 space-y-3">
              <TabsContent value="solid">
                <DashboardChromPicker
                  label={t("primaryBgColor")}
                  currentColorLabel="general_styles_primary_bgcolor"
                  onColorChange={({ hex }: { hex: string }) =>
                    handleOnChange("general_styles_primary_bgcolor", hex, false)
                  }
                  onChangeComplete={({ hex }: { hex: string }) =>
                    handleOnChange("general_styles_primary_bgcolor", hex)
                  }
                />
              </TabsContent>
              <TabsContent value="gradient">
                <div className="space-y-3">
                  <DashboardChromPicker
                    label={t("gradientStartColor")}
                    currentColorLabel="general_styles_primary_bgcolor"
                    onColorChange={({ hex }: { hex: string }) =>
                      handleOnChange(
                        "general_styles_primary_bgcolor",
                        hex,
                        false
                      )
                    }
                    onChangeComplete={({ hex }: { hex: string }) =>
                      handleOnChange("general_styles_primary_bgcolor", hex)
                    }
                  />
                  <DashboardChromPicker
                    label={t("gradientEndColor")}
                    currentColorLabel="general_styles_gradient_color"
                    onColorChange={({ hex }: { hex: string }) =>
                      handleOnChange(
                        "general_styles_gradient_color",
                        hex,
                        false
                      )
                    }
                    onChangeComplete={({ hex }: { hex: string }) =>
                      handleOnChange("general_styles_gradient_color", hex)
                    }
                  />
                  <DashboardSlider
                    label={t("gradientDirection")}
                    defaultValue={[
                      link?.general_styles_gradient_direction || 145,
                    ]}
                    max={360}
                    min={1}
                    step={1}
                    onValueChange={(value) => {
                      handleOnChange(
                        "general_styles_gradient_direction",
                        value,
                        false
                      );
                    }}
                    onValueCommit={(value) => {
                      handleOnChange(
                        "general_styles_gradient_direction",
                        value
                      );
                    }}
                  />
                  <DashboardSlider
                    label={t("gradientOffset")}
                    defaultValue={[link?.general_styles_gradient_offset || 50]}
                    max={100}
                    min={1}
                    step={1}
                    onValueChange={(value) =>
                      handleOnChange(
                        "general_styles_gradient_offset",
                        value,
                        false
                      )
                    }
                    onValueCommit={(value) =>
                      handleOnChange("general_styles_gradient_offset", value)
                    }
                  />
                </div>
              </TabsContent>
              <TabsContent value="split">
                <div className="space-y-3">
                  <DashboardChromPicker
                    label={t("splitColor1")}
                    currentColorLabel="general_styles_primary_bgcolor"
                    onColorChange={({ hex }: { hex: string }) =>
                      handleOnChange(
                        "general_styles_primary_bgcolor",
                        hex,
                        false
                      )
                    }
                    onChangeComplete={({ hex }: { hex: string }) =>
                      handleOnChange("general_styles_primary_bgcolor", hex)
                    }
                  />
                  <DashboardChromPicker
                    label={t("splitColor2")}
                    currentColorLabel="general_styles_gradient_color"
                    onColorChange={({ hex }: { hex: string }) =>
                      handleOnChange(
                        "general_styles_gradient_color",
                        hex,
                        false
                      )
                    }
                    onChangeComplete={({ hex }: { hex: string }) =>
                      handleOnChange("general_styles_gradient_color", hex)
                    }
                  />
                  <DashboardSlider
                    label={t("splitDirection")}
                    defaultValue={[
                      link?.general_styles_gradient_direction || 145,
                    ]}
                    max={360}
                    min={1}
                    step={1}
                    onValueChange={(value) => {
                      handleOnChange(
                        "general_styles_gradient_direction",
                        value,
                        false
                      );
                    }}
                    onValueCommit={(value) => {
                      handleOnChange(
                        "general_styles_gradient_direction",
                        value
                      );
                    }}
                  />
                  <DashboardSlider
                    label={t("splitPosition")}
                    defaultValue={[link?.general_styles_gradient_offset || 50]}
                    max={100}
                    min={1}
                    step={1}
                    onValueChange={(value) =>
                      handleOnChange(
                        "general_styles_gradient_offset",
                        value,
                        false
                      )
                    }
                    onValueCommit={(value) =>
                      handleOnChange("general_styles_gradient_offset", value)
                    }
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
}
