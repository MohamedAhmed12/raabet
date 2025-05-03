import {AudioBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateUpdateBlockForm/components/AudioBlock";
import {BtnBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateUpdateBlockForm/components/BtnBlock/page";
import {SeparatorBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateUpdateBlockForm/components/SeparatorBlock";
import {TextBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateUpdateBlockForm/components/TextBlock/page";
import {VideoBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateUpdateBlockForm/components/VideoBlock";

export const blocks = {
  text: TextBlock,
  url: BtnBlock,
  email: BtnBlock,
  file: BtnBlock,
  image: BtnBlock,
  separator: SeparatorBlock,
  audio: AudioBlock,
  video: VideoBlock,
};

export type BlockType = keyof typeof blocks;

export const blockTitle = {
  text: "TextBlock",
  url: "new button",
  email: "new button",
  file: "new button",
  image: "new button",
  separator: "SeparatorBlock",
  audio: "AudioBlock",
  video: "VideoBlock",
};
