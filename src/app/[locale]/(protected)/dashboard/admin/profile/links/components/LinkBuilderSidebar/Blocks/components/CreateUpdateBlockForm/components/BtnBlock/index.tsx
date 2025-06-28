import { DashboardCard } from "@/app/[locale]/(protected)/dashboard/admin/components/DashboardCard";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Block } from "@prisma/client";
import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { z } from "zod";
import { CardDesignToggleGroup } from "../../../../../../CardDesignToggleGroup";
import { GCSFileLoader } from "../../../../../GCSFileLoader";
import { buttonBlockLayouts } from "../../constants";
import { BtnBlockStyling } from "./BtnBlockStyling";
import { ButtonTypeDropdown } from "./ButtonTypeDropdown";
import { TextBlockStyling } from "./TextBlockStyling";

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
  const bgImageError = errors?.find((error) =>
    error.path?.includes("bg_image")
  );

  const handleBgImageUploader = async (
    e: React.ChangeEvent<HTMLInputElement>,
    linkId: string
  ) => {
    console.log("linkId", linkId);
    const file = e.currentTarget.files?.[0];
    console.log("file", file);

    if (file) {
      try {
        const bgImageURL = await GCSFileLoader(linkId, file);
        onUpdateBlockProperty("bg_image", bgImageURL);
      } catch (error) {
        console.error(`Upload block ${block.id} bgImage failed:`, error);
      }
    }
  };

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
              {block?.bg_image?.split("/").pop()}
            </label>
          )}
          <Input
            id="sad"
            type="file"
            dir="ltr"
            className="h-14 mb-[14px] py-3 cursor-pointer relative z-10" // Added cursor-pointer and z-index
            icon={
              block.bg_image ? (
                <Image
                  src={block.bg_image}
                  width={60}
                  height={60}
                  alt="preview"
                />
              ) : (
                <Upload className="size-5" />
              )
            }
            onChange={(e) => handleBgImageUploader(e, block.id)}
          />
          {bgImageError && (
            <p className="text-red-500 text-sm mt-2">
              {t("LinksPage.generalStyles.blocks.errors.bgImageRequired")}
            </p>
          )}
        </DashboardCard>
      )}
      <TextBlockStyling
        block={block}
        errors={errors}
        onChange={onUpdateBlockProperty}
      />
      <BtnBlockStyling block={block} onChange={onUpdateBlockProperty} />
    </div>
  );
};
