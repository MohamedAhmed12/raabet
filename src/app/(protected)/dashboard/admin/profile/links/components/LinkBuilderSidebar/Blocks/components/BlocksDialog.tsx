"use client";

import { iconNameType } from "@/assets/icons";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { BlockType } from "../../../../types/block";

const buttons: {
  icon: iconNameType;
  type: BlockType;
  title: string;
  description: string;
}[] = [
  {
    icon: "link",
    type: "urlBtn",
    title: "URL Button",
    description: "Opens a web page to the specified URL.",
  },
  {
    icon: "mail",
    type: "emailBtn",
    title: "Email Button",
    description: "Opens an email to the specified address.",
  },
  {
    icon: "file",
    type: "fileBtn",
    title: "File Button",
    description: "Opens an uploaded file (PDF, image, audio, etc.)",
  },
  {
    icon: "image",
    type: "imageBtn",
    title: "Image Button",
    description: "Opens an uploaded image in a lightbox.",
  },

  {
    icon: "minus",
    type: "separator",
    title: "Divider",
    description: "Organize your content with dividers.",
  },
  {
    icon: "type",
    type: "text",
    title: "text",
    description: "Tell your story with a text block",
  },
  {
    icon: "audio-lines",
    type: "audio",
    title: "Audio",
    description: "Embed Spotify, Apple Music, and more...",
  },
  {
    icon: "monitor-play",
    type: "video",
    title: "Video",
    description: "Embed YouTube, Vimeo, and more...",
  },
  // implement next itteration
  // {
  //   icon: "subscribers",
  //   title: "Subscribers",
  //   description: "Collect email addresses on your profile.",
  // },
  {
    icon: "folder",
    type: "group",
    title: "Group",
    description: "Group blocks for better organization.",
  },
];

export const BlocksDialog = ({
  onCreateNewBlock,
}: {
  onCreateNewBlock: (type: BlockType) => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Button
        variant="outline"
        className="cursor-pointer h-[27px] px-2 capitalize"
        onClick={() => setIsDialogOpen(true)}
      >
        add block +
      </Button>
      <DialogContent className="font-noto-sans !max-w-[600px]">
        <DialogHeader className="flex items-center">
          <DialogTitle className="capitalize mb-3">add block </DialogTitle>
        </DialogHeader>

        {/* body */}
        <div className="dialog-body flex flex-wrap gap-4">
          {buttons.map((btn) => (
            <Button
              key={btn.icon}
              variant="outline"
              className="flex flex-col !w-[31.2%] h-auto cursor-pointer"
              onClick={() => {
                onCreateNewBlock(btn.type);
                closeDialog();
              }}
            >
              <Icon name={btn.icon} className="!h-5 !w-5" />
              <div className="text-[13px] font-semibold">{btn.title}</div>
              <div className="text-xs font-normal text-zinc-400 text-wrap">
                {btn.description}
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
