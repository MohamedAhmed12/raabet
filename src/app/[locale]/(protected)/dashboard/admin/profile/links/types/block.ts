import { z } from "zod";
import { AudioBlock } from "../components/LinkBuilderSidebar/Blocks/components/CreateUpdateBlockForm/components/AudioBlock";
import { BtnBlock } from "../components/LinkBuilderSidebar/Blocks/components/CreateUpdateBlockForm/components/BtnBlock";
import { SeparatorBlock } from "../components/LinkBuilderSidebar/Blocks/components/CreateUpdateBlockForm/components/SeparatorBlock";
import { TextBlock } from "../components/LinkBuilderSidebar/Blocks/components/CreateUpdateBlockForm/components/TextBlock";
import { VideoBlock } from "../components/LinkBuilderSidebar/Blocks/components/CreateUpdateBlockForm/components/VideoBlock";
import { BlockType } from "@prisma/client";

// Base schema that all blocks will extend
const BaseBlockSchema = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Block type to schema mapping
// Common schema for blocks that use URL, title, and description
const UrlBasedBlockSchema = BaseBlockSchema.extend({
  url: z.string().url("validUrlRequired"),
  title: z.string().optional(),
  description: z.string().optional(),
  bg_image: z.string().optional(),
  layout: z.string().optional(), // Make sure layout is in the schema
})
  .refine(
    (data) => {
      // If layout is "2" or "3", bg_image is required
      if (data.layout === "2" || data.layout === "3") {
        return !!data.bg_image?.trim();
      }
      return true;
    },
    {
      message: "bgImageRequired",
      path: ["bg_image"],
    }
  )
  .refine((data) => data.title?.trim() || data.description?.trim(), {
    message: "titleOrDescriptionRequired",
    path: ["title", "description"],
  });

const blockSchemas = {
  text: BaseBlockSchema.extend({
    title: z.string().min(1),
  }),

  url: UrlBasedBlockSchema,
  email: UrlBasedBlockSchema,
  file: UrlBasedBlockSchema,
  image: UrlBasedBlockSchema,

  separator: BaseBlockSchema.extend({
    title: z.string(),
  }),

  audio: BaseBlockSchema.extend({
    url: z.string().url("validUrlRequired"),
  }),

  video: BaseBlockSchema.extend({
    url: z.string().url("validUrlRequired"),
  }),
} as const;

// Type representing all possible block types
type BlockSchema = (typeof blockSchemas)[BlockType];

// Validation function
function validateBlock<T extends BlockType>(
  block: unknown,
  type: T
): z.SafeParseReturnType<unknown, z.infer<(typeof blockSchemas)[T]>> {
  return blockSchemas[type].safeParse(block) as z.SafeParseReturnType<
    unknown,
    z.infer<(typeof blockSchemas)[T]>
  >;
}

// Export block components
export const blocks = {
  text: TextBlock,
  url: BtnBlock,
  email: BtnBlock,
  file: BtnBlock,
  image: BtnBlock,
  separator: SeparatorBlock,
  audio: AudioBlock,
  video: VideoBlock,
} as const;

// Export types
export type { BlockType };

// Export validation utilities
export { validateBlock, blockSchemas };
