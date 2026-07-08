"use client";

import React from "react";
import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";
import { ListCollapseIcon } from "lucide-react";

type LineHeight = {
  label: string;
  value: string;
};

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const LineHeight: LineHeight[] = [
    {
      label: "Single",
      value: "1",
    },
    {
      label: "Double",
      value: "2",
    },
    {
      label: "Triple",
      value: "3",
    },
  ];

  return (
    <DropdownMenu modal={false}>
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
              <ListCollapseIcon className="size-4" />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Line Spacing</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {LineHeight.map(({ label, value }) => (
          <button
            key={value}
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .toggleTextStyle({ lineHeight: value })
                .run()
            }
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("paragraph").lineHeight === value &&
                "bg-neutral-200/80"
            )}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LineHeightButton;
