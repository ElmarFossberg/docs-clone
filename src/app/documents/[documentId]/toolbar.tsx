"use client";

import {
  BoldIcon,
  LucideIcon,
  PrinterIcon,
  Redo2Icon,
  SpellCheckIcon,
  Undo2Icon,
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import VerticalSeparator from "@/components/ui/custom-separator";

type ToolbarButtonProps = {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
};

type ToolbarItem = {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  isActive?: boolean;
};

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick ?? (() => {})} // No-op if onClick is not provided
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

const Toolbar = () => {
  const { editor } = useEditorStore();

  const toolbarItems: ToolbarItem[][] = [
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
        label: "Spell Check",
        icon: SpellCheckIcon,
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
        label: "bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
    ],
  ];
  return (
    <div className="bg-background px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {toolbarItems[0].map((item) => (
        <ToolbarButton
          key={item.label}
          onClick={item.onClick}
          isActive={item.isActive}
          icon={item.icon}
        />
      ))}
      <VerticalSeparator className="bg-neutral-300 " />
      {/* TODO: Font Family */}
      <VerticalSeparator className="bg-neutral-300 " />
      {/* TODO: Heading */}
      <VerticalSeparator className="bg-neutral-300 " />
      {/* TODO: Font Size */}
      <VerticalSeparator className="bg-neutral-300 " />
    </div>
  );
};

export default Toolbar;
