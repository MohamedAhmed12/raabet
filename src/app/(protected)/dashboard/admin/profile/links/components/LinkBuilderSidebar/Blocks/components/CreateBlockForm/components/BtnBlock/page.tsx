import {DashboardCard} from "@/app/(protected)/dashboard/admin/components/DashboardCard";
import {Block} from "@/app/types/block";
import {Input} from "@/components/ui/input";
import {CardDesignToggleGroup} from "../../../../../../CardDesignToggleGroup";
import {buttonBlockLayouts} from "../../constants";
import {BtnBlockStyling} from "./BtnBlockStyling";
import {ButtonTypeDropdown} from "./ButtonTypeDropdown";
import {TextBlockStyling} from "./TextBlockStyling";

export const BtnBlock = ({
  block,
  onUpdateBlockProperty,
}: {
  block: Block;
  onUpdateBlockProperty: (key: keyof Block, val: string) => void;
}) => {
  return (
    <div className="flex flex-col p-[22px] gap-3">
      <ButtonTypeDropdown block={block} onChange={onUpdateBlockProperty} />

      {/* layout  */}
      <CardDesignToggleGroup
        initialVal={block?.layout}
        title="layout"
        titleBg="#fafafa"
        toggleItems={buttonBlockLayouts}
        onValueChange={(value: string) =>
          onUpdateBlockProperty("layout", value)
        }
      />

      {["2", "3"].includes(block.layout.toString()) && (
        <DashboardCard title="image">
          <Input
            id="sad"
            type="file"
            className="mb-[14px]"
            onChange={(e) => onUpdateBlockProperty("bg_image", "aaaaaaaaaaa")}
          />
        </DashboardCard>
      )}

      <TextBlockStyling block={block} onChange={onUpdateBlockProperty} />

      <BtnBlockStyling block={block} onChange={onUpdateBlockProperty} />
    </div>
  );
};
