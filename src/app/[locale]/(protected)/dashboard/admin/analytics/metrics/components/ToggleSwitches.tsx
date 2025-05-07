"use client";

import {Switch} from "@/components/ui/switch"; // Adjust the import path as needed
import {useLocale, useTranslations} from "next-intl";
import * as React from "react";

interface ToggleSwitchesProps {
  onShowDeletedChange: (value: boolean) => void;
  onShowHiddenChange: (value: boolean) => void;
}

export function ToggleSwitches({
  onShowDeletedChange,
  onShowHiddenChange,
}: ToggleSwitchesProps) {
  const locale = useLocale();
  const t = useTranslations("Analytics.Metrics.blockInteractions");
  const [showDeleted, setShowDeleted] = React.useState(false);
  const [showHidden, setShowHidden] = React.useState(false);

  // Event handler for when the "Show Deleted" toggle changes
  const handleShowDeletedChange = (value: boolean) => {
    setShowDeleted(value);
    onShowDeletedChange(value);
  };

  // Event handler for when the "Show Hidden" toggle changes
  const handleShowHiddenChange = (value: boolean) => {
    setShowHidden(value);
    onShowHiddenChange(value);
  };

  return (
    <div className="mb-5">
      <div className="flex w-full justify-between space-x-3">
        {/* integrate next release  */}
        {/* <div className="w-1/2 flex flex-row justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <label htmlFor="show-deleted" className="capitalize">
              show deleted
            </label>
          </div>

          <Switch
            id="show-deleted"
            checked={showDeleted}
            onCheckedChange={handleShowDeletedChange}
            className="cursor-pointer"
          />
        </div> */}

        <div className="w-1/2 flex flex-row justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <label htmlFor="show-hidden" className="capitalize">
              {t("showHidden")}
            </label>
          </div>
          <Switch
            id="show-hidden"
            checked={showHidden}
            thumbClassName={
              locale == "ar"
                ? "data-[state=checked]:translate-x-[calc(-100%+2px)] data-[state=unchecked]:translate-x-0"
                : ""
            }
            onCheckedChange={handleShowHiddenChange}
            className="cursor-pointer bg-red-300"
          />
        </div>
      </div>
    </div>
  );
}
