import {DashboardCard} from "@/app/(protected)/dashboard/admin/components/DashboardCard";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Block} from "@prisma/client";

export const TextBlockStyling = ({
  block,
  onChange,
}: {
  block: Block;
  onChange: (key: keyof Block, val: string) => void;
}) => (
  <DashboardCard title="text" className="gap-0">
    <Label htmlFor="title" className="mb-2 pl-1">
      Title
    </Label>
    <Textarea
      id="description"
      placeholder="description"
      value={block.title}
      className="mb-[14px]"
      onChange={(e) => onChange("title", e.currentTarget.value)}
    />

    <Label htmlFor="description" className="mb-2 pl-1">
      Description
    </Label>
    <Textarea
      id="description"
      placeholder="description"
      value={block.description}
      className="mb-[14px]"
      onChange={(e) => onChange("description", e.currentTarget.value)}
    />
  </DashboardCard>
);
