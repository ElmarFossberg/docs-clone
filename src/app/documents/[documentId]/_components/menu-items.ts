import { ClipboardPasteIcon, BoldIcon, Rows2Icon, Trash2Icon, LayoutPanelLeftIcon, LayoutPanelTopIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon, CopyCheck, ScissorsIcon } from "lucide-react";
import { Editor } from "@tiptap/react";
import { LucideIcon } from "lucide-react";


export type MenuItem = {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  isSeparator?: boolean;
};

// Text-specific items
export const getTextMenuItems = (editor: Editor | null): MenuItem[] => {
  if (!editor) return [];
return [
    {
      label: "Cut",
      icon: ScissorsIcon,
            onClick: () => document.execCommand("cut"),

    },
    {
      label: "Copy",
      icon: CopyCheck,
      onClick: () => document.execCommand("copy"),
    },
    {
      label: "Paste",
      icon: ClipboardPasteIcon,
      onClick: async () => {
        const text = await navigator.clipboard.readText();
        if (text) editor.commands.insertContent(text);
      },
    },
    {label: "s001", isSeparator: true},
    {
      label: "Bold",
      icon: BoldIcon,
      onClick: () => editor.commands.toggleBold(),
    },
    {
      label: "Italic",
      icon: ItalicIcon,
      onClick: () => editor.commands.toggleItalic(),
    },
    {
      label: "Underline",
      icon: UnderlineIcon,
      onClick: () => editor.commands.toggleUnderline(),
    },
    {
      label: "Strikethrough",
      icon: StrikethroughIcon,
      onClick: () => editor.commands.toggleStrike(),
    },
  ];
};

// Table-specific items
export const getTableMenuItems = (editor: Editor | null): MenuItem[] => {
  if (!editor) return [];
  return [
    {
      label: "Add column",
      icon: Rows2Icon,
      onClick: () => editor?.commands.addColumnAfter(),
    },
    {
      label: "Add row",
      icon: Rows2Icon,
      onClick: () => editor?.commands.addRowAfter(),
    },
     {
      label: "Toggle Header Column",
      icon: LayoutPanelLeftIcon,
      onClick: () => editor?.commands.toggleHeaderColumn(),
    },
    {
      label: "Toggle Header Row",
      icon: LayoutPanelTopIcon,
      onClick: () => editor?.commands.toggleHeaderRow(),
    },
   
    {
      label: "Delete Table",
      icon: Trash2Icon,
      onClick: () => editor?.commands.deleteTable(),
    },
  ];
};

// Default / generic items
export const getDefaultMenuItems = (editor: Editor | null): MenuItem[] => {
  if (!editor) return [];
  return [
    {
      label: "Paste",
      icon: ClipboardPasteIcon,
      onClick: async () => {
        const text = await navigator.clipboard.readText();
        if (text) editor.commands.insertContent(text);
      },
    },
  ];
};


