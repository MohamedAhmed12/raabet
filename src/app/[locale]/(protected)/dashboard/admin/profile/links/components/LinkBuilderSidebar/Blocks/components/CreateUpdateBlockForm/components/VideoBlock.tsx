import { Block } from "@prisma/client";
import { AudioBlock } from "./AudioBlock";

export const VideoBlock = ({
  block,
  onUpdateBlockProperty,
}: {
  block: Block;
  onUpdateBlockProperty: (key: keyof Block, val: string) => void;
}) => {
  return <AudioBlock block={block} onUpdateBlockProperty={onUpdateBlockProperty} />;
};
