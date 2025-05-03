import {DashboardCard} from "@/app/(protected)/dashboard/admin/components/DashboardCard";
import {Input} from "@/components/ui/input";
import {Block} from "@prisma/client";
import {CardDesignToggleGroup} from "../../../../../../CardDesignToggleGroup";
import {buttonBlockLayouts} from "../../constants";
import {BtnBlockStyling} from "./BtnBlockStyling";
import {ButtonTypeDropdown} from "./ButtonTypeDropdown";
import {TextBlockStyling} from "./TextBlockStyling";
import {cn} from "@/lib/utils";

export const BtnBlock = ({
  block,
  onUpdateBlockProperty,
}: {
  block: Block;
  onUpdateBlockProperty: (key: keyof Block, val: string) => void;
}) => {
  return (
    <div className="flex flex-col p-[22px] gap-3 pb-8">
      <ButtonTypeDropdown block={block} onChange={onUpdateBlockProperty} />

      {/* layout  */}
      <CardDesignToggleGroup
        initialVal={block?.layout || "1"}
        title="layout"
        titleBg="#fafafa"
        toggleItems={buttonBlockLayouts}
        onValueChange={(value: string) =>
          onUpdateBlockProperty("layout", value)
        }
      />

      {["2", "3"].includes(block.layout.toString()) && (
        <DashboardCard title="image" className={cn(block.bg_image && "gap-0")}>
          {block.bg_image && (
            <label htmlFor="sad" className="file-upload-label text-sm mb-3 flex">
              Uploaded file: {block.bg_image}
            </label>
          )}

          <Input
            id="sad"
            type="file"
            className="mb-[14px]"
            aria-label="s"
            placeholder="dsdsds"
            prefix="dfadsf"
            onChange={(e) => onUpdateBlockProperty("bg_image", "aaaaaaaaaaa")}
          />
        </DashboardCard>
      )}

      <TextBlockStyling block={block} onChange={onUpdateBlockProperty} />
      <BtnBlockStyling block={block} onChange={onUpdateBlockProperty} />
    </div>
  );
};
