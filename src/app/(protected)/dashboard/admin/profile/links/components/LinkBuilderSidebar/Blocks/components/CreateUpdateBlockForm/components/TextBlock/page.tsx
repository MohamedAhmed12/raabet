"use client";

import "./style.css";

import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import {EditorProvider, useCurrentEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import {useState} from "react";

import {Block} from "@/app/types/block";
import {cn} from "@/lib/utils";

const MenuBar = () => {
  const {editor} = useCurrentEditor();

  if (!editor) return null;

  const buttonClass = "p-1 rounded hover:bg-gray-200";

  return (
    <div className="mb-4 flex items-center flex-wrap gap-2">
      {/* Heading Dropdown */}
      <select
        value={
          editor.isActive("heading", {level: 1})
            ? "1"
            : editor.isActive("heading", {level: 2})
            ? "2"
            : editor.isActive("heading", {level: 3})
            ? "3"
            : "0"
        }
        onChange={(e) => {
          const level = parseInt(e.target.value);
          if (level === 0) {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().toggleHeading({level}).run();
          }
        }}
        className="p-1 border rounded"
      >
        <option value="0">Normal</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
      </select>

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(buttonClass, editor.isActive("bold") && "is-active")}
        aria-label="Bold"
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(buttonClass, editor.isActive("italic") && "is-active")}
        aria-label="Italic"
      >
        <Italic size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={cn(buttonClass, editor.isActive("underline") && "is-active")}
        aria-label="Underline"
      >
        <u>U</u>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cn(buttonClass, editor.isActive("strike") && "is-active")}
        aria-label="Strikethrough"
      >
        <Strikethrough size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={cn(
          buttonClass,
          editor.isActive("bulletList") && "is-active"
        )}
        aria-label="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        className={cn(
          buttonClass,
          editor.isActive("orderedList") && "is-active"
        )}
        aria-label="Ordered List"
      >
        <ListOrdered size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={cn(
          buttonClass,
          editor.isActive({textAlign: "left"}) && "is-active"
        )}
      >
        <AlignLeft />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={cn(
          buttonClass,
          editor.isActive({textAlign: "center"}) && "is-active"
        )}
      >
        <AlignCenter />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={cn(
          buttonClass,
          editor.isActive({textAlign: "right"}) && "is-active"
        )}
      >
        <AlignRight />
      </button>
    </div>
  );
};
const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Underline,
];

export const TextBlock = ({
  block,
  onUpdateBlockProperty,
}: {
  block: Block;
  onUpdateBlockProperty: (key: keyof Block, val: string) => void;
}) => {
  const [content, setContent] = useState("");

  return (
    <div className="flex-1 p-5 mt-4">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={block.text}
        onUpdate={(e) => onUpdateBlockProperty("text", e.editor.getHTML())}
      ></EditorProvider>
    </div>
  );
};
