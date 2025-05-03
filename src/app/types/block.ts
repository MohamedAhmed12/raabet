import {Link} from "@prisma/client";
import {BlockType} from "../(protected)/dashboard/admin/profile/links/types/block";

export enum BlockTextAlign {
  Left = "left",
  Right = "right",
  Center = "center",
}

export enum BlockAnimation {
  None = "none",
  Shake = "shake",
  Tada = "tada",
  Pulse = "pulse",
  Jump = "jump",
  Swing = "swing",
  Jello = "jello",
  RubberBand = "rubber band",
}

export interface Block {
  id?: string;
  style: number;
  type: BlockType;
  title: string;
  order: number;
  description: string;
  text: string;
  text_align: BlockTextAlign;
  text_color: string;
  animation: BlockAnimation;
  bg_image?: string;
  custom_text_color?: string;
  url: string;
  corner: number;
  layout: string;
  linkId?: string;
}
