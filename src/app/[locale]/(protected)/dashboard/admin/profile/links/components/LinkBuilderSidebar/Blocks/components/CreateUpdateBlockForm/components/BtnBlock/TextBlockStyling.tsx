import {DashboardCard} from "@/app/[locale]/(protected)/dashboard/admin/components/DashboardCard";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Block} from "@/generated/prisma";
import {useTranslations} from "next-intl";

export const TextBlockStyling = ({
  block,
  onChange,
}: {
  block: Block;
  onChange: (key: keyof Block, val: string) => void;
}) => {
  const t = useTranslations("Shared");

  return (
    <DashboardCard title={t("text")} className="gap-0">
      <Label htmlFor="title" className="mb-2 pl-1 capitalize">
        {t("title")}
      </Label>
      <Textarea
        id="description"
        placeholder={t("title")}
        value={block.title}
        className="mb-[14px]"
        onChange={(e) => onChange("title", e.currentTarget.value)}
      />

      <Label htmlFor="description" className="mb-2 pl-1 capitalize">
        {t('description')}
      </Label>
      <Textarea
        id="description"
        placeholder={t("description")}
        value={block.description}
        className="mb-[14px]"
        onChange={(e) => onChange("description", e.currentTarget.value)}
      />
    </DashboardCard>
  );
};
