import { DashboardCard } from "@/app/[locale]/(protected)/dashboard/admin/components/DashboardCard";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Block } from "@prisma/client";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const TextBlockStyling = ({
  block,
  errors,
  onChange,
}: {
  block: Block;
  errors: z.ZodIssue[];
  onChange: (key: keyof Block, val: string) => void;
}) => {
  const t = useTranslations();

  const titleError = errors?.find((error) => error.path?.includes("title"));
  const descriptionError = errors?.find((error) =>
    error.path?.includes("description")
  );

  return (
    <DashboardCard title={t("Shared.text")} className="gap-0">
      <div className="mb-[14px]">
        <Label htmlFor="title" className="mb-2 pl-1 capitalize">
          {t("Shared.title")}
        </Label>
        <Textarea
          id="description"
          placeholder={t("Shared.title")}
          value={block.title}
          onChange={(e) => onChange("title", e.currentTarget.value)}
        />
        {titleError && (
          <p className="text-red-500 text-sm mt-2">
            {t(
              "LinksPage.generalStyles.blocks.errors.titleOrDescriptionRequired"
            )}
          </p>
        )}
      </div>
      <div className="mb-[14px]">
        <Label htmlFor="description" className="mb-2 pl-1 capitalize">
          {t("Shared.description")}
        </Label>
        <Textarea
          id="description"
          placeholder={t("Shared.description")}
          value={block.description}
          onChange={(e) => onChange("description", e.currentTarget.value)}
        />
        {descriptionError && (
          <p className="text-red-500 text-sm mt-2">
            {t(
              "LinksPage.generalStyles.blocks.errors.titleOrDescriptionRequired"
            )}
          </p>
        )}
      </div>
    </DashboardCard>
  );
};
