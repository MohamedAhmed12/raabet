export enum TextAlignType {
  Left = "left",
  Right = "right",
  Center = "center",
}

export interface Block {
  id: string;
  style: number;
  type: BlockType;
  title: string;
  description: string;
  text: string;
  text_align: TextAlignType;
  text_color: string;
  corner: number;
  layout: number;
  linkId: string;
  link?: Link;
}
