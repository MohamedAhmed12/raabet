"use client";

import { Link, useLinkStore } from "@/app/[locale]/store/use-link-store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Chrome, ColorResult } from "@uiw/react-color";
import { memo, useEffect, useRef, useState } from "react";
import { useUpdateLink } from "../hooks/useUpdateLink";
import { LinksPageFieldLabel } from "./LinksPageFieldLabel";

interface DashboardChromPickerProps {
  label?: string;
  currentColorLabel?: keyof Link;
  currentColor?: string;
  onChangeComplete?: (color: string) => void;
}

const MemoizedChrome = memo(Chrome);

const DashboardChromPickerContent = ({
  currentColor,
  currentColorLabel,
  label,
  onChangeComplete,
}: DashboardChromPickerProps) => {
  const { handleLinkPropertyValChange } = useUpdateLink();
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const link = useLinkStore((state) => state.link);
  const initialColor = currentColorLabel
    ? (link[currentColorLabel] as string)
    : currentColor;

  const [localColor, setLocalColor] = useState<string>(
    initialColor || "#000000"
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const debouncedHandleLinkPropertyValChange = (
    key: string,
    value: string | boolean | number,
    persistToDb: boolean = false
  ) => {
    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new timeout with 500ms delay
    debounceTimeoutRef.current = setTimeout(() => {
      if (handleLinkPropertyValChange) {
        handleLinkPropertyValChange(key, value, persistToDb);
      }
    }, 0);
  };

  // Update change to only local store
  const handleColorChange = (color: ColorResult) => {
    setLocalColor(color.hexa);
    onChangeCompleteFallback(false);
  };

  const onChangeCompleteFallback = (persistToDb: boolean = false) => {
    if (!localColor || !currentColorLabel) return;
    debouncedHandleLinkPropertyValChange(
      currentColorLabel,
      localColor,
      persistToDb
    );
  };

  // Call onChangeComplete when user stops dragging which apply the changes to the database
  const handleMouseUp = () => {
    if (onChangeComplete) {
      onChangeComplete(localColor);
    } else {
      onChangeCompleteFallback(true);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="dashboard-general-style-controller cursor-pointer">
          <span className="flex gap-2 justify-center items-center">
            <LinksPageFieldLabel>{label}</LinksPageFieldLabel>
          </span>
          <div
            className="rounded-full w-6 h-6 border border-gray-300"
            style={{
              backgroundColor: localColor,
            }}
          ></div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" hasPadding={false}>
        <style jsx>{`
          :global(.react-colorful__pointer) {
            display: none !important;
          }
        `}</style>
        <div onMouseUp={handleMouseUp}>
          <MemoizedChrome color={localColor} onChange={handleColorChange} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const DashboardChromPicker = memo(
  DashboardChromPickerContent,
  (prevProps, nextProps) => {
    return (
      prevProps.currentColor === nextProps.currentColor &&
      prevProps.currentColorLabel === nextProps.currentColorLabel &&
      prevProps.label === nextProps.label &&
      prevProps.onChangeComplete === nextProps.onChangeComplete
    );
  }
);
