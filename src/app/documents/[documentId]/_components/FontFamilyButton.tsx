"use client";

import React from "react";
import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

type Font = {
  label: string;
  value: string;
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  // TODO: Add custom fonts
  const fonts: Font[] = [
    { label: "Inter", value: "Inter" },
    { label: "Arial", value: "Arial" },
    { label: "Comic Sans", value: "Comic Sans" },
    { label: "Courier New", value: "Courier New" },
    { label: "Cursive", value: "Cursive" },
    { label: "CSS variable", value: "CSS variable" },
    { label: "Exo 2", value: "Exo 2" },
    { label: "Georgia", value: "Georgia" },
    { label: "Impact", value: "Impact" },
    { label: "Monospace", value: "Monospace" },
    { label: "Serif", value: "Serif" },
    { label: "Tahoma", value: "Tahoma" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Trebuchet MS", value: "Trebuchet MS" },
    { label: "Unset", value: "Unset" },
    { label: "Verdana", value: "Verdana" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-xs">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Inter"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-neutral-200/80"
            )}
            style={{ fontFamily: value }}
            key={value}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FontFamilyButton;
