"use client";

import React from "react";
import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlignCenter,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
type Alignment = {
  label: string;
  value: string;
  icon: LucideIcon;
};

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments: Alignment[] = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenter,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  const currentAlignment =
    alignments.find((alignment) =>
      editor?.isActive({ textAlign: alignment.value })
    ) || alignments[0]; // fallback to left

  const handleClick = (value: string) => {
    editor?.chain().focus().setTextAlign(value).run();
  };

  return (
    <DropdownMenu modal={false}>
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
              <currentAlignment.icon className="size-4" />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Align Text</p>
        </TooltipContent>
      </Tooltip>

      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => handleClick(value)}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AlignButton;
