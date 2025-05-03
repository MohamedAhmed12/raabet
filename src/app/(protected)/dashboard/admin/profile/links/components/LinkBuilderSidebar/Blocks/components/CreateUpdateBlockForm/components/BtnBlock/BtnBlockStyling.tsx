"use client";

import * as React from "react";

import {DashboardCard} from "@/app/(protected)/dashboard/admin/components/DashboardCard";
import {BlockAnimation, BlockTextAlign} from "@/app/types/block";
import {iconNameType} from "@/assets/icons";
import CustomDropdown from "@/components/CustomDropdown";
import {Icon} from "@/components/Icon";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {cn} from "@/lib/utils";
import {Block} from "@prisma/client";
import {DashboardChromPicker} from "../../../../../../DashboardChromPicker";

const textAlign: {value: BlockTextAlign; icon: iconNameType}[] = [
  {
    value: BlockTextAlign.Left,
    icon: "alignLeft",
  },
  {
    value: BlockTextAlign.Center,
    icon: "alignCenter",
  },
  {
    value: BlockTextAlign.Right,
    icon: "alignRight",
  },
];

export const BtnBlockStyling = ({
  block,
  onChange,
}: {
  block: Block;
  onChange: (key: keyof Block, val: string) => void;
}) => {
  const [selectedTextAlign, setSelectedTextAlign] = React.useState<string>(
    block?.text_align || textAlign[0].value
  );

  const handleOnChange = (value: string) => {
    setSelectedTextAlign(value);
    onChange("text_align", value);
  };

  return (
    <DashboardCard title="styling" className="gap-0">
      <ToggleGroup
        type="single"
        value={selectedTextAlign}
        onValueChange={handleOnChange}
        className="flex w-full h-10 border-1"
      >
        {textAlign.map((item, i) => (
          <ToggleGroupItem
            key={`card-${item.value}`}
            value={item.value}
            className={cn("cursor-pointer", i != 4 && "border-r-1")}
            size="lg"
          >
            <Icon name={item.icon} size={20} className="w-6 h-5 test" />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <CustomDropdown
        onSelect={(index) =>
          onChange(
            "animation",
            BlockAnimation[
              Object.keys(BlockAnimation)[index] as keyof typeof BlockAnimation
            ]
          )
        }
        className="my-3 w-full"
        items={Object.keys(BlockAnimation)}
      />

      <DashboardChromPicker
        label="custom block text color"
        currentColor={block?.custom_text_color || undefined}
        onColorChange={({hex}: {hex: string}) =>
          onChange("custom_text_color", hex)
        }
      />
    </DashboardCard>
  );
};
