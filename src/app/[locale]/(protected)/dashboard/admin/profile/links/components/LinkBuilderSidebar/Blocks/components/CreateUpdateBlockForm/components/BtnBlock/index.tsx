import { DashboardCard } from "@/app/[locale]/(protected)/dashboard/admin/components/DashboardCard";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Block } from "@prisma/client";
import { useTranslations } from "next-intl";
import { CardDesignToggleGroup } from "../../../../../../CardDesignToggleGroup";
import { buttonBlockLayouts } from "../../constants";
import { BtnBlockStyling } from "./BtnBlockStyling";
import { ButtonTypeDropdown } from "./ButtonTypeDropdown";
import { TextBlockStyling } from "./TextBlockStyling";
import Image from "next/image";
import { z } from "zod";

export const BtnBlock = ({
  block,
  errors,
  onUpdateBlockProperty,
}: {
  block: Block;
  errors: z.ZodIssue[];
  onUpdateBlockProperty: (key: keyof Block, val: string) => void;
}) => {
  const t = useTranslations();

  const urlError = errors?.find((error) => error.path?.includes("url"));

  console.log("dsadsad", block, errors);
  return (
    <div className="flex flex-col p-[22px] gap-3 pb-8">
      <ButtonTypeDropdown
        block={block}
        urlError={urlError?.message}
        onChange={onUpdateBlockProperty}
      />
      ddddd
      {/* layout  */}
      <CardDesignToggleGroup
        initialVal={block?.layout || "1"}
        title={t("LinksPage.generalStyles.blockForm.layout")}
        titleBg="#fafafa"
        toggleItems={buttonBlockLayouts}
        onValueChange={(value: string) =>
          onUpdateBlockProperty("layout", value)
        }
      />
      {["2", "3"].includes(block.layout.toString()) && (
        <DashboardCard
          title={t("Shared.image")}
          className={cn(block.bg_image && "gap-0")}
        >
          {block.bg_image && (
            <label
              htmlFor="sad"
              className="file-upload-label text-sm mb-3  flex"
            >
              {t("LinksPage.generalStyles.blockForm.uploadedFile")}{" "}
              {block.bg_image}
            </label>
          )}
          <Input
            id="sad"
            type="file"
            className="h-14 mb-[14px] py-3"
            icon={
              <Image src={block.url} width={60} height={60} alt="preview" />
            }
            onChange={() => onUpdateBlockProperty("bg_image", "aaaaaaaaaaa")}
          />
        </DashboardCard>
      )}
      <TextBlockStyling block={block} errors={errors} onChange={onUpdateBlockProperty} />
      <BtnBlockStyling block={block} onChange={onUpdateBlockProperty} />
    </div>
  );
};
