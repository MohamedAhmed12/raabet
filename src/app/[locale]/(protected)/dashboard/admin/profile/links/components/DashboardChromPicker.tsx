"use client";

import { Link, useLinkStore } from "@/app/[locale]/store/use-link-store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/cn";
import dynamic from "next/dynamic";
import { memo, useCallback, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { LinksPageFieldLabel } from "./LinksPageFieldLabel";

// Dynamically import ChromePicker with ssr: false to disable SSR
const ChromePicker = dynamic(
  () => import("react-color").then((mod) => mod.ChromePicker),
  {
    ssr: false,
  }
);

interface DashboardChromPickerProps {
  label?: string;
  currentColorLabel?: keyof Link;
  currentColor?: string;
  onChangeComplete?: ({ hex }: { hex: string }) => void;
  onColorChange?: ({ hex }: { hex: string }) => void;
}

interface ChromePickerProps {
  color: string;
  onChange: (color: { hex: string }) => void;
  onChangeComplete: (({ hex }: { hex: string }) => void) | undefined;
}

const MemoizedChromePicker = memo(
  ({ color, onChange, onChangeComplete }: ChromePickerProps) => (
    <ChromePicker
      color={color}
      onChange={onChange}
      onChangeComplete={onChangeComplete}
      disableAlpha
    />
  )
);

const DashboardChromPickerContent = ({
  currentColor,
  currentColorLabel,
  label,
  onColorChange,
  onChangeComplete,
}: DashboardChromPickerProps) => {
  // Type assertion to ensure currentColorLabel is a valid key of Link type
  const initialColor = currentColorLabel
    ? useLinkStore(useShallow((state) => state.link[currentColorLabel]))
    : currentColor;

  const [localColor, setLocalColor] = useState<string>(String(initialColor));

  // Memoize the color change handler
  const memoizedOnColorChange = useCallback(
    ({ hex }: { hex: string }) => {
      setLocalColor(hex);
      onColorChange?.({ hex });
    },
    [onColorChange]
  );

  // Memoize ChromePicker props
  const memoizedChromePickerProps = useMemo(
    () => ({
      color: localColor,
      onChange: memoizedOnColorChange,
      onChangeComplete,
      disableAlpha: true,
    }),
    [localColor, memoizedOnColorChange]
  );
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="dashboard-general-style-controller cursor-pointer">
          <span className="flex gap-2 justify-center items-center">
            <LinksPageFieldLabel>{label}</LinksPageFieldLabel>
          </span>
          <div
            className={cn("rounded-full w-5 h-5")}
            style={{
              backgroundColor: localColor,
              border: "1px solid oklch(.85 .006 264.531)",
            }}
          ></div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full" hasPadding={false}>
        <MemoizedChromePicker {...memoizedChromePickerProps} />
      </PopoverContent>
    </Popover>
  );
};

// Memoize the component with a shallow comparison of props
const MemoizedDashboardChromPicker = memo(
  DashboardChromPickerContent,
  (prevProps, nextProps) => {
    return (
      prevProps.label === nextProps.label &&
      prevProps.onColorChange === nextProps.onColorChange &&
      prevProps.onChangeComplete === nextProps.onChangeComplete
    );
  }
);

// Export the memoized version
export const DashboardChromPicker = (props: DashboardChromPickerProps) => {
  return <MemoizedDashboardChromPicker {...props} />;
};
