"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useShallow } from "zustand/shallow";
import {
  Link,
  useLinkStore,
} from "../../../../../../../../store/use-link-store";
import { useUpdateLink } from "../../../hooks/useUpdateLink";
import { DashboardChromPicker } from "../../DashboardChromPicker";
import { DashboardSlider } from "../../DashboardSlider";
import { DashboardSwitch } from "../../DashboardSwitch";

export function PrimaryBackgroundTypePicker() {
  const t = useTranslations("LinksPage");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const link = useLinkStore(useShallow((state) => state.link));
  const { handleLinkPropertyValChange } = useUpdateLink();

  const handleOnChange = (
    key: keyof Link,
    value: string | boolean | number,
    shouldPersistToDatabase?: boolean
  ) => {
    handleLinkPropertyValChange(key, value, shouldPersistToDatabase);
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
            {link?.general_styles_background_type === "image" &&
            link?.general_styles_bg_image ? (
              <div
                className="rounded-full w-6 h-6 border border-gray-300 overflow-hidden"
                style={{
                  backgroundImage: `url(${link.general_styles_bg_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: link.general_styles_bg_image_blur
                    ? "blur(1.5px)"
                    : "none",
                }}
              />
            ) : (
              link?.general_styles_primary_bgcolor && (
                <div
                  className="rounded-full w-6 h-6 border border-gray-300"
                  style={{
                    background:
                      link.general_styles_background_type === "gradient" &&
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
                        : link.general_styles_background_type === "split" &&
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
              )
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
            defaultValue={link?.general_styles_background_type || "solid"}
            onValueChange={(value) => {
              handleOnChange("general_styles_background_type", value, true);
              // Set default offset for gradient and split
              if (value === "gradient" || value === "split") {
                handleOnChange("general_styles_gradient_offset", 50, true);
              }
            }}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="solid">{t("solid")}</TabsTrigger>
              <TabsTrigger value="gradient">{t("gradient")}</TabsTrigger>
              <TabsTrigger value="split">{t("split")}</TabsTrigger>
              <TabsTrigger value="image">{t("image")}</TabsTrigger>
            </TabsList>
            <div className="mt-3 space-y-3">
              <TabsContent value="solid">
                <DashboardChromPicker
                  label={t("primaryBgColor")}
                  currentColorLabel="general_styles_primary_bgcolor"
                />
              </TabsContent>
              <TabsContent value="gradient">
                <div className="space-y-3">
                  <DashboardChromPicker
                    label={t("gradientStartColor")}
                    currentColorLabel="general_styles_primary_bgcolor"
                  />
                  <DashboardChromPicker
                    label={t("gradientEndColor")}
                    currentColorLabel="general_styles_gradient_color"
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
                      const clampedValue = Math.max(1, value);
                      handleOnChange(
                        "general_styles_gradient_direction",
                        clampedValue,
                        true
                      );
                    }}
                    onValueCommit={(value) => {
                      const clampedValue = Math.max(1, value);
                      handleOnChange(
                        "general_styles_gradient_direction",
                        clampedValue,
                        true
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
                        true
                      )
                    }
                    onValueCommit={(value) =>
                      handleOnChange(
                        "general_styles_gradient_offset",
                        value,
                        true
                      )
                    }
                  />
                </div>
              </TabsContent>
              <TabsContent value="split">
                <div className="space-y-3">
                  <DashboardChromPicker
                    label={t("splitColor1")}
                    currentColorLabel="general_styles_primary_bgcolor"
                  />
                  <DashboardChromPicker
                    label={t("splitColor2")}
                    currentColorLabel="general_styles_gradient_color"
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
                      const clampedValue = Math.max(1, value);
                      handleOnChange(
                        "general_styles_gradient_direction",
                        clampedValue,
                        true
                      );
                    }}
                    onValueCommit={(value) => {
                      const clampedValue = Math.max(1, value);
                      handleOnChange(
                        "general_styles_gradient_direction",
                        clampedValue,
                        true
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
                        true
                      )
                    }
                    onValueCommit={(value) =>
                      handleOnChange(
                        "general_styles_gradient_offset",
                        value,
                        true
                      )
                    }
                  />
                </div>
              </TabsContent>
              <TabsContent value="image">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-5 block">
                      {t("uploadImage")}
                    </label>
                    <label
                      htmlFor="bg_image"
                      className="flex items-center justify-center w-full h-10 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 cursor-pointer"
                    >
                      <span className="text-sm text-gray-600">
                        {t("chooseImage")}
                      </span>
                    </label>
                    <input
                      ref={fileInputRef}
                      id="bg_image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const base64String = reader.result as string;
                            handleOnChange(
                              "general_styles_bg_image",
                              base64String,
                              true
                            );
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                  {link?.general_styles_bg_image && (
                    <div className="space-y-2">
                      <div className="relative w-full h-32 border border-gray-300 rounded overflow-hidden">
                        <img
                          src={link.general_styles_bg_image}
                          alt="Background"
                          className={`w-full h-full object-cover ${
                            link.general_styles_bg_image_blur ? "blur-sm" : ""
                          }`}
                        />
                      </div>
                      <button
                        onClick={() => {
                          handleOnChange("general_styles_bg_image", "", true);
                          // Clear the file input
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        className="text-sm text-red-600 hover:text-red-700 cursor-pointer"
                      >
                        {t("removeImage")}
                      </button>
                    </div>
                  )}
                  {link?.general_styles_bg_image && (
                    <DashboardSwitch
                      label={t("enableBlur")}
                      checked={link.general_styles_bg_image_blur || false}
                      onCheckedChange={(checked) =>
                        handleOnChange(
                          "general_styles_bg_image_blur",
                          checked,
                          true
                        )
                      }
                    />
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
}
