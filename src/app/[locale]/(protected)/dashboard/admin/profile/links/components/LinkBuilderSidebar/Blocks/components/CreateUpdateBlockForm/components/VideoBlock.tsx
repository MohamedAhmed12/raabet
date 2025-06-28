import { Block } from "@prisma/client";
import { AudioBlock } from "./AudioBlock";
import { z } from "zod";

export const VideoBlock = ({
  block,
  errors,
  onUpdateBlockProperty,
}: {
  block: Block;
  errors: z.ZodIssue[];
  onUpdateBlockProperty: (key: keyof Block, val: string) => void;
}) => {
  return <AudioBlock block={block} errors={errors} onUpdateBlockProperty={onUpdateBlockProperty} />;
};
