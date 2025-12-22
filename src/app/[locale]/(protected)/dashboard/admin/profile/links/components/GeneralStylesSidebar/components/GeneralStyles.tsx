import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { memo, useCallback, useState } from "react";
import {
  Link,
  useLinkStore,
} from "../../../../../../../../store/use-link-store";
import { useUpdateLink } from "../../../hooks/useUpdateLink";
import { DashboardChromPicker } from "../../DashboardChromPicker";
import { DashboardSwitch } from "../../DashboardSwitch";
import { PrimaryBackgroundTypePicker } from "./PrimaryBackgroundTypePicker";

interface GeneralStylesProps {
  t: ReturnType<typeof useTranslations>;
  linkRaw: Link;
  handleLinkPropertyValChange: (
    key: keyof Link,
    value: string | boolean | number,
    shouldPersistToDatabase?: boolean
  ) => void;
}

// Memoized version of DashboardSwitch
const MemoizedDashboardSwitch = memo(
  ({
    label,
    checked,
    onCheckedChange,
  }: {
    label: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
  }) => {
    return (
      <DashboardSwitch
        label={label}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    );
  },
  // Deep comparison of props
  (prevProps, nextProps) => {
    return (
      prevProps.label === nextProps.label &&
      prevProps.checked === nextProps.checked &&
      prevProps.onCheckedChange === nextProps.onCheckedChange
    );
  }
);
MemoizedDashboardSwitch.displayName = "MemoizedDashboardSwitch";

// Memoized version of Tabs
const MemoizedTabs = memo(
  ({
    onValueChange,
    defaultValue,
    className,
  }: {
    onValueChange: (val: string) => void;
    defaultValue: string;
    className: string;
  }) => {
    return (
      <Tabs
        onValueChange={onValueChange}
        defaultValue={defaultValue}
        className={className}
      >
        <TabsList className="flex gap-2 w-full">
          <TabsTrigger value="1" className="cursor-pointer capitalize">
            soft shadow
          </TabsTrigger>
          <TabsTrigger value="0" className="cursor-pointer capitalize">
            solid shadow
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
  },
  // Deep comparison of props
  (prevProps, nextProps) => {
    return (
      prevProps.onValueChange === nextProps.onValueChange &&
      prevProps.defaultValue === nextProps.defaultValue &&
      prevProps.className === nextProps.className
    );
  }
);
MemoizedTabs.displayName = "MemoizedTabs";

// Memoized version of GeneralStyles
const MemoizedGeneralStyles = memo(
  ({ t, linkRaw, handleLinkPropertyValChange }: GeneralStylesProps) => {
    // Memoize handlers only once when component mounts
    const [showSecondaryBgColor, setShowSecondaryBgColor] = useState(false);
    const handleOnChange = useCallback(
      (
        key: keyof Link,
        value: string | boolean | number,
        shouldPersistToDatabase?: boolean
      ) => {
        handleLinkPropertyValChange(key, value, shouldPersistToDatabase);
      },
      [handleLinkPropertyValChange]
    );

    return (
      <div className="section">
        <div className="section-title text-[.82rem] font-bold mb-[22px]">
          {t("title")}
        </div>
        <DashboardChromPicker
          label={t("primaryTextColor")}
          currentColorLabel="general_styles_primary_text_color"
        />
        <PrimaryBackgroundTypePicker />
        <MemoizedDashboardSwitch
          label={t("secondaryBgColor")}
          checked={!!linkRaw?.general_styles_is_secondary_bgcolor}
          onCheckedChange={(checked) => {
            setShowSecondaryBgColor(checked);
            handleOnChange("general_styles_is_secondary_bgcolor", checked);
          }}
        />

        {showSecondaryBgColor && (
          <DashboardChromPicker
            label={t("secondaryPrimaryBgColor")}
            currentColorLabel="general_styles_secondary_bgcolor"
          />
        )}
        <DashboardChromPicker
          label={t("desktopBgColor")}
          currentColorLabel="general_styles_desktop_bgcolor"
        />
        <MemoizedTabs
          onValueChange={(val: string) =>
            handleLinkPropertyValChange(
              "general_styles_soft_shadow",
              val === "1"
            )
          }
          defaultValue={linkRaw.general_styles_soft_shadow ? "1" : "0"}
          className="w-full"
        />
      </div>
    );
  }
);
MemoizedGeneralStyles.displayName = "MemoizedGeneralStyles";

export default function GeneralStyles() {
  const t = useTranslations("LinksPage");
  const { handleLinkPropertyValChange } = useUpdateLink();
  const linkRaw = useLinkStore((state) => state.linkRaw);

  return (
    linkRaw && (
      <MemoizedGeneralStyles
        t={t}
        linkRaw={linkRaw}
        handleLinkPropertyValChange={handleLinkPropertyValChange}
      />
    )
  );
}
