import { Input } from "@/components/ui/input";
import {Block} from "@prisma/client";

export const SeparatorBlock = ({
  block,
  onUpdateBlockProperty,
}: {
  block: Block;
  onUpdateBlockProperty: (key: keyof Block, val: string) => void;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateBlockProperty("title", e.target.value);
  };

  return (
    <div className="py-4">
      <span className="separator">Separator</span>
      <Input 
        type="text" 
        placeholder="Separator text" 
        value={block.title}
        onChange={handleInputChange}
        className="text-gray-500 text-sm font-medium"
      />
    </div>
  );
};
