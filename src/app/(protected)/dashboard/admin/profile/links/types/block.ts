import { AudioBlock } from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/AudioBlock";
import { EmailBtnBlock } from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/EmailBtnBlock";
import { FileBtnBlock } from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/FileBtnBlock";
import { GroupBlock } from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/GroupBlock";
import { ImageBtnBlock } from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/ImageBtnBlock";
import { SeparatorBlock } from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/SeparatorBlock";
import { TextBlock } from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/TextBlock";
import { URLBtnBlock } from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/URLBtnBlock";
import { VideoBlock } from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/VideoBlock";

export const blocks = {
  text: TextBlock,
  urlBtn: URLBtnBlock,
  emailBtn: EmailBtnBlock,
  fileBtn: FileBtnBlock,
  imageBtn: ImageBtnBlock,
  separator: SeparatorBlock,
  audio: AudioBlock,
  video: VideoBlock,
  group: GroupBlock,
};

export type BlockType = keyof typeof blocks;
