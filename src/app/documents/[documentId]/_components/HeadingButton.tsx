"use client";

import React from "react";
import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Level } from "@tiptap/extension-heading";

type Heading = {
  label: string;
  value: number;
  fontSize: string;
};

const HeadingButton = () => {
  const { editor } = useEditorStore();

  const headings: Heading[] = [
    {
      label: "Normal text",
      value: 0,
      fontSize: "1rem",
    },
    {
      label: "Heading 1",
      value: 1,
      fontSize: "2rem",
    },
    {
      label: "Heading 2",
      value: 2,
      fontSize: "1.5rem",
    },
    {
      label: "Heading 3",
      value: 3,
      fontSize: "1.25rem",
    },
    {
      label: "Heading 4",
      value: 4,
      fontSize: "1.125rem",
    },
  ];

  // Functions
  const getCurrentHeading = () => {
    const level = [1, 2, 3, 4, 5].find((l) =>
      editor?.isActive("heading", { level: l })
    );
    return level ? `Heading ${level}` : "Normal text";
  };
  const handleClick = (value: number) => {
    if (value === 0) {
      editor?.chain().focus().setParagraph().run();
    } else {
      const fontSizeRem =
        headings.find((h) => h.value === value)?.fontSize || "1rem";
      const fontSizePx = `${parseFloat(fontSizeRem) * 16}px`;
      editor
        ?.chain()
        .focus()
        .toggleHeading({ level: value as Level })
        .setFontSize(fontSizePx)
        .run();
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            style={{ fontSize }}
            onClick={() => handleClick(value)}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              (value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: value }) &&
                  "bg-neutral-200/80")
            )}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeadingButton;
