"use client";

import React from "react";
import { useEditorStore } from "@/store/use-editor-store";
import { CirclePicker, type ColorResult } from "react-color";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HighlighterIcon } from "lucide-react";

const HighlightButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000"; // If we don't get a color we assume it's black

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <CirclePicker
          color={value}
          onChangeComplete={onChange}
          colors={[
            "#fffa65", // yellow
            "#ffdb4d", // light orange
            "#ffb347", // peach/orange
            "#ff8c42", // orange
            "#ff6bcb", // bright pink
            "#ff5f7e", // pink
            "#ff3f34", // red
            "#00ffe5", // cyan
            "#00ccff", // blue
            "#7d5fff", // purple
            "#00ff6a", // green
            "#FFFFFF", // lime
          ]}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HighlightButton;
