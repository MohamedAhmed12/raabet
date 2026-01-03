"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Chrome } from "@uiw/react-color";
import { memo, useCallback, useRef, useState } from "react";
import { useGetLink, useUpdateLinkField } from "../hooks/useUpdateLink";
import { LinksPageFieldLabel } from "./LinksPageFieldLabel";

interface DashboardChromPickerProps {
  label?: string;
  currentColorLabel?: string;
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
  const getLink = useGetLink();
  const updateLinkField = useUpdateLinkField();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const link = getLink();

  const initialColor =
    currentColorLabel && link
      ? ((link as Record<string, any>)[currentColorLabel] as string)
      : currentColor;

  const [localColor, setLocalColor] = useState<string>(
    initialColor || "#000000"
  );

  const [isOpen, setIsOpen] = useState(false);

  // Persist color to database
  const persistColorToDb = useCallback(
    (hexa: string) => {
      if (currentColorLabel) {
        updateLinkField(currentColorLabel, hexa, true);
      }
      if (onChangeComplete) {
        onChangeComplete(hexa);
      }
    },
    [currentColorLabel, updateLinkField, onChangeComplete]
  );

  // Update color while dragging - immediate preview with debounced DB persistence
  const handleColorChange = useCallback(
    (color: any) => {
      const hexa = color.hexa || color;

      // Update local state immediately for instant visual feedback (no lag)
      setLocalColor(hexa);

      // Update store immediately for preview (persistToDb: false)
      if (currentColorLabel) {
        updateLinkField(currentColorLabel, hexa, false);
      }

      // Clear existing debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new debounce timer - persist after 500ms of inactivity
      debounceTimerRef.current = setTimeout(() => {
        persistColorToDb(hexa);
      }, 500);
    },
    [currentColorLabel, updateLinkField, persistColorToDb]
  );

  // Persist to database when popover closes
  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);

      // When closing, clear debounce timer and persist immediately
      if (!open) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
          debounceTimerRef.current = null;
        }
        persistColorToDb(localColor);
      }
    },
    [persistColorToDb, localColor]
  );

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
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
        <MemoizedChrome color={localColor} onChange={handleColorChange} />
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
