"use client";

import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormatting,
  SpellCheck2Icon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import VerticalSeparator from "@/components/ui/custom-separator";
import FontFamilyButton from "./_components/(font)/FontFamilyButton";
import HeadingButton from "./_components/(font)/HeadingButton";
import TextColorButton from "./_components/(font)/TextColorButton";
import HighlightButton from "./_components/(font)/HighlightButton";
import LinkButton from "./_components/(text-format)/LinkButton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ImageButton from "./_components/(text-format)/ImageButton";
import AlignButton from "./_components/(text-format)/AlignButton";
import ListButton from "./_components/(text-format)/ListButton";
import FontSizeButton from "./_components/(font)/FontSizeButton";
import LineHeightButton from "./_components/(text-format)/LineHeightButton";
import DogButton from "./_components/(fun)/DogButton";
import CatButton from "./_components/(fun)/CatButton";
import ConfettiButton from "./_components/(fun)/ConfettiButton";
import AddColumnButton from "./_components/(table)/AddColumnButton";
import AddRowButton from "./_components/(table)/AddRowButton";
import ToggleHeaderRowButton from "./_components/(table)/ToggleHeaderRowButton";
import ToggleHeaderColumnButton from "./_components/(table)/ToggleHeaderColumnButton";
import EmojiButton from "./_components/(fun)/EmojiButton";
// import AiReportButton from "./_components/(ai)/AiReportButton";
// import PolishButton from "./_components/(ai)/PolishButton";

type ToolbarItem = {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  isActive?: boolean;
};

const ToolbarButton = ({
  onClick,
  label,
  isActive,
  icon: Icon,
}: ToolbarItem) => {
  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <button
          onClick={onClick ?? (() => {})} // No-op if onClick is not provided
          className={cn(
            "text-xs h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
            isActive && "bg-neutral-200/80"
          )}
        >
          <Icon className="size-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

const Toolbar = () => {
  const { editor } = useEditorStore();

  const easyToolbarItems: ToolbarItem[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Toggle Spell Check",
        icon: SpellCheck2Icon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "List Todo",
        icon: ListTodoIcon,
        isActive: editor?.isActive("taskList"),
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormatting,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];
  return (
    <div className="bg-[oklch(0.95_0.0034_247.86)] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto print:hidden">
      {easyToolbarItems[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <VerticalSeparator className="bg-neutral-300 " />
      <FontFamilyButton />
      <VerticalSeparator className="bg-neutral-300 " />
      <HeadingButton />
      <VerticalSeparator className="bg-neutral-300 " />
      <FontSizeButton />
      <VerticalSeparator className="bg-neutral-300 " />
      {easyToolbarItems[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColorButton />

      <HighlightButton />
      <VerticalSeparator className="bg-neutral-300 " />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <LineHeightButton />
      <ListButton />
      {easyToolbarItems[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {editor?.isActive("table") && (
        <>
          <VerticalSeparator className="bg-neutral-300 " />
          <AddColumnButton />
          <AddRowButton />
          <ToggleHeaderColumnButton />
          <ToggleHeaderRowButton />
        </>
      )}
      <VerticalSeparator className="bg-neutral-300 " />
      <EmojiButton />
      <DogButton />
      <CatButton />
      <ConfettiButton />
    </div>
  );
};

export default Toolbar;
