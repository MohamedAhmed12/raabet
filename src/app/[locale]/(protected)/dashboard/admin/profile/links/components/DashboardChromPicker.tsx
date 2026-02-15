"use client";

import {
  parseStoredColor,
  rgbaToCss,
  toStoredRgbaJson,
  type Rgba
} from "@/lib/linkColorUtils";
import {
  memo,
  useCallback,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ChromePicker, type ColorResult } from "react-color";
import { useGetLink, useUpdateLinkField } from "../hooks/useUpdateLink";
import { LinksPageFieldLabel } from "./LinksPageFieldLabel";

export interface DashboardChromPickerProps {
  label?: string;
  currentColorLabel?: string;
  currentColor?: string;
  onChangeComplete?: (color: string) => void;
}

const popoverStyle: CSSProperties = {
  position: "absolute",
  zIndex: 2,
};

const coverStyle: CSSProperties = {
  position: "fixed",
  top: "0px",
  right: "0px",
  bottom: "0px",
  left: "0px",
};

function colorResultToRgba(color: ColorResult): Rgba {
  const { r, g, b, a = 1 } = color.rgb;
  return { r, g, b, a };
}

function DashboardChromPickerComponent({
  currentColor,
  currentColorLabel,
  label,
  onChangeComplete,
}: DashboardChromPickerProps) {
  const getLink = useGetLink();
  const updateLinkField = useUpdateLinkField();

  const link = getLink();
  const rawInitial =
    (currentColorLabel && link
      ? (link as unknown as Record<string, string>)[currentColorLabel]
      : currentColor) ?? "";

  const initialRgba = parseStoredColor(rawInitial);
  const latestColorRef = useRef<Rgba>(initialRgba);
  const lastCacheUpdateRef = useRef<number>(0);
  const THROTTLE_MS = 80;

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [localColor, setLocalColor] = useState<Rgba>(initialRgba);

  const persistColorToDb = useCallback(
    (storedValue: string) => {
      if (currentColorLabel) {
        updateLinkField(currentColorLabel, storedValue, true);
      }
      if (onChangeComplete) {
        onChangeComplete(storedValue);
      }
    },
    [currentColorLabel, updateLinkField, onChangeComplete]
  );

  const handleClick = useCallback(() => {
    setDisplayColorPicker((prev) => {
      if (!prev) latestColorRef.current = localColor;
      return !prev;
    });
  }, [localColor]);

  const handleClose = useCallback(() => {
    setDisplayColorPicker(false);
    persistColorToDb(toStoredRgbaJson(latestColorRef.current));
  }, [persistColorToDb]);

  const handleColorChange = useCallback(
    (color: ColorResult) => {
      const rgba = colorResultToRgba(color);
      latestColorRef.current = rgba;
      setLocalColor(rgba);

      if (!currentColorLabel) return;
      const now = Date.now();
      if (now - lastCacheUpdateRef.current >= THROTTLE_MS) {
        lastCacheUpdateRef.current = now;
        updateLinkField(currentColorLabel, toStoredRgbaJson(rgba), false);
      }
    },
    [currentColorLabel, updateLinkField]
  );

  const handleColorChangeComplete = useCallback(
    (color: ColorResult) => {
      const rgba = colorResultToRgba(color);
      latestColorRef.current = rgba;
      if (currentColorLabel) {
        updateLinkField(currentColorLabel, toStoredRgbaJson(rgba), false);
      }
    },
    [currentColorLabel, updateLinkField]
  );

  return (
    <div className="relative">
      <div
        role="button"
        tabIndex={0}
        className="dashboard-general-style-controller cursor-pointer flex gap-2 justify-center items-center"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <LinksPageFieldLabel>{label}</LinksPageFieldLabel>
        <div
          className="rounded-full w-6 h-6 border border-gray-300 shrink-0"
          style={{ backgroundColor: rgbaToCss(localColor) }}
        />
      </div>
      {displayColorPicker ? (
        <div style={popoverStyle}>
          <div
            style={coverStyle}
            onClick={handleClose}
            onKeyDown={(e) => {
              if (e.key === "Escape") handleClose();
            }}
            role="button"
            tabIndex={0}
            aria-label="Close color picker"
          />
          <ChromePicker
            color={localColor}
            onChange={handleColorChange}
            onChangeComplete={handleColorChangeComplete}
          />
        </div>
      ) : null}
    </div>
  );
}

export const DashboardChromPicker = memo(DashboardChromPickerComponent);
