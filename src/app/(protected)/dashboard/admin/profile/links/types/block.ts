import {AudioBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/AudioBlock";
import { BtnBlock } from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/BtnBlock/page";
import {EmailBtnBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/EmailBtnBlock";
import {FileBtnBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/FileBtnBlock";
import {GroupBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/GroupBlock";
import {ImageBtnBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/ImageBtnBlock";
import {SeparatorBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/SeparatorBlock";
import {TextBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/TextBlock";
import {URLBtnBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/URLBtnBlock";
import {VideoBlock} from "../components/LinkBuilderSidebar/Blocks/components/CreateBlockForm/components/VideoBlock";

export const blocks = {
  text: TextBlock,
  urlBtn: BtnBlock,
  emailBtn: EmailBtnBlock,
  fileBtn: FileBtnBlock,
  imageBtn: ImageBtnBlock,
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
