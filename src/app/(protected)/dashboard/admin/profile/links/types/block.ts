import {AudioBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/AudioBlock";
import {BtnBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/BtnBlock/page";
import {GroupBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/GroupBlock";
import {SeparatorBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/SeparatorBlock";
import {TextBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/TextBlock";
import {VideoBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/VideoBlock";

export const blocks = {
  text: TextBlock,
  urlBtn: BtnBlock,
  emailBtn: BtnBlock,
  fileBtn: BtnBlock,
  imageBtn: BtnBlock,
  separator: SeparatorBlock,
  audio: AudioBlock,
  video: VideoBlock,
  group: GroupBlock,
};

export type BlockType = keyof typeof blocks;

export const blockTitle = {
  text: "TextBlock",
  urlBtn: "new button",
  emailBtn: "new button",
  fileBtn: "new button",
  imageBtn: "new button",
  separator: "SeparatorBlock",
  audio: "AudioBlock",
  video: "VideoBlock",
  group: "GroupBlock",
};
